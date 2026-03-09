---
sidebar_position: 4
---

# Designer Backend

**Repository:** [leia-org/leia-designer-backend](https://github.com/leia-org/leia-designer-backend)

The backend service powering the LEIA Designer. It exposes a REST API for managing LEIAs, personas, problems, and experiments, and integrates with the LEIA Runner for AI session execution.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js + Express.js | Runtime and HTTP server |
| MongoDB + Mongoose | Database and ODM |
| JWT + bcryptjs | Authentication and password hashing |
| Joi | Request validation |
| Winston | Logging |
| Swagger | API documentation |
| Axios | HTTP client for inter-service communication |
| Vitest | Testing |
| ESLint + Prettier | Code quality and formatting |
| Docker + Docker Compose | Containerization |

---

## Prerequisites

- **Node.js** >= 18.x (see `.nvmrc` for the pinned version)
- **npm**
- **MongoDB** running locally or use the included Docker Compose setup

---

## Project Structure

```text
leia-designer-backend/
├── api/               # Route definitions and endpoint handlers
├── src/               # Core application logic and services
├── tests/             # Vitest test suites
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
| `MONGO_URI` | `mongodb://localhost:27017/manager` | MongoDB connection string |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL added to CORS whitelist |
| `PORT` | `3000` | HTTP server port |
| `NODE_ENV` | `develop` | Runtime environment (`develop` / `production`) |
| `JWT_SECRET` | `secret` | Secret used to sign JWT tokens |
| `DEFAULT_ADMIN_EMAIL` | `admin@leiaorg.com` | Email of the seeded admin account |
| `DEFAULT_ADMIN_PASSWORD` | `secret` | Password of the seeded admin account |
| `API_KEY` | `secret` | Key for inter-service API authentication |
| `RUNNER_URL` | `http://localhost:5002` | URL of the LEIA Runner service |
| `RUNNER_KEY` | `R2D2C3PO` | Authentication key for the Runner service |

:::warning
Never commit your `.env` file. Change all default secrets (`JWT_SECRET`, `API_KEY`, `RUNNER_KEY`, `DEFAULT_ADMIN_PASSWORD`) before any non-local deployment.
:::

---

## Local Development

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd leia-designer-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure your values:

   ```bash
   cp .env.example .env
   ```

4. Make sure MongoDB is running locally (default port `27017`).

5. Start the development server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.
Swagger documentation is served at `http://localhost:3000/api-docs`.

---

## Docker Development

The repository includes a Docker Compose file that starts both MongoDB and the backend together. No local MongoDB installation required.

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

The backend will be available at `http://localhost:3000`. MongoDB is exposed on port `27018` to avoid conflicts with any locally running instance.

---

## User Roles

The Designer Backend implements role-based access control. Every authenticated user has one of these roles:

| Role | Description | Typical holder |
| --- | --- | --- |
| `admin` | Full access to all resources and all users' data | Platform administrator |
| `instructor` | Create and manage own experiments | Course instructor |
| `advanced` | Create and modify personas, behaviours, problems, and LEIAs | Power user / researcher |
| `read` | Read-only access (granted to service accounts via `API_KEY`) | Workbench Backend |

Service-to-service calls from the Workbench Backend use the `x-api-key` header instead of a JWT, and are treated as `read` role internally.

---

## API Routes

All routes are prefixed with `/api/v1`. JWT-authenticated endpoints require the `Authorization: Bearer <token>` header. Service endpoints accept `x-api-key: <API_KEY>` instead.

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/users` | JWT (admin) | Create a new user |
| `POST` | `/auth/login` | - | Log in and receive a JWT |
| `GET` | `/personas` | JWT / API key | List all personas |
| `POST` | `/personas` | JWT | Create a persona |
| `GET` | `/personas/:id` | JWT / API key | Get a persona by ID |
| `DELETE` | `/personas/:id` | JWT | Delete a persona |
| `GET` | `/behaviours` | JWT / API key | List all behaviours |
| `POST` | `/behaviours` | JWT | Create a behaviour |
| `GET` | `/behaviours/:id` | JWT / API key | Get a behaviour by ID |
| `DELETE` | `/behaviours/:id` | JWT | Delete a behaviour |
| `GET` | `/problems` | JWT / API key | List all problems |
| `POST` | `/problems` | JWT | Create a problem |
| `GET` | `/problems/:id` | JWT / API key | Get a problem by ID |
| `DELETE` | `/problems/:id` | JWT | Delete a problem |
| `GET` | `/leias` | JWT / API key | List all LEIAs |
| `POST` | `/leias` | JWT | Create a LEIA |
| `GET` | `/leias/:id` | JWT / API key | Get a LEIA by ID |
| `DELETE` | `/leias/:id` | JWT | Delete a LEIA |
| `GET` | `/experiments` | JWT / API key | List all experiments |
| `POST` | `/experiments` | JWT | Create an experiment |
| `GET` | `/experiments/:id` | JWT / API key | Get an experiment by ID |
| `POST` | `/runner/initialize` | JWT | Initialize a Runner session |
| `POST` | `/runner/:sessionId/messages` | JWT | Send a message to a Runner session |

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

2. Follow the existing ESLint and Prettier configuration.

   :::danger
   **Do not disable rules without justification.**
   :::

3. All new endpoints must include:
   - **Joi validation** for request bodies and query parameters.
   - **Proper error handling** with consistent HTTP status codes.

4. Write or update **Vitest tests** for your changes:

   ```bash
   npm test
   ```

5. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

6. Open a Pull Request with a clear description of the API changes made.
