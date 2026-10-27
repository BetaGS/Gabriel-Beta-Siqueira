// Cliente simples da API Python (FastAPI).
// Em desenvolvimento, o Vite faz proxy de /api -> http://localhost:8000 (veja vite.config.js).
// Em produção, defina VITE_API_URL com a URL do serviço na Render (ex.: https://portfolio-api.onrender.com).
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function api(path, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();
  try {
    const res = await fetch(`${BASE}${path}`, { ...options, signal: controller.signal });
    const text = await res.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      /* resposta que não é JSON (ex.: 404 do site estático) */
    }
    return { ok: res.ok && data !== null, status: res.status, data, ms: Math.round(performance.now() - started) };
  } catch (error) {
    return { ok: false, status: 0, data: null, ms: Math.round(performance.now() - started), error };
  } finally {
    clearTimeout(timer);
  }
}

export const postJson = (path, body) =>
  api(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
