#!/bin/sh

docker-compose up && chmod 755 -R apps/whatsApp-linux-x64 && rm -rf /opt/whatsApp && mv apps/whatsApp-linux-x64 /opt/whatsApp