#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Building Electron app via Docker…"
UID="$(id -u)" GID="$(id -g)" docker compose up --exit-code-from electron-builder
docker compose down

echo "==> Installing to /opt/whatsApp…"
sudo rm -rf /opt/whatsApp
sudo mv apps/linux-unpacked /opt/whatsApp
sudo chown root:root /opt/whatsApp/chrome-sandbox
sudo chmod 4755 /opt/whatsApp/chrome-sandbox

echo "==> Installing desktop shortcut…"
sudo cp "$SCRIPT_DIR/whatsapp.desktop" /usr/share/applications/whatsapp.desktop

echo "==> Done. Launch with: /opt/whatsApp/whatsApp"
