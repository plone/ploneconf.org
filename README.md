# 2022.ploneconf.org

## Quick start

### Requirements

- Python 3.9
- Node 16 / yarn
- Docker

### Install

```shell
git clone git@github.com:plone/ploneconf.org.git
cd ploneconf.org
make install
make create-site
```

### Start

Start the Backend (http://localhost:8080/)

```shell
make start-backend
```

Start the Frontend (http://localhost:3000/)

```shell
make start-frontend
```

## Structure

This monorepo is composed by two distinct codebases: api and frontend.

- **backend**: API (Backend) Plone installation using pip (not buildout). Includes a policy package named ploneconf.core
- **frontend**: React (Volto) package named ploneconf

### Reasoning

- Repo contains all codebase needed to run the 2021.ploneconf.org (excluding existing addons for Plone and React).
- Github Workflows are triggered based on changes on each codebase (see .github/workflows)
- Easier to create Docker images for each codebase
- Showcase Plone installation/setup without buildout
