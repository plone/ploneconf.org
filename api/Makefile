### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

PACKAGE_NAME=ploneconf.core
PACKAGE_PATH=src/ploneconf.core/src/ploneconf/core
IMAGE_NAME=plone/ploneconf-api:latest
CHECK_PATH=src/ploneconf.core/setup.py scripts/ $(PACKAGE_PATH)


# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: clean-build clean-pyc clean-test ## remove all build, test, coverage and Python artifacts

.PHONY: clean-build
clean-build: ## remove build artifacts
	rm -fr build/
	rm -fr dist/
	rm -fr .eggs/
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '*.egg' -exec rm -f {} +

.PHONY: clean-pyc
clean-pyc: ## remove Python file artifacts
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -fr {} +

.PHONY: clean-test
clean-test: ## remove test and coverage artifacts
	rm -f .coverage
	rm -fr htmlcov/

bin/pip:
	@echo "$(GREEN)==> Setup Virtual Env$(RESET)"
	python3 -m venv .
	bin/pip install "pip==19.3.1"
	bin/pip install "setuptools==57.4.0"

bin/mkwsgiinstance:	bin/pip
	@echo "$(GREEN)==> Install Plone and create instance$(RESET)"
	bin/pip install -r requirements/plone.txt
	bin/mkwsgiinstance -s skel -d . -u admin:admin

.PHONY: build
build: bin/mkwsgiinstance ## Create virtualenv and run buildout
	@echo "$(GREEN)==> Setup Build$(RESET)"
	bin/pip install -r requirements.txt

.PHONY: build
build-dev: bin/mkwsgiinstance ## Create virtualenv and run buildout
	@echo "$(GREEN)==> Setup Build$(RESET)"
	bin/pip install -r requirements/dev.txt

.PHONY: black
black: ## Format codebase
	./bin/black $(CHECK_PATH)

.PHONY: isort
isort: ## Format imports in the codebase
	./bin/isort $(CHECK_PATH)

.PHONY: format
format: black isort ## Format the codebase according to our standards

.PHONY: lint
lint: lint-isort lint-black ## check style with flake8

.PHONY: lint-black
lint-black: ## validate black formating
	./bin/black --check --diff $(CHECK_PATH)

.PHONY: lint-isort
lint-isort: ## validate using isort
	./bin/isort --check-only $(CHECK_PATH)

.PHONY: test
test: ## run tests
	./bin/zope-testrunner --auto-color --auto-progress --test-path src/ploneconf.core/src/

.PHONY: test_quiet
test_quiet: ## run tests removing deprecation warnings
	PYTHONWARNINGS=ignore ./bin/zope-testrunner --auto-color --auto-progress --test-path src/ploneconf.core/src/

.PHONY: create-site
create-site: ## Create a new site from scratch
	PYTHONWARNINGS=ignore ./bin/zconsole run etc/zope.conf ./scripts/create_site.py

.PHONY: start
start: ## Start a Plone instance on localhost:8080
	PYTHONWARNINGS=ignore ./bin/runwsgi etc/zope.ini

.PHONY: build-image
build-image:  ## Build Docker Image
	@docker build . -t $(IMAGE_NAME) -f Dockerfile
