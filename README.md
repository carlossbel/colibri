\# 🚀 Colibri - Blue-Green Deployment



Sistema de transporte comunitario con arquitectura Blue-Green para deployments sin downtime.



\## 📋 Tecnologías



\- \*\*Frontend:\*\* React + Vite

\- \*\*Backend:\*\* Express + Prisma

\- \*\*Base de datos:\*\* PostgreSQL (Render)

\- \*\*Contenedores:\*\* Docker + Docker Compose

\- \*\*Proxy:\*\* Nginx

\- \*\*CI/CD:\*\* GitHub Actions

\- \*\*Tests:\*\* Jest + Supertest



\## 🏗️ Arquitectura

```

Internet → Nginx (puerto 80) → Blue (8001) ⟷ Green (8002) → Docker → App

```



\## ✅ Tests



5 pruebas de integración implementadas:

\- GET / - API health

\- GET /health - Health check endpoint

\- POST /auth/register - User registration

\- GET /invalid - 404 handling

\- GET /trips - Trips endpoint

```bash

cd colibri-backend

npm test

```



\## 🐳 Docker (Blue-Green)

```bash

\# Crear red

docker network create colibri-network



\# Levantar Blue

docker-compose -f docker-compose.blue.yml up -d



\# Levantar Green

docker-compose -f docker-compose.green.yml up -d

```



\## 🔄 Blue-Green Switch

```bash

./scripts/switch-deployment.sh

```



\## 🌐 URLs



\- \*\*Aplicación:\*\* http://35.208.59.77

\- \*\*Status:\*\* http://35.208.59.77/deployment-status

\- \*\*Health:\*\* http://35.208.59.77/health

\- \*\*Blue:\*\* http://35.208.59.77:8001

\- \*\*Green:\*\* http://35.208.59.77:8002

## 🔄 Rollback Rápido



En caso de problemas con el deployment actual, ejecutar rollback instantáneo:

```bash

\# Volver al ambiente anterior

~/colibri/scripts/switch-deployment.sh

```



\*\*Características del rollback:\*\*

\- ⚡ Ejecución en menos de 5 segundos

\- 🔒 Zero downtime garantizado

\- 🔄 Mismo script que para deploy

\- ✅ Ambiente anterior siempre disponible



\## 📊 Verificar Estado Actual

```bash

\# Ver qué ambiente está activo

curl http://35.208.59.77/deployment-status



\# Ver contenedores corriendo

docker ps

```



\## 👥 Equipo



\- Diego

\- Miguel

\- Carlos





