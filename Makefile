### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install-frontend
install-frontend:  ## Install React Frontend
	$(MAKE) -C "./frontend/" install

.PHONY: build-frontend
build-frontend:  ## Build React Frontend
	$(MAKE) -C "./frontend/" build

.PHONY: start-frontend
start-frontend:  ## Start React Frontend
	$(MAKE) -C "./frontend/" start

.PHONY: build-api
build-api:  ## Create virtualenv and install Plone
	$(MAKE) -C "./api/" build

.PHONY: create-site
create-site:  build-api ## Create a Plone site with default content
	$(MAKE) -C "./api/" create-site

.PHONY: start-api
start-api: ## Start Plone Backend
	$(MAKE) -C "./api/" start

.PHONY: install
install:  ## Install
	@echo "Install API & Frontend"
	$(MAKE) build-api
	$(MAKE) install-frontend

.PHONY: build
build:  ## Build
	@echo "Build"
	$(MAKE) build-api
	$(MAKE) build-frontend

.PHONY: start
start:  ## Start
	@echo "Starting application"
	$(MAKE) start-api
	$(MAKE) start-frontend

.PHONY: format
format:  ## Format codebase
	@echo "Build"
	$(MAKE) -C "./api/" format
	$(MAKE) -C "./frontend/" format


.PHONY: build-images
build-images:  ## Build docker images
	@echo "Build"
	$(MAKE) -C "./api/" build-image
	$(MAKE) -C "./frontend/" build-image
