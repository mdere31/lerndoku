---
title: "Hetzner Setup"
---
# Hetzner Setup

## Erstellen einer VM:

Ich erstelle eine VM und lasse mein Projekt darauf laufen.

## Image:

Zuerst wähle ich das Image von der VM (Ich habe Ubuntu 24.04 gewählt):

![alt text](image.png)

Als nächstes wähle ich ein CPU, ich wähle ein Shared vCPU, da mein Projekt nicht so viel CPU-Leistung benötigt.

![alt text](image-1.png)

## SSH Key

Jetzt erstelle ich einen SSH-Key. Diesen werde ich nachher zum Einloggen benutzen. Ich kann einen erstellen, indem ich diesen Befehl auf meinem Host-Device eingebe:

```
ssh-keygen -t ed25519
```

Dieser Befehl erstellt den privaten und öffentlichen Schlüssel im Ordner Users/<dein-benutzer>/.ssh. Ich habe meine Datei "mde_key1" benannt, und keine Passphrase benutzt, um es zu verschlüsseln.

Ich muss meinen öffentlichen Schlüssel auf dem Server kopieren, damit ich überhaupt mit dem privaten Key einloggen kann. Das kann ich hier machen:

![alt text](image-2.png)

Ich gebe es einen Namen und setze es als "Default Key":

![alt text](image-3.png)

## Volume

In meinem Fall brauche ich keinen zusätzlichen Speicherplatz, die VM hat schon 80 GB und das reicht für mich.

## Firewall

Um die VM sicher zu machen, muss ich einige Ports schliessen. Ich habe da eine Liste von High-Risk Ports gefunden: https://support.huawei.com/enterprise/en/doc/EDOC1100297670, und ich werde sie auf meiner VM auch schliessen:

![alt text](image-4.png)

Weil die VM alle Ports schon schliesst, kann ich nur definieren, welche ich öffnen will:

![alt text](image-5.png)

Ich habe 22 für SSH (Einloggen), 443 für HTTPS (für ncaleague.app) und 8080 für Adminer (Datenbankverwaltungstool - nur meine IP-Adresse) offen gelassen.

---

Jetzt kann ich die VM erstellen und mit der SSH-Verbindung einloggen (also mit meinem privaten Schlüssel):

```
ssh root@<ip-address> -i /your/private/ssh/key
```

## Security

Ich muss noch den Server sichern, damit nicht jeder darauf Zugriff hat.

### Login Security

Ich kann diese drei deaktivieren, um das Login-Security zu verbessern:

- Disable password authentication
- Disable root login
- Disable challenge-response authentication

To disable these, we have to connect to our VM and call these commands:

```
cd /etc/ssh             //Here, we can find the configuration file of the SSH service
nano sshd_config        //This is the configuration file, we will be changing it a bit
 
//Find these variables and change the values to these (if they are commented, you have to uncomment them by deleting the hashtag (#), or else they won't work):
 
PasswordAuthentication no           //Disable password authentication, you can log in with your private key.
PermitRootLogin no                  //Can't log in as root anymore.
KbdInteractiveAuthentication no     //The new version of challenge-response authentication, which allows users to do some "challenges", like answering questions, to log in. Should be disabled.
 
//After saving the file, restart the SSH service:
 
sudo service ssh restart
```

### Second Firewall (ufw)

There is also a second firewall, which is the firewall of our VM. We can configure it using the ufw (Uncomplicated Firewall) commands:

```
IMPORTANT: Call these commands as root or add sudo to each command, or else you can't change anything!
ufw enable                                      //Enable the service.
ufw allow 22/tcp                                //Allow port 22 from everywhere (for SSH connections).
ufw allow 443/tcp                               //Allow port 443 from everywhere (for HTTPS connections).
ufw allow from <your-ip> to any port 8080     //Allow port 8080 (Adminer port) from your IP address.
ufw reload                                      //Apply changes.
```

The ufw will block all other ports from incoming traffic by default and allow all ports from outgoing traffic.

### Audit

Audit is a tool for monitoring and logging system events. We can use it to see detailed information about various system activities, such as file access, system calls, and user activity. By default, it logs critical system events, which include system calls (file access and changes), login/logout events and audit daemon start/stop. We are going to install it and add one more rule to it:

```
sudo apt install auditd -y              //Install audit daemon. -y automatically confirms any prompts during installation.
sudo systemctl enable auditd --now      //Enable the service. --now enables the service immediately, not only at the reboot.
sudo auditctl -w /etc/passwd -p wa      //Add /etc/passwd to the watched files list. This file includes informations about users and password and this way, if someone changes password, we will get a log.
```

The logs will be saved in /var/log/audit/audit.log . We can see them with this command:

```
sudo cat /var/log/audit/audit.log
```

or use other commands like ausearch (searches for a specific event) or aureport (gives a summarized report).

### Unattended-Upgrades

This tool will regularly search for updates and install them. To use it, we need to call this commands:

```
sudo apt install unattended-upgrades -y                 //Install unattended-upgrades. -y automatically confirms any prompts during installation.
sudo systemctl enable unattended-upgrades --now         //Enable the service. --now enables the service immediately, not only at the reboot.
sudo nano /etc/apt/apt.conf.d/20auto-upgrades           //Change the config file.

//Add this line to the config file:
 
APT::Periodic::Unattended-Upgrade"1";                   //Enables unattended upgrades for packages, particularly security updates. "1" means it will be done daily.
```

### Fail2Ban

This tool looks for the logs of SSH and bans an IP address if they try to login and fail many times. By default, it bans for 10 minutes, and gives 5 attempts of logging in. For SSH, the default attempts are 3 times. It can also send an email when someone gets banned. We will install and configure it now:

```
sudo apt-get install fail2ban -y                                //Install fail2ban. -y automatically confirms any prompts during installation. 
sudo systemctl enable fail2ban --now                            //Enable the service. --now enables the service immediately, not only at the reboot.
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local        //The main config file will probably be overwritten in an update, so it is better to make a copy and change things there.
 
sudo apt install sendmail -y                                    //Install sendmail. Will be used to send mails. -y automatically confirms any prompts during installation. 
sudo systemctl enable sendmail --now                            //Enable the service. --now enables the service immediately, not only at the reboot.
 
//Find and change these lines:
 
destemail = ncaleague@netcetera.com                             //Sends a mail to this address if someone gets banned.
sender = fail2ban@ncaleague.app
 
//Add this line:
 
action = %(action_mwl)s                                         //Mail will be sent with the logs in attachments.
 
//To unban someone:
 
sudo fail2ban-client set sshd unbanip <ip-address>
```

### Permissions

We will change the permission settings of our Docker volumes so that only root has permissions:

```
sudo chmod 700 /var/lib/docker/volumes/caddy-data
sudo chmod 700 /var/lib/docker/volumes/caddy-config
```

700 means that the owner has full permissions (read, write and execute, 7 for owner), but the group members and others don't have any (0 for group members and 0 for others). See https://en.wikipedia.org/wiki/Chmod#Numerical_permissions for more information about chmod and its numbers.

---

Hetzner server setup is done, you can now follow the other instructions to deploy your app with Docker and Caddy.