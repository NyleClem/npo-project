# 🏈 NFL Personnel Optimizer (NPO)

Full-stack Docker setup:

- **db** – PostgreSQL 16 (persistent volume)
- **api** – Node/Express
- **client** – React + Vite

Everything runs in Docker (Docker must be open to run). No local Node/Postgres required.

## Requirements

- Docker Desktop
- VS Code (recommended)

## 1. Clone

```bash
git clone https://github.com/NyleClem/npo-project.git
cd npo-project

```

## 2. Start Docker Container

```bash
docker compose up --build
```

## 3. Acessing Web App

```bash
Frontend: http://localhost:5173
Backend: http://localhost:3000/play
```
