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
# PORTS CONFIGURATION (External Host Ports)
PORT_AUTH=3005
PORT_DESIGNER_BACKEND=3000
PORT_DESIGNER_FRONTEND=5173
PORT_WORKBENCH_BACKEND=3001
PORT_WORKBENCH_FRONTEND=8080
PORT_RUNNER=5002

# DATABASE & CACHE CONFIGURATION
MONGO_PORT=27017
MONGO_USERNAME=admin
MONGO_PASSWORD=changeme
REDIS_PORT=6379

# LOCAL S3 STORAGE (MinIO)
S3_PORT=9000
S3_CONSOLE_PORT=9001
S3_ROOT_USER=minio
S3_ROOT_PASSWORD=changeme123
S3_ACCESS_KEY_ID=minio
S3_SECRET_ACCESS_KEY=changeme123
S3_REGION=us-east-1
S3_BUCKET=leia-images

# SECURITY & SECRETS
JWT_SECRET=your-jwt-secret-change-this-in-production
API_KEY=your-api-key-change-this-in-production
RUNNER_KEY=your-runner-key-change-this-in-production
ADMIN_SECRET=your-admin-secret-change-this-in-production
INTERN_TOKEN=your-intern-token-change-this-in-production
API_KEY_STORAGE_SECRET=13af25e58655f106648d94972678da29d6cce43bb40a48f1ed049adcff962be6

# DEFAULT ADMIN USER
DEFAULT_ADMIN_EMAIL=admin@leia.org
DEFAULT_ADMIN_PASSWORD=admin123

# AI / LLM CONFIGURATION
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=
OPENAI_EVALUATION_MODEL=gpt-5.4-mini
DEFAULT_MODEL=openai-responses

# ENVIRONMENT
NODE_ENV=production
```

Now you will be required to use strong passwords and keys. Do not forget to include your generated OpenAI API key.

To start the platform, run:

```bash
docker compose up -d
# Or to build from local code:
docker compose up -d --build
```

