# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Portfólio FullStack: React + Python

### Front-end (React + Vite + three.js)
```bash
npm install
npm run dev        # http://localhost:5173
```
Em produção, defina a variável `VITE_API_URL` (URL do back-end) antes do build.

### Back-end (Python + FastAPI + SQLite) — pasta `backend/`
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1                            # Windows (PowerShell) | Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000               # docs em http://localhost:8000/docs
pytest                                              # roda os testes
```
Variáveis de ambiente: `ALLOWED_ORIGINS` (URLs do front, separadas por vírgula), `ADMIN_TOKEN` (para ler `/api/messages`), `DB_PATH` (opcional).

Depois de editar `src/data/projects.js`, rode `npm run sync:projects` para atualizar `backend/projects.json`.

### Deploy na Render
Crie um **Web Service** novo: Root Directory `backend`, Build `pip install -r requirements.txt`, Start `uvicorn main:app --host 0.0.0.0 --port $PORT`. Configure `ALLOWED_ORIGINS` com a URL do portfólio e `ADMIN_TOKEN`. No site estático, configure `VITE_API_URL` com a URL desse serviço e faça um novo deploy.
> No plano gratuito o disco é efêmero: o SQLite zera a cada redeploy. Para guardar mensagens de forma permanente, use um Disk da Render ou Postgres.
