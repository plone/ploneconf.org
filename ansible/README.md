# Plone Conf site deployment with Ansible and Docker Stack

## Setup

Install Python 3 virtual environment and Ansible

```shell
cd ansible
make clean
make setup
```

## Source configuration

### For Local Deployment (Using Vagrant)

```shell
source .env_local
```
### For Production

Create `.env_prod`, if it does not exist, setting all values defined in `.env_local`, then:

```shell
source .env_prod
```

## Docker configuration

As the images used in this deployment are public, just make sure you already are logged in with Docker.

After that, we need to create a new docker context, to be stored inside this folder.

```shell
make docker-setup
```

## Deploy

```shell
make all
```

## Check Status

```shell
make status
```
