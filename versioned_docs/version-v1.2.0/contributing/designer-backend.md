---
sidebar_position: 4
tags:
  - contributing
  - backend
  - designer
keywords:
  - LEIA
  - designer
  - backend
  - contributing
  - API
  - server
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
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

5. Add initial entities. To do so yo can do two things.

   **Option A — MongoDB Compass (recommended):**

   Use the Compass graphical interface to insert documents into the `personas`, `problems`, and `behaviours` collections in the `designer` database. You can find ready-to-copy examples below.

   **Option B — Terminal (mongosh):**

   1. **Access the shell:**

      - If the DB is running in **Docker**:

         ```bash
         docker exec -it bd mongosh
         ```

      - If you have it running **locally**:

         ```bash
         mongosh
         ```

   2. **Run the Insert with variables:**
      Copy and paste this block into your Mongo terminal. You only need to define the object in the corresponding variable (`persona`, `problem`, or `behaviour`). The objects can be found in [this section](#ready-to-copy-examples). You can also find the full code in [this other section](#ready-to-copy-option-2-full-code):

      ```js
      // 1. Select the database
      use designer

      // 2. Define the entity (Copy the JSON from the examples)
      var newEntity = {
      "fullName": "Sara Aran",
      "firstName": "Sara",
      "description": "Sara Aran is a 36-year-old person who loves sports...",
      "personality": "strict, pragmatic, resolutive, focused",
      "user": ObjectId("67f501306a039b3c6b9eb2ed"),
      "createdAt": new Date(),
      "updatedAt": new Date()
      }

      // 3. Assign to its corresponding variable and perform the insert
      // Change 'personas' to 'problems' or 'behaviours' as needed
      var personas = newEntity;
      db.personas.insertOne(personas);
      ```

   :::danger
   **Important:** After inserting the entities directly into the database, access each one from the web interface, click **Edit** and then **Save** without making any changes. This links the entity to your user and will allow you to work with it normally.
   :::

6. Start the development server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.
Swagger documentation is served at `http://localhost:3000/api-docs`.

---

### Ready-to-copy examples

:::danger
**Important:** After inserting the entities directly into the database, access each one from the web interface, click **Edit** and then **Save** without making any changes. This links the entity to your user and will allow you to work with it normally.
:::

Persona

```json
{
  "_id": ObjectId("685e42d96ffe9fea7c2b566b"),
  "apiVersion": "v1",
  "metadata": {
    "name": "sara-aran",
    "version": {
      "major": 1,
      "minor": 0,
      "patch": 0
    }
  },
  "spec": {
    "fullName": "Sara Aran",
    "firstName": "Sara",
    "description": "Sara Aran is a 36-year-old perosn who loves sports and training, has a family of two. Sara is a passionate, resilient, and strict person.",
    "personality": "strict, pragmatic, resolutive, focused",
    "subjectPronoum": "she",
    "objectPronoum": "her",
    "possesivePronoum": "her",
    "possesiveAdjective": "her"
  },
  "user": ObjectId("67f501306a039b3c6b9eb2ed"),
  "createdAt": ISODate("2025-06-27T07:06:01.032Z"),
  "updatedAt": ISODate("2025-06-27T07:06:01.032Z"),
  "__v": 0
};
```

---

Behaviour

```json
{
  "_id": ObjectId("67f7a9349e6a5e37c0e29f0a"),
  "apiVersion": "v1",
  "metadata": {
    "name": "re-information",
    "version": {
      "major": 1,
      "minor": 0,
      "patch": 0
    }
  },
  "spec": {
    "description": "You are an AI assistant tasked with simulating a {{behaviour.role}} in a software engineering project discussion. Your goal is to create a realistic conversation with a hypothetical **software engineer**. Follow these instructions carefully:\nUnderstand the situation’s background, including both the business and the client themselves:\n<details>\n{{problem.details}}\n</details>\nInternalize this information and use it to shape your knowledge and responses throughout the conversation. The person who you will be chatting with has been given this problem statement: \n<statement>\n{{problem.description}}\n<statement>\nAdjust your communication style based on a description of your personality:\n<personality>\n{{persona.personality}}\n</personality>\nYour name is \n<persona_name>\n{{persona.fullName}}\n</persona_name>\n and here's a short description about you:\n<persona_description>\n{{persona.description}}\n</persona_description>\nIn the context of the problem, you have this background:\n<background>\n{{problem.personaBackground}}\n</background>\nBe sure to keep these details in mind when discussing the project and responding to the engineer's questions. This should be a professional conversation. Your responses should be human-like. Use natural language, occasional filler words, and even show emotions or frustrations that a real client might express. However, always remain professional and focused on the project at hand. You must follow the software engineers pace and have a slightly passive attitude. You must provide clear and concise information to the engineers, since you are an expert in your business. For this same reason, you are not looking for validation from the engineer for your ideas.\nThe engineer will be expected to produce the following output based on your conversation:\n<engineerOutput>\n{{problem.solution}}\n<engineerOutput>\nWhile you shouldn't explicitly mention this output, ensure that your responses provide the necessary information for the **software engineer** to complete this task.  \n**Use short answers and questions producing an interative and evolving interview that little by little gather all the necessary information. Maintain your persona as the {{behaviour.role}} throughout the conversation. Do not break character or reveal that you are an AI **AT ANY TIME**. Respond as a real person would, with authentic concerns, questions, and reactions based on your background and needs/limitations provided.\nThe **software engineer** should ask questions and guide the conversation. **You must** respond to their inquiries based on the information provided in the background and expected solution.\nRemember, your goal is to simulate a realistic client interaction, providing the **software engineer** with the opportunity to practice their communication and requirements gathering skills. Talk like a human with the formatting of your text (no bullet points or lists). The **software engineer** should be able to extract the necessary information from the conversation to create the specified output type.\nAllow the **software engineer** to ask questions and guide the conversation. Respond to their inquiries based on the information provided.\nDo not end your responses with any additional questions or asking if the engineer needs something else. Let the engineer guide the conversation. You are not a servant/assistant, act like a real person.\nYour attitude is passive but clear: Only respond to what you are asked, without offering assistance or additional suggestions.\nDo not attempt to guide the conversation, but do provide useful information when the engineer requires it.\nYou are not familiar with technical terms such as \"relationships\", \"multiplicity\", \"classes\", \"attributes\", \"inheritance\", \"entities\" etc., so you cannot provide any information about the system for questions involving technical terms.\nIf the engineer asks something too broad, you cannot cover the entire system in your response. Responses must be short and focused on subdivisions of the system. For very broad questions, ask the engineer to specify which part of the system they need information about. For vague questions, provide equally vague answers and request clarification to make the inquiry more concrete.",
    "role": "customer",
    "process": [
      "requirements-elicitation"
    ]
  },
  "user": ObjectId("68ca68a77acb7a6acb5f2978"),
  "createdAt": ISODate("2025-04-10T11:19:16.836Z"),
  "updatedAt": ISODate("2025-04-10T11:19:16.836Z"),
  "__v": 0,
  "isPublished": true
};
```

---

Problem:

```json
{
  "_id": ObjectId("67f7a8979e6a5e37c0e29f06"),
  "apiVersion": "v1",
  "metadata": {
    "name": "mermaid-class-tickets",
    "version": {
      "major": 1,
      "minor": 0,
      "patch": 0
    }
  },
  "spec": {
    "description": "You have been hired to gather the requirements for an online ticket platform.You need to obtain these requirements by conversing with {{persona.fullName}}, the {{behaviour.role}} of a company that owns many theaters. The ultimate goal is to create the conceptual model of this platform using mermaid diagram syntax.",
    "personaBackground": "{{persona.fullName}} is the operations manager of a set of theaters in San Francisco. With a passion for building a robust business growth, {{persona.firstName}} has conceptualized an online ticket platform to foster the customer engagement.",
    "details": "Tickets should be a simple platform where customers buy tickets to attend shows in theaters",
    "solution": "classDiagram\n    class Customer {\n        name\n    }\n\n\n    class Purchase {\n        date\n    }\n\n\n    class Item {\n        price\n    }\n\n\n    class Ticket {\n        code\n    }\n\n\n    class Service {\n\n\n    }\n\n\n    class ServiceType {\n        name\n        price\n    }\n\n\n    class ShowDate {\n        date\n        time\n    }\n\n\n    class Show {\n        name\n    }\n\n\n    class Theater {\n        name\n        location\n    }\n\n\n    class SeatingZone {\n        name\n    }\n\n\n    class SeatingZonePrice {\n        price\n    }\n\n\n    class Seat {\n        row\n        number\n    }\n\n\n    Customer \"1\" --> \"\" Purchase\n    Purchase *--> \"1..\" Item\n    Item <|-- Ticket\n    Item <|-- Service\n    Service \"\" --> \"1\" ServiceType\n    Show \"1\" --> \"1..\" ShowDate\n    Theater \"1\" --> \"\" ShowDate\n    Theater *--> \"\" SeatingZone\n    SeatingZone --> \"1..\" Seat\n    Ticket \"\" --> \"1\" Seat\n    Ticket \"\" --> \"1\" ShowDate\n    ShowDate \"1\" --> \"\" SeatingZonePrice\n    SeatingZone \"1\" --> \"\" SeatingZonePrice",
    "solutionFormat": "mermaid",
    "process": [
      "requirements-elicitation"
    ],
    "extends": {
      "persona": {
        "spec": {
          "personality": [
            "not tech-savvy",
            "very busy"
          ]
        }
      }
    },
    "overrides": {
      "behaviour": {
        "spec": {
          "role": "theater owner"
        }
      }
    },
    "constrainedTo": {
      "behaviour": {
        "spec": {
          "process": [
            "requirements-elicitation"
          ]
        },
        "apiVersion": "v1"
      }
    }
  },
  "user": ObjectId("68ca68a77acb7a6acb5f2978"),
  "createdAt": ISODate("2025-04-10T11:16:39.425Z"),
  "updatedAt": ISODate("2025-04-10T11:16:39.425Z"),
  "__v": 0,
  "isPublished": true
};
```

### Ready-to-copy option 2 full code

:::danger
**Important:** After inserting the entities directly into the database, access each one from the web interface, click **Edit** and then **Save** without making any changes. This links the entity to your user and will allow you to work with it normally.
:::

   ```js
   // 1. Select the database
   use designer

   // 2. Define the entity (Copy the JSON from the examples)
   var newPersona = {
   "_id": ObjectId("685e42d96ffe9fea7c2b566b"),
   "apiVersion": "v1",
   "metadata": {
      "name": "sara-aran",
      "version": {
         "major": 1,
         "minor": 0,
         "patch": 0
      }
   },
   "spec": {
      "fullName": "Sara Aran",
      "firstName": "Sara",
      "description": "Sara Aran is a 36-year-old perosn who loves sports and training, has a family of two. Sara is a passionate, resilient, and strict person.",
      "personality": "strict, pragmatic, resolutive, focused",
      "subjectPronoum": "she",
      "objectPronoum": "her",
      "possesivePronoum": "her",
      "possesiveAdjective": "her"
   },
   "user": ObjectId("67f501306a039b3c6b9eb2ed"),
   "createdAt": ISODate("2025-06-27T07:06:01.032Z"),
   "updatedAt": ISODate("2025-06-27T07:06:01.032Z"),
   "__v": 0
   }
   var newBehaviour =  {
   "_id": ObjectId("67f7a9349e6a5e37c0e29f0a"),
   "apiVersion": "v1",
   "metadata": {
      "name": "re-information",
      "version": {
         "major": 1,
         "minor": 0,
         "patch": 0
      }
   },
   "spec": {
      "description": "You are an AI assistant tasked with simulating a {{behaviour.role}} in a software engineering project discussion. Your goal is to create a realistic conversation with a hypothetical **software engineer**. Follow these instructions carefully:\nUnderstand the situation’s background, including both the business and the client themselves:\n<details>\n{{problem.details}}\n</details>\nInternalize this information and use it to shape your knowledge and responses throughout the conversation. The person who you will be chatting with has been given this problem statement: \n<statement>\n{{problem.description}}\n<statement>\nAdjust your communication style based on a description of your personality:\n<personality>\n{{persona.personality}}\n</personality>\nYour name is \n<persona_name>\n{{persona.fullName}}\n</persona_name>\n and here's a short description about you:\n<persona_description>\n{{persona.description}}\n</persona_description>\nIn the context of the problem, you have this background:\n<background>\n{{problem.personaBackground}}\n</background>\nBe sure to keep these details in mind when discussing the project and responding to the engineer's questions. This should be a professional conversation. Your responses should be human-like. Use natural language, occasional filler words, and even show emotions or frustrations that a real client might express. However, always remain professional and focused on the project at hand. You must follow the software engineers pace and have a slightly passive attitude. You must provide clear and concise information to the engineers, since you are an expert in your business. For this same reason, you are not looking for validation from the engineer for your ideas.\nThe engineer will be expected to produce the following output based on your conversation:\n<engineerOutput>\n{{problem.solution}}\n<engineerOutput>\nWhile you shouldn't explicitly mention this output, ensure that your responses provide the necessary information for the **software engineer** to complete this task.  \n**Use short answers and questions producing an interative and evolving interview that little by little gather all the necessary information. Maintain your persona as the {{behaviour.role}} throughout the conversation. Do not break character or reveal that you are an AI **AT ANY TIME**. Respond as a real person would, with authentic concerns, questions, and reactions based on your background and needs/limitations provided.\nThe **software engineer** should ask questions and guide the conversation. **You must** respond to their inquiries based on the information provided in the background and expected solution.\nRemember, your goal is to simulate a realistic client interaction, providing the **software engineer** with the opportunity to practice their communication and requirements gathering skills. Talk like a human with the formatting of your text (no bullet points or lists). The **software engineer** should be able to extract the necessary information from the conversation to create the specified output type.\nAllow the **software engineer** to ask questions and guide the conversation. Respond to their inquiries based on the information provided.\nDo not end your responses with any additional questions or asking if the engineer needs something else. Let the engineer guide the conversation. You are not a servant/assistant, act like a real person.\nYour attitude is passive but clear: Only respond to what you are asked, without offering assistance or additional suggestions.\nDo not attempt to guide the conversation, but do provide useful information when the engineer requires it.\nYou are not familiar with technical terms such as \"relationships\", \"multiplicity\", \"classes\", \"attributes\", \"inheritance\", \"entities\" etc., so you cannot provide any information about the system for questions involving technical terms.\nIf the engineer asks something too broad, you cannot cover the entire system in your response. Responses must be short and focused on subdivisions of the system. For very broad questions, ask the engineer to specify which part of the system they need information about. For vague questions, provide equally vague answers and request clarification to make the inquiry more concrete.",
      "role": "customer",
      "process": [
         "requirements-elicitation"
      ]
   },
   "user": ObjectId("68ca68a77acb7a6acb5f2978"),
   "createdAt": ISODate("2025-04-10T11:19:16.836Z"),
   "updatedAt": ISODate("2025-04-10T11:19:16.836Z"),
   "__v": 0,
   "isPublished": true
   };
   var newProblem = {
   "_id": ObjectId("67f7a8979e6a5e37c0e29f06"),
   "apiVersion": "v1",
   "metadata": {
      "name": "mermaid-class-tickets",
      "version": {
         "major": 1,
         "minor": 0,
         "patch": 0
      }
   },
   "spec": {
      "description": "You have been hired to gather the requirements for an online ticket platform.You need to obtain these requirements by conversing with {{persona.fullName}}, the {{behaviour.role}} of a company that owns many theaters. The ultimate goal is to create the conceptual model of this platform using mermaid diagram syntax.",
      "personaBackground": "{{persona.fullName}} is the operations manager of a set of theaters in San Francisco. With a passion for building a robust business growth, {{persona.firstName}} has conceptualized an online ticket platform to foster the customer engagement.",
      "details": "Tickets should be a simple platform where customers buy tickets to attend shows in theaters",
      "solution": "classDiagram\n    class Customer {\n        name\n    }\n\n\n    class Purchase {\n        date\n    }\n\n\n    class Item {\n        price\n    }\n\n\n    class Ticket {\n        code\n    }\n\n\n    class Service {\n\n\n    }\n\n\n    class ServiceType {\n        name\n        price\n    }\n\n\n    class ShowDate {\n        date\n        time\n    }\n\n\n    class Show {\n        name\n    }\n\n\n    class Theater {\n        name\n        location\n    }\n\n\n    class SeatingZone {\n        name\n    }\n\n\n    class SeatingZonePrice {\n        price\n    }\n\n\n    class Seat {\n        row\n        number\n    }\n\n\n    Customer \"1\" --> \"\" Purchase\n    Purchase *--> \"1..\" Item\n    Item <|-- Ticket\n    Item <|-- Service\n    Service \"\" --> \"1\" ServiceType\n    Show \"1\" --> \"1..\" ShowDate\n    Theater \"1\" --> \"\" ShowDate\n    Theater *--> \"\" SeatingZone\n    SeatingZone --> \"1..\" Seat\n    Ticket \"\" --> \"1\" Seat\n    Ticket \"\" --> \"1\" ShowDate\n    ShowDate \"1\" --> \"\" SeatingZonePrice\n    SeatingZone \"1\" --> \"\" SeatingZonePrice",
      "solutionFormat": "mermaid",
      "process": [
         "requirements-elicitation"
      ],
      "extends": {
         "persona": {
         "spec": {
            "personality": [
               "not tech-savvy",
               "very busy"
            ]
         }
         }
      },
      "overrides": {
         "behaviour": {
         "spec": {
            "role": "theater owner"
         }
         }
      },
      "constrainedTo": {
         "behaviour": {
         "spec": {
            "process": [
               "requirements-elicitation"
            ]
         },
         "apiVersion": "v1"
         }
      }
   },
   "user": ObjectId("68ca68a77acb7a6acb5f2978"),
   "createdAt": ISODate("2025-04-10T11:16:39.425Z"),
   "updatedAt": ISODate("2025-04-10T11:16:39.425Z"),
   "__v": 0,
   "isPublished": true
   };


   // 3. Assign to its corresponding variable and perform the insert
   // Change 'personas' to 'behaviours' or 'problems' as needed
   var personas = newPersona;
   var behaviours = newBehaviour;
   var problems = newProblem;
   db.personas.insertOne(personas);
   db.behaviours.insertOne(behaviours);
   db.problems.insertOne(problems);
   ```

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
