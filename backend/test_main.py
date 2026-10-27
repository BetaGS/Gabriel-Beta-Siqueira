import os
import tempfile

os.environ["DB_PATH"] = os.path.join(tempfile.mkdtemp(), "test.db")
os.environ["ADMIN_TOKEN"] = "segredo"

from fastapi.testclient import TestClient  # noqa: E402

import main  # noqa: E402

with TestClient(main.app) as client:

    def test_health():
        r = client.get("/api/health")
        assert r.status_code == 200
        assert r.json()["status"] == "online"

    def test_visit_increments():
        a = client.post("/api/visit").json()["visits"]
        b = client.post("/api/visit").json()["visits"]
        assert b == a + 1

    def test_contact_validation():
        r = client.post("/api/contact", json={"nome": "A", "email": "x", "mensagem": "oi"})
        assert r.status_code == 422

    def test_contact_and_admin_listing():
        ok = client.post(
            "/api/contact",
            json={"nome": "Maria", "email": "maria@exemplo.com", "mensagem": "Olá, gostei do portfólio!"},
        )
        assert ok.status_code == 201
        assert client.get("/api/messages").status_code == 401
        r = client.get("/api/messages", headers={"X-Admin-Token": "segredo"})
        assert r.status_code == 200 and r.json()[0]["nome"] == "Maria"

    def test_projects_filter():
        r = client.get("/api/projects", params={"category": "mobile"})
        assert r.status_code == 200
        assert all(p["category"] == "mobile" for p in r.json())
