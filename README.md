# 2021.ploneconf.org

## Quick start

### Requirements

- Python 3.8
- Node 14 / yarn
- Docker

### Install

```shell
git clone git@github.com:plone/2021.ploneconf.org.git
cd 2021.ploneconf.org
make install
make create-site
```

### Start

Start the API (http://localhost:8080/)

```shell
make start-api
```

Start the Frontend (http://localhost:3000/)

```shell
make start-frontend
```

## Structure

This monorepo is composed by two distinct codebases: api and frontend.

- **api**: API (Backend) Plone installation using pip (not buildout). Includes a policy package named ploneconf.core
- **frontend**: React (Volto) package named ploneconf

### Reasoning

- Repo contains all codebase needed to run the 2021.ploneconf.org (excluding existing addons for Plone and React).
- Github Workflows are triggered based on changes on each codebase (see .github/workflows)
- Easier to create Docker images for each codebase
- Showcase Plone installation/setup without buildout
