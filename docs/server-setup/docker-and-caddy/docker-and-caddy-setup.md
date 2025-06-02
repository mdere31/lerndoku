---
title: "Docker and Caddy Setup"
sidebar_position: 3
---

# Docker and Caddy Setup

In this documentation, I will explain how I set up the docker containers and caddy webserver for my server.

I created the server on Hetzner first, and also explained it on my other documentation about "Hetzner Setup". Now, I will log in to my server using my private key:

ssh root@23.88.56.69 -i /Users/mdere/.ssh/mde_key1 //Since we have a domain, we can also use the domain to connect to our server:
ssh root@ncaleague.app -i /Users/mdere/.ssh/mde_key1

Then, I have to switch to root user to get higher privileges.

sudo su root //Give password

I also have to install docker-compose to be able to use it.

apt install docker-compose

Now, I will create some folders for my Docker images and Docker-Compose files. I want to be able to access them easily, so I will create the folders in the home directory:

cd /home

mkdir docker-images

cd docker-images/

mkdir docker-compose-files

cd docker-compose-files/

mkdir dev //This will be used to store the Docker-Compose file for the development environment (backend, frontend, database and database management tool)
mkdir prod //This will be used to store the Docker-Compose file for the production environment (backend, frontend, database and database management tool)
mkdir central //This will be used to store the Docker-Compose file for the Caddy webserver
mkdir watchtower //This will be used to store the Docker-Compose file for the Watchtower (auto updating containers with newest images)

All I have to do now is to copy the rest of the configuration files to the server. For that, I use "scp" with my private key for a safe copy (Note that you have to be in the same directory as the file that you want to copy if you want to use these commands as they are):

central-caddyfile:
scp -i /path/to/key/my_key1 Caddyfile mde@ncaleague.app:/home/docker-images/docker-compose-files/central/

central-compose:
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/central/

dev-caddyfile:
scp -i /path/to/key/my_key1 Caddyfile mde@ncaleague.app:/home/docker-images/docker-compose-files/dev/

dev-compose:
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/dev/

dev-environment:
scp -i /path/to/key/my_key1 .env.development mde@ncaleague.app:/home/docker-images/docker-compose-files/dev/

prod-caddyfile:
scp -i /path/to/key/my_key1 Caddyfile mde@ncaleague.app:/home/docker-images/docker-compose-files/prod/

prod-compose:
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/prod/

prod-environment:
scp -i /path/to/key/my_key1 .env.production mde@ncaleague.app:/home/docker-images/docker-compose-files/prod/

watchtower-compose:
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/watchtower/

watchtower-environment:
scp -i /path/to/key/my_key1 .env.watchtower mde@ncaleague.app:/home/docker-images/docker-compose-files/watchtower/
