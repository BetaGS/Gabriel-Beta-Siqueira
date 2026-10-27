import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../lib/api';
import './ApiPlayground.css';

const ENDPOINTS = [
  { label: 'GET /api/health', path: '/api/health' },
  { label: 'GET /api/stats', path: '/api/stats' },
  { label: 'GET /api/projects?category=backend', path: '/api/projects?category=backend' },
];

const SNIPPET = `@app.post("/api/contact", status_code=201)
def contact(payload: ContactIn, request: Request):
    rate_limit(request, "contact", limit=5, window_s=3600)
    with db() as conn:
        cur = conn.execute(
            "INSERT INTO messages (nome, email, mensagem, created_at)"
            " VALUES (?, ?, ?, ?)",
            (payload.nome, payload.email, payload.mensagem, now()),
        )
    return {"ok": True, "id": cur.lastrowid}`;

const ApiPlayground = () => {
  const [status, setStatus] = useState('checking'); // checking | online | offline
  const [stats, setStats] = useState(null);
  const [latency, setLatency] = useState(null);
  const [active, setActive] = useState(ENDPOINTS[0].path);
  const [output, setOutput] = useState('// clique em um endpoint para chamar a API Python');
  const [loading, setLoading] = useState(false);

  const checkApi = useCallback(async () => {
    setStatus('checking');
    const health = await api('/api/health');
    if (!health.ok) {
      setStatus('offline');
      return;
    }
    setLatency(health.ms);
    setStatus('online');
    const s = await api('/api/stats');
    if (s.ok) setStats(s.data);
  }, []);

  useEffect(() => {
    checkApi();
  }, [checkApi]);

  const call = async (path) => {
    setActive(path);
    setLoading(true);
    setOutput('// aguardando resposta...');
    const res = await api(path);
    setLoading(false);
    if (res.ok) {
      setLatency(res.ms);
      setOutput(`// ${res.status} OK — ${res.ms} ms\n${JSON.stringify(res.data, null, 2)}`);
    } else {
      setOutput(
        '// API indisponível no momento.\n// Se estiver na hospedagem gratuita, ela pode levar ~1 min para acordar. Tente de novo.',
      );
      setStatus('offline');
    }
  };

  return (
    <div className="api-playground">
      <div className="api-header">
        <div>
          <h3>🐍 API em Python ao vivo</h3>
          <p>
            Back-end feito com <strong>FastAPI + SQLite</strong>. Os dados abaixo vêm direto do servidor Python.
          </p>
        </div>
        <button type="button" className={`api-status api-${status}`} onClick={checkApi} title="Verificar novamente">
          <span className="api-dot" />
          {status === 'checking' && 'Conectando...'}
          {status === 'online' && `Online${latency != null ? ` · ${latency} ms` : ''}`}
          {status === 'offline' && 'Offline · tentar de novo'}
        </button>
      </div>

      <div className="api-stats">
        <div className="api-stat">
          <strong>{stats ? stats.visits : '—'}</strong>
          <span>visitas</span>
        </div>
        <div className="api-stat">
          <strong>{stats ? stats.projects : '—'}</strong>
          <span>projetos na API</span>
        </div>
        <div className="api-stat">
          <strong>{stats ? stats.messages : '—'}</strong>
          <span>mensagens recebidas</span>
        </div>
      </div>

      <div className="api-panels">
        <div className="api-terminal">
          <div className="api-chips">
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.path}
                type="button"
                className={`api-chip ${active === ep.path ? 'active' : ''}`}
                onClick={() => call(ep.path)}
                disabled={loading}
              >
                {ep.label}
              </button>
            ))}
          </div>
          <pre className="api-output">{output}</pre>
        </div>

        <div className="api-terminal api-code">
          <div className="api-chips">
            <span className="api-file">main.py</span>
          </div>
          <pre className="api-output">{SNIPPET}</pre>
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;
