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

Docker Compose configurations for orchestrating the complete LEIA system. The repository provides three deployment profiles (full stack, Designer-only, and Workbench-only) covering all 5 microservices, two MongoDB instances, and Redis.

---

## System Architecture

The LEIA stack is composed of **5 application services** backed by **3 infrastructure services**:

| Service | Image | Exposed Port | Role |
| --- | --- | --- | --- |
| `designer-backend` | `ghcr.io/leia-org/leia-designer-backend:latest` | `PORT_DESIGNER_BACKEND` (3001) | REST API for LEIAs, personas, and experiments |
| `designer-frontend` | `ghcr.io/leia-org/leia-designer-frontend:latest` | `PORT_DESIGNER_FRONTEND` (3004) | Web UI for instructors |
| `workbench-backend` | `ghcr.io/leia-org/leia-workbench-backend:latest` | `PORT_WORKBENCH_BACKEND` (3002) | REST API for experiments and sessions |
| `workbench-frontend` | `ghcr.io/leia-org/leia-workbench-frontend:latest` | `PORT_WORKBENCH_FRONTEND` (3005) | Web UI for workbench users |
| `runner` | `ghcr.io/leia-org/leia-runner:latest` | `PORT_RUNNER` (3003) | AI session execution engine |
| `mongodb-designer` | `mongo:latest` | `MONGO_PORT_DESIGNER` (27017) | Database for Designer |
| `mongodb-workbench` | `mongo:latest` | `MONGO_PORT_WORKBENCH` (27018) | Database for Workbench |
| `redis` | `redis:latest` | `REDIS_PORT` (6379) | Cache and task queue for Runner |

All application images are pulled from the **GitHub Container Registry (GHCR)** and are built automatically via GitHub Actions in each service repository.

### Inter-service communication

Inside a running Compose stack, services communicate with each other via their container names. No external URLs are needed.

| Caller | Callee | Container URL | Auth header |
| --- | --- | --- | --- |
| `designer-frontend` | `designer-backend` | `http://designer-backend:80` | `Authorization: Bearer <jwt>` |
| `workbench-frontend` | `workbench-backend` | `http://workbench-backend:80` | JWT / admin secret / share token |
| `workbench-backend` | `designer-backend` | `http://designer-backend:80` | `x-api-key: <DESIGNER_BACKEND_KEY>` |
| `workbench-backend` | `runner` | `http://runner:80` | `Authorization: Bearer <RUNNER_KEY>` |
| `runner` | `redis` | `redis://redis:6379` | - |
| `designer-backend` | `mongodb-designer` | `mongodb://mongodb-designer:27017` | Mongo credentials |
| `workbench-backend` | `mongodb-workbench` | `mongodb://mongodb-workbench:27017` | Mongo credentials |

:::info
The keys `RUNNER_KEY` and `DESIGNER_BACKEND_KEY` must match their counterparts in the callee's environment (`RUNNER_KEY` in the Runner, `API_KEY` in the Designer Backend). See the [Environment Variables](#environment-variables) section.
:::

---

## Prerequisites

- **Docker** and **Docker Compose** installed.
- A valid **OpenAI API key** (required by the Runner service).
- Docker images for all 5 LEIA services published to GHCR (happens automatically via GitHub Actions on each service repo).

---

## Project Structure

```text
leia-infrastructure-docker/
├── docker-compose.yaml          # Full stack (all 5 services + databases)
├── docker-compose-public.yaml   # Designer-only (backend, frontend, runner, MongoDB, Redis)
├── docker-compose-private.yaml  # Workbench-only (backend, frontend, runner, MongoDB, Redis)
├── .env.example                 # Environment variable template
└── .gitignore
```

---

## Environment Variables

Copy the example file and fill in all values before starting any services:

```bash
cp .env.example .env
```

### Database

| Variable | Default | Description |
| --- | --- | --- |
| `MONGO_USERNAME` | `admin` | MongoDB root username |
| `MONGO_PASSWORD` | `password123` | MongoDB root password |
| `MONGO_PORT_DESIGNER` | `27017` | Host port for the Designer MongoDB |
| `MONGO_PORT_WORKBENCH` | `27018` | Host port for the Workbench MongoDB |
| `REDIS_PORT` | `6379` | Host port for Redis |

### Service Ports

| Variable | Default | Description |
| --- | --- | --- |
| `PORT_DESIGNER_BACKEND` | `3001` | Host port for the Designer Backend |
| `PORT_WORKBENCH_BACKEND` | `3002` | Host port for the Workbench Backend |
| `PORT_RUNNER` | `3003` | Host port for the Runner |
| `PORT_DESIGNER_FRONTEND` | `3004` | Host port for the Designer Frontend |
| `PORT_WORKBENCH_FRONTEND` | `3005` | Host port for the Workbench Frontend |

### Internal Service URLs

These are used for **inter-service communication inside the Docker network**. Do not change them unless you rename a service.

| Variable | Default | Description |
| --- | --- | --- |
| `DESIGNER_BACKEND_URL` | `http://designer-backend:80` | Designer Backend URL seen by other services |
| `WORKBENCH_BACKEND_URL` | `http://workbench-backend:80` | Workbench Backend URL seen by other services |
| `RUNNER_URL` | `http://runner:80` | Runner URL seen by backend services |

### External Frontend URLs

Used by backend services to configure CORS. Set these to the URL **users will access in their browser**.

| Variable | Default | Description |
| --- | --- | --- |
| `DESIGNER_FRONTEND_URL_EXTERNAL` | `http://localhost:3004` | Public URL of the Designer Frontend |
| `WORKBENCH_FRONTEND_URL_EXTERNAL` | `http://localhost:3005` | Public URL of the Workbench Frontend |

### Authentication and Security

:::warning
All secrets below have insecure defaults. **Change every one of them** before deploying to any non-local environment.
:::

| Variable | Description |
| --- | --- |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens |
| `API_KEY` | Key for internal API authentication |
| `RUNNER_KEY` | Authentication key shared between backends and the Runner |
| `DESIGNER_BACKEND_KEY` | Key used by the Workbench Backend to call the Designer Backend |
| `ADMIN_SECRET` | Admin-level secret for privileged Workbench operations |

### Default Admin Account

| Variable | Default | Description |
| --- | --- | --- |
| `DEFAULT_ADMIN_EMAIL` | `admin@leia.org` | Email of the auto-created admin user |
| `DEFAULT_ADMIN_PASSWORD` | `admin123` | Password of the auto-created admin user |

### AI / LLM Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | _(required)_ | OpenAI API key used by the Runner |
| `OPENAI_EVALUATION_MODEL` | `gpt-4` | Model used for LEIA evaluation |
| `DEFAULT_MODEL` | `gpt-3.5-turbo` | Default LLM model for AI sessions |

### Environment

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `production` | Runtime environment for all services |

---

## Deployment Options

The repository provides three Compose files for different deployment scenarios:

| File | Use case | Services included |
| --- | --- | --- |
| `docker-compose.yaml` | Full LEIA stack | All 5 services + 2 MongoDB + Redis |
| `docker-compose-public.yaml` | Designer only | designer-backend, designer-frontend, runner, mongodb-designer, redis |
| `docker-compose-private.yaml` | Workbench only | workbench-backend, workbench-frontend, runner, mongodb-workbench, redis |

---

## Quick Start: Full Stack

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

   At minimum, set your `OPENAI_API_KEY` and change all default secrets.

3. Start all services:

   ```bash
   docker-compose -f docker-compose.yaml up -d
   ```

4. Verify all containers are running:

   ```bash
   docker-compose -f docker-compose.yaml ps
   ```

Once running, the services are accessible at:

| Service | URL |
| --- | --- |
| Designer Frontend | `http://localhost:3004` |
| Workbench Frontend | `http://localhost:3005` |
| Designer Backend API | `http://localhost:3001` |
| Workbench Backend API | `http://localhost:3002` |
| Runner API | `http://localhost:3003` |

---

## Partial Deployments

### Designer Only

Runs only the Designer microservices (backend, frontend, runner, MongoDB, Redis):

```bash
docker-compose -f docker-compose-public.yaml up -d
```

Use this profile to work on the LEIA configuration workflow without spinning up the Workbench.

### Workbench Only

Runs only the Workbench microservices (backend, frontend, runner, MongoDB, Redis):

```bash
docker-compose -f docker-compose-private.yaml up -d
```

Use this profile when working on the experiment execution and student session flow.

---

## Stopping Services

```bash
# Stop and remove containers (data volumes are preserved)
docker-compose -f docker-compose.yaml down

# Stop and also remove data volumes (full reset)
docker-compose -f docker-compose.yaml down -v
```

:::warning
Using `down -v` will permanently delete all MongoDB and Redis data. Use only when you want a clean reset.
:::

---

## Contributing

1. Fork the repository and create a branch off `main`:

   ```bash
   git checkout -b feat/my-change
   ```

2. Copy `.env.example` to `.env` and configure it for local testing.

3. Make your changes to the relevant Compose file (`docker-compose.yaml`, `docker-compose-public.yaml`, or `docker-compose-private.yaml`).

4. Test your changes locally before opening a PR:

   ```bash
   docker-compose -f docker-compose.yaml up -d
   docker-compose -f docker-compose.yaml ps
   ```

5. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

6. Open a Pull Request with a clear description of the infrastructure changes and their impact on service connectivity or environment variables.
