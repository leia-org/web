---
sidebar_position: 7
tags:
  - contributing
  - backend
  - workbench
keywords:
  - LEIA
  - workbench
  - backend
  - contributing
  - API
  - server
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Workbench Backend

**Repository:** [leia-org/leia-workbench-backend](https://github.com/leia-org/leia-workbench-backend)

The backend API powering the LEIA Workbench. It manages experiments, student sessions, submissions, and evaluation results, and integrates in real time with the LEIA Runner for AI session execution.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js + Express.js | Runtime and HTTP server |
| MongoDB + Mongoose | Database and ODM |
| Socket.io | Real-time WebSocket communication |
| JWT + bcryptjs | Authentication and password hashing |
| Joi | Request validation |
| Winston | Logging |
| Swagger | API documentation |
| OpenAI SDK | Direct LLM integration |
| Vitest | Testing |
| ESLint + Prettier | Code quality and formatting |
| Docker + Docker Compose | Containerization |

---

## Prerequisites

- **Node.js** >= 18.x (see `.nvmrc` for the pinned version)
- **npm**
- **MongoDB** running locally or use the included Docker Compose setup
- A valid **OpenAI API key**

---

## Project Structure

```text
leia-workbench-backend/
├── api/               # Route definitions and endpoint handlers
├── src/               # Core application logic and services
├── tests/             # Vitest test suites
├── mermaid/           # Architecture and flow diagrams
├── .env.example       # Environment variable template
├── .env.docker        # Docker-specific environment configuration
├── .nvmrc             # Node.js version pin
├── docker-compose.yml # Compose orchestration (MongoDB + backend)
├── Dockerfile         # Container build configuration
└── package.json       # Dependencies and npm scripts
```

---

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Default | Description |
| --- | --- | --- |
| `MONGO_URI` | `mongodb://localhost:27017/workbenchv2` | MongoDB connection string |
| `FRONTEND_URL` | `http://localhost:8080` | Frontend URL added to CORS whitelist |
| `PORT` | `3001` | HTTP server port |
| `NODE_ENV` | `develop` | Runtime environment (`develop` / `production`) |
| `JWT_SECRET` | `secret` | Secret used to sign JWT tokens |
| `ADMIN_SECRET` | `secret` | Secret for privileged admin operations |
| `RUNNER_URL` | `http://localhost:5002` | URL of the LEIA Runner service |
| `RUNNER_KEY` | `R2D2C3PO` | Authentication key for the Runner service |
| `MANAGER_URL` | `http://localhost:3000` | URL of the Designer Backend (Manager API) |
| `MANAGER_KEY` | `secret` | Authentication key for the Designer Backend |
| `OPENAI_API_KEY` | _(required)_ | OpenAI API key for direct LLM calls |

:::warning
`OPENAI_API_KEY` has no default value, which implies **the server will not function without it**. Change all other default secrets (`JWT_SECRET`, `ADMIN_SECRET`, `RUNNER_KEY`, `MANAGER_KEY`) before any non-local deployment.
:::

---

## Local Development

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd leia-workbench-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure your values:

   ```bash
   cp .env.example .env
   ```

   At minimum, set your `OPENAI_API_KEY` and ensure `RUNNER_URL` and `MANAGER_URL` point to your local instances of those services.

4. Make sure MongoDB is running locally (default port `27017`).

5. Start the development server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`.
Swagger documentation is served at `http://localhost:3001/api-docs`.

---

## Docker Development

The repository includes a Docker Compose file that starts both MongoDB and the backend together (no local MongoDB installation required).

1. Copy the Docker environment file:

   ```bash
   cp .env.docker .env
   ```

2. Start all services:

   ```bash
   docker-compose up -d
   ```

3. To stop and remove the containers:

   ```bash
   docker-compose down
   ```

The backend will be available at `http://localhost:3001`. MongoDB is exposed on port `27019` to avoid conflicts with other local instances.

---

## API Routes

All routes are prefixed with `/api/v1`. Most endpoints require either an admin session cookie/JWT or the `ADMIN_SECRET` passed in the request.

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/secret` | - | Authenticate with the admin secret |
| `POST` | `/interactions/start` | - | Start a new session for a participant |
| `POST` | `/interactions/:sessionId/messages` | Session token | Send a message in an active session |
| `POST` | `/interactions/:sessionId/result` | Session token | Submit the final result and close the session |
| `GET` | `/interactions/:sessionId` | Admin / JWT | Get session data |
| `GET` | `/interactions/:sessionId/evaluation` | Admin / JWT | Get the AI evaluation of a session's result |
| `GET` | `/manager/experiments` | Admin | Fetch experiments from the Designer Backend |
| `GET` | `/replications` | Admin | List all replications |
| `POST` | `/replications` | Admin | Create a replication |
| `GET` | `/replications/:id` | Admin | Get replication details |
| `GET` | `/spectator` | Admin | Generate a spectator JWT for real-time viewing |
| `GET` | `/realtime/share` | Admin | Generate a share token for a replication |

---

## Socket.IO Events

The Workbench Backend uses Socket.IO for real-time communication. Connect to `http://localhost:3001` with one of the supported auth payloads:

```js
// Admin connection
{ adminSecret: "your-admin-secret" }

// Spectator connection (read-only view of a session)
{ jwt: "spectator-jwt-from-/spectator" }

// Share token connection (access to a specific replication)
{ shareToken: "share-token-from-/realtime/share" }
```

### Events emitted by the client

| Event | Payload | Description |
| --- | --- | --- |
| `spectate:join` | `sessionId` | Join a session room for real-time updates |
| `spectate:leave` | `sessionId` | Leave a session room |
| `dashboard:join` | `replicationId` | Join the replication dashboard room |
| `dashboard:leave` | `replicationId` | Leave the dashboard room |
| `session:typing` | `{ sessionId, isTyping }` | Broadcast typing indicator for a session |

### Events emitted by the server

| Event | Room | Description |
| --- | --- | --- |
| `user:typing` | `session:<sessionId>` | Relays typing status to spectators |
| `session:message` | `session:<sessionId>` | New message added to a session |
| `session:finished` | `session:<sessionId>` | Session was closed with a result |
| `dashboard:update` | `replication:<replicationId>` | Replication progress updated |

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `npm run dev` | Start with hot-reload |
| Production | `npm start` | Start the production server |
| Tests | `npm test` | Run all Vitest tests |
| Tests (watch) | `npm run test:watch` | Run tests in watch mode |
| Lint | `npm run lint` | Check code with ESLint |
| Lint fix | `npm run lint:fix` | Auto-fix lint issues |
| Format | `npm run format` | Format code with Prettier |

---

## Contributing

1. Fork the repository and create a branch off `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Follow the existing ESLint and Prettier configuration

   :::danger
   **Do not disable rules without justification.**
   :::

3. All new endpoints must include:
   - **Joi validation** for request bodies and query parameters.
   - **Proper error handling** with consistent HTTP status codes.
   - **Authentication checks** where sensitive data is involved.

4. Write or update **Vitest tests** for your changes:

   ```bash
   npm test
   ```

5. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

6. Open a Pull Request with a clear description of the API changes made.
