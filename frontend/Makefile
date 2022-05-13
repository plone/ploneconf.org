### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules
IMAGE_NAME=plone/ploneconf-frontend
IMAGE_TAG=latest

NODEBIN = ./node_modules/.bin

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Install the frontend
	@echo "Install frontend"
	yarn install

.PHONY: build
build: install ## Build the frontend
	@echo "Build Frontend"
	yarn build

.PHONY: start
start: ## Start Frontend
	yarn start

.PHONY: format-prettier
format-prettier: ## Format Code with Prettier
	yarn run prettier:fix

.PHONY: format-stylelint
format-stylelint: ## Format Code with Stylelint
	yarn run stylelint:fix

.PHONY: format-lint
format-lint: ## Format Code with Lint
	yarn run lint:fix

.PHONY: format
format: format-prettier format-stylelint format-lint ## Format the codebase according to our standards

.PHONY: test
test: ## Run tests
	yarn run test:ci

.PHONY: build-image
build-image:  ## Build Docker Image
	@docker build . -t $(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile


# Acceptance tests

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start Test Acceptance Server Main Fixture (docker container)
	docker run -i --rm -e ZSERVER_HOST=0.0.0.0 -e ZSERVER_PORT=55001 -p 55001:55001 -e ADDONS='$(KGS) plone.app.robotframework==2.0.0a3 plone.app.testing==7.0.0a3' -e APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.volto:default-homepage -e CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,plone.volto,plone.volto.cors $(DOCKER_IMAGE) ./bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-test-acceptance-frontend-dev
start-test-acceptance-frontend-dev: ## Start the Core Acceptance Frontend Fixture in dev mode
	RAZZLE_API_PATH=http://localhost:55001/plone yarn start

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: ## Start the Core Acceptance Frontend Fixture
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && yarn start:prod

.PHONY: test-acceptance
test-acceptance: ## Start Core Cypress Acceptance Tests
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress open

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Start Core Cypress Acceptance Tests in headless mode
	NODE_ENV=production CYPRESS_API=plone $(NODEBIN)/cypress run

.PHONY: full-test-acceptance
full-test-acceptance: ## Runs Core Full Acceptance Testing in headless mode
	$(NODEBIN)/start-test "make start-test-acceptance-server" http-get://localhost:55001/plone "make start-test-acceptance-frontend" http://localhost:3000 "make test-acceptance-headless"
