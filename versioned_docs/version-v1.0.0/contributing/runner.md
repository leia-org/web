---
sidebar_position: 5
tags:
  - contributing
  - backend
  - api
  - runner
keywords:
  - LEIA
  - runner
  - customer API
  - backend
  - contributing
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Runner (LEIA Customer API)

**Repository:** [leia-org/leia-runner](https://github.com/leia-org/leia-runner)

The LEIA Runner is the AI session execution engine. It manages LEIA instances, handles student–AI conversations in real time, and integrates with LLM providers (OpenAI). It is consumed by both the Designer Backend and the Workbench Backend.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js + Express.js | Runtime and HTTP server |
| Redis | Session state and task queuing |
| OpenAI SDK | LLM provider integration |
| Zod | Request schema validation |
| Swagger UI | Interactive API documentation |
| Jest | Testing |
| nodemon | Dev server with auto-reload |
| Docker | Containerization |

---

## Prerequisites

- **Node.js** >= 16.x
- **npm**
- **Redis** running locally (default: `redis://localhost:6379`)
- A valid **OpenAI API key**

---

## Project Structure

```text
leia-runner/
├── api/               # OpenAPI/Swagger spec files
├── config/            # Configuration and environment loading
├── controllers/       # Request handlers for each route
├── models/            # Data models and schemas
├── routes/            # Route definitions
├── services/          # Core business logic and LLM integration
├── tests/             # Jest test suites
├── utils/             # Utility functions
├── index.js           # Application initialization
├── server.js          # Server entry point
├── .env.example       # Environment variable template
├── .oastoolsrc        # OpenAPI tooling configuration
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
| `PORT` | `5002` | HTTP server port |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string |
| `RUNNER_KEY` | `R2D2C3PO` | Bearer token required by callers to authenticate requests |
| `OPENAI_API_KEY` | _(required)_ | OpenAI API key for LLM calls |
| `DEFAULT_MODEL` | `openai-assistant` | Default LLM model used for new sessions |

:::warning
`OPENAI_API_KEY` has no default value, which implies **the server will not function without it**. Change `RUNNER_KEY` from its default before any non-local deployment.
:::

---

## Local Development

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd leia-runner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure your values:

   ```bash
   cp .env.example .env
   ```

   At minimum, set `OPENAI_API_KEY` to your OpenAI key.

4. Make sure Redis is running locally on port `6379`.

5. Start the development server with auto-reload:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5002`.
Interactive Swagger documentation is served at `http://localhost:5002/docs`.

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `npm run dev` | Start with nodemon (auto-reload) |
| Production | `npm start` | Start the production server |
| Tests | `npm test` | Run all Jest tests |
| Install | `npm run setup` | Install all dependencies |
| Update deps | `npm run update-deps` | Update all dependencies |

---

## API Reference

All endpoints are prefixed with `/api/v1`. Every request must include:

```text
Authorization: Bearer <RUNNER_KEY>
```

### Sessions

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/leias` | Create a new LEIA session instance |
| `POST` | `/leias/:sessionId/messages` | Send a message to an active session |

**`POST /leias` request body:**

```json
{
  "sessionId": "unique-session-id",
  "leia": {
    "spec": {
      "persona": { },
      "behaviour": { },
      "problem": { }
    }
  },
  "runnerConfiguration": {
    "provider": "openai-assistant"
  }
}
```

**`POST /leias/:sessionId/messages` request body:**

```json
{ "message": "Hello, I need help with this problem." }
```

### Models

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/models` | List available LLM models and the current default |

**Available models:**

| Model ID | Description |
| --- | --- |
| `openai` | Standard OpenAI chat completion |
| `openai-assistant` | OpenAI Assistants API (default) |
| `openai-advanced` | Advanced reasoning model |

### Evaluation

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/evaluation` | Evaluate a participant's final result against the LEIA's problem criteria |

**Request body:**

```json
{
  "sessionId": "unique-session-id",
  "result": "The participant's final answer..."
}
```

**Response:**

```json
{
  "evaluation": "Detailed evaluation text...",
  "score": 85
}
```

### Problem Generation

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/problems/generate` | Use AI to generate a new problem definition |

### Cache

| Method | Endpoint | Description |
| --- | --- | --- |
| `DELETE` | `/cache/purge` | Clear cached session data. Accepts `?sessionId=<id>` to target one session |
| `GET` | `/cache/stats` | Get Redis cache statistics |

### Transcription

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/transcriptions/generate` | Generate a text transcription from an audio file (multipart/form-data) |

Full request/response schemas are available in the interactive Swagger UI at `http://localhost:5002/docs`.

---

## Contributing

1. Fork the repository and create a branch off `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Make sure Redis is running and your `.env` is configured before running any tests.

3. Write or update **Jest tests** for any new or modified endpoints:

   ```bash
   npm test
   ```

4. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

5. Open a Pull Request with a clear description of the changes to the session execution logic or API surface.
