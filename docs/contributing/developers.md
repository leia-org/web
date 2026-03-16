---
sidebar_position: 9
tags:
  - contributing
  - guide
  - developers
  - installation
  - tools
keywords:
  - LEIA
  - contributing
  - installation
  - tools
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Installation for developers

In this section we will talk about needed tools in order to extend and work with leia environment locally. This guide is intended to be used by a LEIA contributor, which means its more complicated than the ussual installation. If you are meant to extend or work with leia please read on.

## LEIA deployment

### Locally run Github repositories (RECOMMENDED)

The first thing that you will need is [Git](https://git-scm.com/install/). If you do not have it installed yet please follow the tutorial on its official site, which is the following: [https://git-scm.com/install/](https://git-scm.com/install/)

Once you have Git installed clone all the official repositories and the ones you forked.

:::important
You do not need to clone all of them but it is strongly recommended. Make sure that you only fork the repos that you want to extend, this way it will be easier for you to identify which parts of the system you have to touch. If you want to know about `.env` variables check the respective section of the repo that you are investigating. Another important thing is that if you ever need to change another part of the system you just have to fork the respective repo and use that fork instead of the official one.
:::

:::important
Another way of working is using [Docker](https://docs.docker.com/engine/install/). If you do not have it installed yet, please follow the instructions provided in its [official documentation](https://docs.docker.com/engine/install/) and read on.
:::

Here you will find all the commands to clone every repo:

```bash
## Designer
git clone https://github.com/leia-org/leia-designer-backend.git
git clone https://github.com/leia-org/leia-designer-frontend.git
##  Runner
git clone https://github.com/leia-org/leia-runner.git
## Workbench
git clone https://github.com/leia-org/leia-workbench-backend.git
git clone https://github.com/leia-org/leia-workbench-frontend.git
## (Optional) Documentation
git clone https://github.com/leia-org/web.git
## (Optional) Infrastructure
git clone https://github.com/leia-org/leia-infrastructure-docker.git
```

Before doing anything else, make sure that you have at least one IDE installed and the proper tools.

:::tip
we recommend [VS-CODE](https://code.visualstudio.com/download)
:::

You will also need to install [node.js](https://nodejs.org/en/download). We strongly recommend also installing [nvm](https://github.com/nvm-sh/nvm) to be able to manage your node.js versions if you have it installed. Optionally, we recommend installing [redis](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/) and [MongoDB](https://www.mongodb.com/es/docs/manual/installation/). If you are missing one or more tools click in the links and this will guide you to the official installation page.

One you have the proper tools, just install all the repos dependencies and prepare your `.env` files. Check each repo section to understand them better and be concerned about the `.env` variables. You will need to add at least three entities to designed database before proceeding. To do so, please check [designer backend local development section](./designer-backend.md/#local-development)

```bash
## Designer
cd leia-designer-backend
npm install
cp .env.example .env
cd ..
cd leia-designer-frontend
npm install
cp .env.example .env
cd ..
##  Runner
cd leia-runner
npm install
cp .env.example .env
cd ..
## Workbench
cd leia-workbench-backend
npm install
cp .env.example .env
cd ..
cd leia-workbench-frontend
npm install
cp .env.example .env
cd ..
## (Optional) Documentation
cd web
npm install
cd ..
## (Optional) Infrastructure
cd leia-infrastructure-docker
cp .env.example .env
```

:::quick
To run every repo just follow the proper tutorial, but for most of them it is as simple as running `npm start`.
:::

Redis and MongoDB are very important because LEIA needs to connect to them. To do so, if you have them installed locally you probably will not have any problems, but if you prefer to use docker, just run the following commands and make sure to add to your `.env` variables the proper URLs.

```bash
docker run -d --name redis-container -p 6379:6379 redis:latest
docker run -d --name mongo-container -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest
```

After running theese commands you will have redis available in `localhost:6379` and Mongo available in `mongodb://admin:secret@localhost:27017`

:::danger
**Do not forget checking your .env files and adding the initial entities in your Designer database**
:::

### Use Docker images

It is possible to deploy LEIA in Docker. However, you still will need to have your forked repo to be cloned and executed locally. Please be advised that using docker **may imply some changes in your forks env variables.**. You will be required to have [Docker](https://docs.docker.com/engine/install/) installed on your system. If you do not have it, please follow the instructions provided in its [official documentation](https://docs.docker.com/engine/install/). You may also need to install [docker-compose](https://docs.docker.com/compose/install/). If you did not installed it when installing docker, just follow the intructions in its [official documentation](https://docs.docker.com/compose/install/)

Once you have all setup, please clone LEIA infrastructure and follow the tutorial of its [README.md](https://github.com/leia-org/leia-infrastructure-docker) or just keep reading. Do not forget to also check [infrastructure section](./infrastructure-docker.md). If you want to skip all the copy-pasted commands one by one here you have all of them together. Please be sure that you understand what you are doing.

```bash
git clone https://github.com/leia-org/leia-infrastructure-docker.git
cd leia-infrastructure-docker
cp .env.example .env
```

:::important
Once you have everything ready, please **modify your .env to include at least OPENAI_API_KEY**
:::

Now simply start LEIA as normal. Please note that we will start all services but actually you can use the other compose files if they adapt better to your needs.

```bash
docker-compose -f docker-compose.yaml up -d
```

After some time you will have all LEIA services running. Now it is time to stop and remove the containers that you will modify so you can run locally the forks. Clone your forks, install the dependencies and run them. 

:::danger
It is important to adapt env variables to your needs, because depending on what you are touching your will need to change some URLs or others. **Be advised that you must ensure that env variables are fine in both docker-compose `.env` and in your forked repos `.env`.**
:::
