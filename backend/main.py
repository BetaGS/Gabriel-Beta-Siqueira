"""API do portfólio de Gabriel Siqueira — Python + FastAPI + SQLite.

Endpoints:
    GET  /api/health     -> status do serviço e uptime
    GET  /api/stats      -> visitas, mensagens recebidas e nº de projetos
    POST /api/visit      -> registra uma visita (o front chama 1x por sessão)
    GET  /api/projects   -> lista de projetos (filtro opcional ?category=web|mobile|backend)
    POST /api/contact    -> recebe mensagem do formulário e salva no banco
    GET  /api/messages   -> lista mensagens (protegido por header X-Admin-Token)

Rodar local:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""
from __future__ import annotations

import json
import os
import re
import secrets
import sqlite3
import sys
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager, contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Deque, Dict, Iterator, Optional

from fastapi import FastAPI, Header, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = Path(os.getenv("DB_PATH", BASE_DIR / "portfolio.db"))
PROJECTS_FILE = BASE_DIR / "projects.json"
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if o.strip()
]
STARTED_AT = time.time()
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


# ---------------------------------------------------------------- banco ----
@contextmanager
def db() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with db() as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS counters ("
            "name TEXT PRIMARY KEY, value INTEGER NOT NULL DEFAULT 0)"
        )
        conn.execute(
            "CREATE TABLE IF NOT EXISTS messages ("
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "nome TEXT NOT NULL, email TEXT NOT NULL, mensagem TEXT NOT NULL,"
            "created_at TEXT NOT NULL)"
        )
        conn.execute("INSERT OR IGNORE INTO counters (name, value) VALUES ('visits', 0)")


# ----------------------------------------------------------- rate limit ----
_hits: Dict[str, Deque[float]] = defaultdict(deque)


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit(request: Request, bucket: str, limit: int, window_s: int) -> None:
    """Limite simples em memória (por IP). Suficiente para um portfólio."""
    key = f"{bucket}:{client_ip(request)}"
    now = time.time()
    q = _hits[key]
    while q and now - q[0] > window_s:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(status_code=429, detail="Muitas requisições. Tente novamente mais tarde.")
    q.append(now)


# --------------------------------------------------------------- modelos ----
class ContactIn(BaseModel):
    nome: str = Field(min_length=2, max_length=80)
    email: str = Field(max_length=120)
    mensagem: str = Field(min_length=5, max_length=2000)

    @field_validator("nome", "email", "mensagem")
    @classmethod
    def strip_text(cls, v: str) -> str:
        return v.strip()

    @field_validator("email")
    @classmethod
    def valid_email(cls, v: str) -> str:
        if not EMAIL_RE.match(v):
            raise ValueError("e-mail inválido")
        return v


def load_projects() -> list[dict]:
    if not PROJECTS_FILE.exists():
        return []
    return json.loads(PROJECTS_FILE.read_text(encoding="utf-8"))


# ------------------------------------------------------------------- app ----
@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title="API do Portfólio — Gabriel Siqueira", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-Admin-Token"],
)


@app.get("/api/health")
def health() -> dict:
    return {
        "status": "online",
        "service": "portfolio-api",
        "python": sys.version.split()[0],
        "uptime_seconds": int(time.time() - STARTED_AT),
        "time": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


@app.get("/api/stats")
def stats() -> dict:
    with db() as conn:
        visits = conn.execute("SELECT value FROM counters WHERE name='visits'").fetchone()["value"]
        messages = conn.execute("SELECT COUNT(*) AS n FROM messages").fetchone()["n"]
    return {"visits": visits, "messages": messages, "projects": len(load_projects())}


@app.post("/api/visit")
def visit(request: Request) -> dict:
    rate_limit(request, "visit", limit=30, window_s=60)
    with db() as conn:
        conn.execute("UPDATE counters SET value = value + 1 WHERE name='visits'")
        total = conn.execute("SELECT value FROM counters WHERE name='visits'").fetchone()["value"]
    return {"visits": total}


@app.get("/api/projects")
def projects(category: Optional[str] = Query(default=None, pattern="^(web|mobile|backend)$")) -> list[dict]:
    items = load_projects()
    if category:
        items = [p for p in items if p.get("category") == category]
    return items


@app.post("/api/contact", status_code=201)
def contact(payload: ContactIn, request: Request) -> dict:
    rate_limit(request, "contact", limit=5, window_s=3600)
    with db() as conn:
        cur = conn.execute(
            "INSERT INTO messages (nome, email, mensagem, created_at) VALUES (?, ?, ?, ?)",
            (
                payload.nome,
                payload.email,
                payload.mensagem,
                datetime.now(timezone.utc).isoformat(timespec="seconds"),
            ),
        )
    return {"ok": True, "id": cur.lastrowid}


@app.get("/api/messages")
def messages(x_admin_token: str = Header(default="")) -> list[dict]:
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="ADMIN_TOKEN não configurado no servidor.")
    if not secrets.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(status_code=401, detail="Token inválido.")
    with db() as conn:
        rows = conn.execute("SELECT * FROM messages ORDER BY id DESC LIMIT 200").fetchall()
    return [dict(r) for r in rows]
