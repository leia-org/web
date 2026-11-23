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

The LEIA Runner is the AI session execution engine. It manages LEIA instances, handles student–AI conversations in real time, and integrates with LLM providers (OpenAI, Gemini, Ollama and ALMA). It is consumed by both the Designer Backend and the Workbench Backend.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js + Express.js | Runtime and HTTP server |
| Redis | Session state, conversation history and session expiration |
| OpenAI SDK, @google/genai | OpenAI and Gemini providers (Ollama and ALMA are called over HTTP) |
| Zod | Request schema validation |
| Swagger UI | Interactive API documentation |
| Vitest | Testing |
| nodemon | Dev server with auto-reload |
| Docker | Containerization |

---

## Prerequisites

- **Node.js** >= 20.x
- **npm**
- **Redis** running locally (default: `redis://localhost:6379`)
- A running **leia-auth** service. Users store their provider API keys (OpenAI, Gemini, Ollama or ALMA) there and the Runner resolves them for each session

---

## Project Structure

```text
leia-runner/
├── api/               # OpenAPI/Swagger spec files
├── config/            # Configuration and environment loading
├── controllers/       # Request handlers for each route
├── models/            # Model manager, conversation store and one module per LLM provider
├── routes/            # Route definitions
├── services/          # Core business logic and LLM integration
├── tests/             # Vitest test suites
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
| `DEFAULT_MODEL` | `openai-responses` | Provider module used when a session does not name one |
| `VITE_AUTH_SERVICE_BACKEND` | `http://localhost:3005` | leia-auth URL, used to resolve the API key of each session |
| `INTERN_TOKEN` | `secret_intern_token` | Shared token for the Runner → leia-auth calls (same value in leia-auth) |
| `CONVERSATION_HISTORY_MAX_MESSAGES` | `60` | Messages kept in the history of stateless providers (Ollama, ALMA) |
| `SESSION_TTL_SECONDS` | `86400` | Seconds a session lives in Redis after its last activity. `0` disables expiration |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server, overridden by the base URL of the user's key |
| `OLLAMA_MODEL` / `OLLAMA_EVALUATION_MODEL` | `gemma3:4b` | Ollama models for conversation and evaluation |
| `ALMA_BASE_URL` | `https://alma.us.es/api/models/llama-3.1-8b-instruct/v1` | Base URL of one ALMA model, overridden by the base URL of the user's key |
| `ALMA_MODEL` | `meta-llama/Llama-3.1-8B-Instruct` | Model id sent to ALMA (the Hugging Face repo id, not the URL slug) |
| `ALMA_MAX_TOKENS` / `ALMA_EVALUATION_MAX_TOKENS` | `1024` / `2048` | Token limits per reply and per evaluation |
| `OPENAI_API_KEY` / `GEMINI_API_KEY` | - | Only for the problem, behaviour and transcription generators, which use the provider in `AI_PROVIDER` (`openai` or `gemini`) |

:::warning
LEIA sessions do not use API keys from `.env`: without leia-auth running (and the same `INTERN_TOKEN` on both sides) no session can start. Change `RUNNER_KEY` and `INTERN_TOKEN` from their defaults before any non-local deployment.
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

   At minimum, set `VITE_AUTH_SERVICE_BACKEND` and `INTERN_TOKEN` to match your leia-auth instance.

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
| Unit tests | `npm run test:unit` | Run the unit tests (no network or Redis needed) |
| Provider tests | `npm run test:provider` | OpenAI and Gemini integration tests (`OPENAI_API_KEY`, `GEMINI_API_KEY`) |
| ALMA tests | `npm run test:alma` | ALMA unit and integration tests (`ALMA_API_KEY`) |
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
    "provider": "openai-responses",
    "modelName": "gpt-5.4-mini",
    "apiKeyId": "leia-auth-api-key-id",
    "apiKeyRequesterId": "leia-auth-user-id"
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
| `GET` | `/models` | List the provider modules, the models of each API key provider and the current default |

**Available providers:**

| Provider module | API key provider | Description |
| --- | --- | --- |
| `openai-responses` | `openai` | OpenAI Responses API (default). The only provider with tool calling (widgets) |
| `gemini-3.1-flash-lite-preview` | `gemini` | Google Gemini Interactions API |
| `ollama` | `ollama` | Local models served by Ollama |
| `alma` | `alma` | ALMA (alma.us.es), OpenAI-compatible, one base URL per model (`https://alma.us.es/api/models/{slug}/v1`) |

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

1. Fork the repository and create a branch off `develop`, the integration branch:

   ```bash
   git checkout -b feature/my-feature origin/develop
   ```

2. Make sure Redis is running and your `.env` is configured before running any tests.

3. Write or update **Vitest tests** for any new or modified behaviour:

   ```bash
   npm run test:unit
   ```

4. Use **Conventional Commits** for your commit messages (`feat:`, `fix:`, `docs:`, etc.).

5. Open a Pull Request against `develop` with a clear description of the changes to the session execution logic or API surface.
