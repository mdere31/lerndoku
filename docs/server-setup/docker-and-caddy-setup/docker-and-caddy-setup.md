---
title: Docker and Caddy Setup
sidebar_position: 3
---

# Docker and Caddy Setup

In dieser Dokumentation werde ich erklären, wie ich Docker und Caddy auf meinem Server aufgesetzt habe.

Ich muss jetzt wieder einloggen:

```
ssh mde@ncaleague.app -i /Users/mdere/.ssh/mde_key1
```

Dann noch zum "root"-Benutzer wechseln, damit ich Zugriff habe (auf Docker Engine):

```
sudo su root //Muss noch ein Passwort eingeben
```

Ich muss noch docker-compose installieren, damit ich es benutzen kann:

```
apt install docker-compose
```

Jetzt erstelle ich einige Ordner für meine Dateien, die ich vorher schon geschrieben habe (siehe "Infrastructure Setup"):

```
cd /home

mkdir docker-images

cd docker-images/  //Ich hatte vorher meine Images hier, da ich kein Github-Container-Registry hatte, also dieser Ordner ist eigenlich nicht wichtig, man kann direkt "docker-compose-files" erstellen.

mkdir docker-compose-files

cd docker-compose-files/

mkdir dev //Development-Umgebung
mkdir prod //Production-Umgebung
mkdir central //Zentral Caddy-Container als Reverse-Proxy
mkdir watchtower //Ein Container, welches andere Containers aktualisiert
```

Ich muss nur noch meine Dateien kopieren, die ich vorher geschrieben habe. Dafür benutze ich den Befehl "scp" (Secure Copy) und noch meinen privaten Schlüssel. Um diese Befehle direkt ausführen zu können, muss man in Ordner gehen, wo die Dateien sind (z.B. in "ncaleague/infrastructure/docker/caddy-central" für Caddyfile von Central-Container):

## central-caddyfile:

```
scp -i /path/to/key/my_key1 Caddyfile mde@ncaleague.app:/home/docker-images/docker-compose-files/central/
```

## central-compose:

```
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/central/
```

## dev-compose:

```
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/dev/
```

## dev-environment:

```
scp -i /path/to/key/my_key1 .env.development mde@ncaleague.app:/home/docker-images/docker-compose-files/dev/
```

## prod-compose:

```
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/prod/
```

## prod-environment:

```
scp -i /path/to/key/my_key1 .env.production mde@ncaleague.app:/home/docker-images/docker-compose-files/prod/
```

## watchtower-compose:

```
scp -i /path/to/key/my_key1 docker-compose.yml mde@ncaleague.app:/home/docker-images/docker-compose-files/watchtower/
```

## watchtower-environment:

```
scp -i /path/to/key/my_key1 .env.watchtower mde@ncaleague.app:/home/docker-images/docker-compose-files/watchtower/
```

## Images Pullen

Jetzt kann ich die Images pullen, die ich vorher erstellt und auf meinem Github Container Registry gepusht habe. Dafür muss ich noch einen Befehl ausführen und einloggen. Ich brauche hier mein Github Token nochmals:

```
echo github_token | docker login ghcr.io -u ncaleague --password-stdin //ncaleague ist mein Username, und dort, wo "github_token" steht, kommt das Github Token, welches ich vorher erstellt habe
```

Jetzt habe ich Zugriff auf meinem Github-Container-Registry. Ich pulle die Images, damit ich sie nachher benutzen kann:

```
docker pull ghcr.io/ncaleague/nca-225-2/ncaleague/ncaleague_frontend:latest

docker pull ghcr.io/ncaleague/nca-225-2/ncaleague/ncaleague_frontend:latest_dev

docker pull ghcr.io/ncaleague/nca-225-2/ncaleague/ncaleague_backend:latest

docker pull ghcr.io/ncaleague/nca-225-2/ncaleague/ncaleague_backend:latest_dev

docker pull ghcr.io/ncaleague/nca-225-2/ncaleague/ncaleague_backup:latest
```

Da ich die Images jetzt lokal habe, kann ich meine Docker-Compose-Dateien ausführen, und die Containers starten. Wichtig: Ich muss zuerst dev und prod Containers starten, dann Central-Caddy und am Schluss dann Watchtower:

```
docker-compose up -d //Immer dort ausführen, wo die Docker-Compose-Datei ist. Für jede Docker-Compose-Datei den gleichen Befehl ausführen, es braucht keine weiteren Konfigurationen.
```

Fertig! Die App sollte jetzt laufen.
