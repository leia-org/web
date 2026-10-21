---
sidebar_position: 2
tags:
  - contributing
  - infrastructure
  - docker
keywords:
  - LEIA
  - Docker
  - infrastructure
  - containers
  - contributing
  - local environment
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Infrastructure Docker

**Repository:** [leia-org/leia-infrastructure-docker](https://github.com/leia-org/leia-infrastructure-docker)

Docker Compose configuration for orchestrating the complete LEIA system with a single command. It covers all 6 microservices, a unified MongoDB instance, Redis, and local S3 storage (MinIO).

---

## System Architecture

The LEIA stack is composed of **6 application services** backed by **3 infrastructure services**:

| Service | Image | Exposed Port | Role |
| --- | --- | --- | --- |
| `auth` | `ghcr.io/leia-org/leia-auth:latest` | `PORT_AUTH` (3005) | Central authentication and API key management |
| `designer-backend` | `ghcr.io/leia-org/leia-designer-backend:latest` | `PORT_DESIGNER_BACKEND` (3000) | REST API for LEIAs, personas, and problems |
| `designer-frontend` | `ghcr.io/leia-org/leia-designer-frontend:latest` | `PORT_DESIGNER_FRONTEND` (5173) | Web UI for instructors |
| `workbench-backend` | `ghcr.io/leia-org/leia-workbench-backend:latest` | `PORT_WORKBENCH_BACKEND` (3001) | REST API for experiments and sessions |
| `workbench-frontend` | `ghcr.io/leia-org/leia-workbench-frontend:latest` | `PORT_WORKBENCH_FRONTEND` (8080) | Web UI for workbench users |
| `runner` | `ghcr.io/leia-org/leia-runner:latest` | `PORT_RUNNER` (5002) | AI session execution engine |
| `mongodb` | `mongo:latest` | `MONGO_PORT` (27017) | Unified MongoDB database (`auth`, `designer`, `workbench` DBs) |
| `redis` | `redis:latest` | `REDIS_PORT` (6379) | Cache and task queue for Runner |
| `minio` | `quay.io/minio/minio:latest` | `S3_PORT` (9000), `S3_CONSOLE_PORT` (9001) | Local S3-compatible object storage for Designer images |

All application images are pulled from the **GitHub Container Registry (GHCR)** or can be built locally via Docker Compose.

### Inter-service communication

Inside a running Compose stack, services communicate with each other via their container names in the `leia-network` bridge network.

| Caller | Callee | Container URL | Auth header / Mechanism |
| --- | --- | --- | --- |
| `designer-frontend` | `auth` | `http://auth:80` | JWT / API key |
| `designer-frontend` | `designer-backend` | `http://designer-backend:80` | `Authorization: Bearer <jwt>` |
| `workbench-frontend` | `auth` | `http://auth:80` | JWT / API key |
| `workbench-frontend` | `workbench-backend` | `http://workbench-backend:80` | JWT / admin secret / share token |
| `workbench-backend` | `designer-backend` | `http://designer-backend:80` | `x-api-key: <API_KEY>` |
| `workbench-backend` | `auth` | `http://auth:80` | `x-intern-token: <INTERN_TOKEN>` |
| `workbench-backend` | `runner` | `http://runner:80` | `Authorization: Bearer <RUNNER_KEY>` |
| `designer-backend` | `auth` | `http://auth:80` | `x-intern-token: <INTERN_TOKEN>` |
| `designer-backend` | `runner` | `http://runner:80` | `Authorization: Bearer <RUNNER_KEY>` |
| `designer-backend` | `minio` | `http://minio:9000` | S3 credentials (`MINIO_ROOT_USER`/`MINIO_ROOT_PASSWORD`) |
| `runner` | `auth` | `http://auth:80` | `x-intern-token: <INTERN_TOKEN>` |
| `runner` | `redis` | `redis://redis:6379` | - |
| `auth` | `mongodb` | `mongodb://mongodb:27017/auth` | Mongo credentials |
| `designer-backend` | `mongodb` | `mongodb://mongodb:27017/designer` | Mongo credentials |
| `workbench-backend` | `mongodb` | `mongodb://mongodb:27017/workbench` | Mongo credentials |

---

## Prerequisites

- **Docker** and **Docker Compose** installed.
- An **OpenAI API key** for the Workbench voice features and the Runner's generation helpers. LEIA sessions use the provider API keys (OpenAI, Gemini, Ollama or ALMA) that each user stores in the **leia-auth** service, which has to be deployed alongside this stack.

---

## Project Structure

```text
leia-infrastructure-docker/
├── docker-compose.yaml          # Unified stack (all 6 services + databases)
├── .env.example                 # Environment variable template
└── README.md
```

---

## Environment Variables

Copy the example file and fill in all values before starting any services:

```bash
cp .env.example .env
```

### Database & Storage

| Variable | Default | Description |
| --- | --- | --- |
| `MONGO_USERNAME` | `admin` | MongoDB root username |
| `MONGO_PASSWORD` | `password123` | MongoDB root password |
| `MONGO_PORT` | `27017` | Host port for MongoDB |
| `REDIS_PORT` | `6379` | Host port for Redis |
| `S3_PORT` | `9000` | Host port for MinIO S3 API |
| `S3_CONSOLE_PORT` | `9001` | Host port for MinIO Web Console |
| `S3_ACCESS_KEY_ID` | `minio` | MinIO root username / Access Key |
| `S3_SECRET_ACCESS_KEY` | `minio123` | MinIO root password / Secret Key |
| `S3_BUCKET` | `leia-images` | Bucket for storing Designer images |

### Service Ports

| Variable | Default | Description |
| --- | --- | --- |
| `PORT_AUTH` | `3005` | Host port for Auth Service |
| `PORT_DESIGNER_BACKEND` | `3000` | Host port for Designer Backend |
| `PORT_WORKBENCH_BACKEND` | `3001` | Host port for Workbench Backend |
| `PORT_RUNNER` | `5002` | Host port for Runner |
| `PORT_DESIGNER_FRONTEND` | `5173` | Host port for Designer Frontend |
| `PORT_WORKBENCH_FRONTEND` | `8080` | Host port for Workbench Frontend |

### AI / LLM

| Variable | Default | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | _(required)_ | OpenAI API key for the Workbench voice features and the Runner's generation helpers |
| `GEMINI_API_KEY` | _(empty)_ | Optional Gemini API key |
| `OPENAI_EVALUATION_MODEL` | `gpt-5.4-mini` | Model used for LEIA evaluation |
| `DEFAULT_MODEL` | `openai-responses` | Runner provider module used when a session does not name one |
| `SESSION_TTL_SECONDS` | `86400` | Seconds a Runner session lives in Redis after its last activity. `0` disables expiration |
| `ALMA_BASE_URL` | `https://alma.us.es/api/models/llama-3.1-8b-instruct/v1` | Base URL of one ALMA model, overridden by the base URL of the user's key |
| `ALMA_MODEL` | `meta-llama/Llama-3.1-8B-Instruct` | Model id sent to ALMA |
| `ALMA_MAX_TOKENS` / `ALMA_EVALUATION_MAX_TOKENS` | `1024` / `2048` | Token limits per ALMA reply and per evaluation |

---

## Quick Start

Launch the complete LEIA system:

1. Clone the repository and enter the directory:

   ```bash
   git clone https://github.com/leia-org/leia-infrastructure-docker.git
   cd leia-infrastructure-docker
   ```

2. Copy and configure the environment file:

   ```bash
   cp .env.example .env
   ```

   At minimum, set your `OPENAI_API_KEY` and change all default secrets. Provider keys for LEIA sessions are added later by each user in the app.

3. Start all services:

   ```bash
   docker compose up -d
   ```

4. Verify all containers are running:

   ```bash
   docker compose ps
   ```

Once running, the services are accessible at:

| Service | URL |
| --- | --- |
| Designer Frontend | `http://localhost:5173` |
| Workbench Frontend | `http://localhost:8080` |
| Auth Service API | `http://localhost:3005` |
| Designer Backend API | `http://localhost:3000` |
| Workbench Backend API | `http://localhost:3001` |
| Runner API | `http://localhost:5002` |
| MinIO S3 API | `http://localhost:9000` |
| MinIO Console | `http://localhost:9001` |

---

## Stopping Services

```bash
# Stop and remove containers (data volumes are preserved)
docker compose down

# Stop and also remove data volumes (full reset)
docker compose down -v
```
