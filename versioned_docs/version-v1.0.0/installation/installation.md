---
sidebar_position: 1
tags:
  - guide
  - installation
  - LEIA
keywords:
  - LEIA
  - installation
  - tools
  - docker-compose
  - docker
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Installation and deployment

This section is meant to be a simple step-by-step guide in order to install LEIA with ease. Please if you are a developer and your are meant to extend the system just move on to [contributing section](../contributing/index.md).

First of all, we will require to clone the infrastructure repo, prepare the enviroment variables and start LEIA. Before proceeding make sure you have [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed on your system, and create an OpenAI apikey. If you do not know how to generate an OpenAI apikey, follow this [tutorial](https://developers.openai.com/api/docs/quickstart/).

Now simply clone the infrastructure repository, change the environment variables to the desired ones and test LEIA.

```bash
git clone https://github.com/leia-org/leia-infrastructure-docker.git
cd leia-infrastructure-docker
cp .env.example .env
```

Your .env should look like this:

:::tip
Use Docker secrets so you improve your security.
:::

```bash
# Database
MONGO_USERNAME=admin
MONGO_PASSWORD=changeme
MONGO_PORT_DESIGNER=27017
MONGO_PORT_WORKBENCH=27018
REDIS_PORT=6379

# Security
JWT_SECRET=your-jwt-secret-here
API_KEY=your-api-key-here
RUNNER_KEY=your-runner-key-here
DESIGNER_BACKEND_KEY=your-designer-backend-key-here
ADMIN_SECRET=your-admin-secret-here
OPENAI_API_KEY=sk-your-openai-api-key-here

# Service Configuration
NODE_ENV=development
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=changeme

# AI/ML Configuration
OPENAI_EVALUATION_MODEL=gpt-4o
DEFAULT_MODEL=openai

# Service URLs (Internal - Docker network)
DESIGNER_BACKEND_URL=http://designer-backend:80
WORKBENCH_BACKEND_URL=http://workbench-backend:80
RUNNER_URL=http://runner:80

# Frontend URLs (External)
DESIGNER_FRONTEND_URL=http://localhost:3004
WORKBENCH_FRONTEND_URL=http://localhost:3005

# Service Ports (External)
PORT_DESIGNER_BACKEND=3001
PORT_WORKBENCH_BACKEND=3002
PORT_RUNNER=3003
PORT_DESIGNER_FRONTEND=3004
PORT_WORKBENCH_FRONTEND=3005
```

Now you will be required to use strong passwords and keys. Do not forget to include your generated OpenAI apikey.
