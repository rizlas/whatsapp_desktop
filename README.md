
# WhatsApp Desktopish

This repo will bring to linux and docker users Whatsapp Desktop app.
This is an unofficial app and is not verified by WhatsApp LLC nor affiliated or supported. It's just Electron under the hood (that's why I say desktopish).

You say how?

- Using Nativefier that is a command-line tool to easily create a “desktop app” for any web site with minimal fuss. <https://github.com/nativefier/nativefier>
- Docker and docker-compose to keep your system clean and avoiding commands like

    ```bash
    npm install world
    ```

## Usage

```bash
chmod +x deploy_wa.sh
sudo bash ./deploy_wa.sh
```

If you want a shortcut in your application menu

```bash
cp whatsapp.desktop /usr/share/applications
```

Keep in mind to change times to times the user agent in docker-compose.yml and to rebuild the app when a warning appears (just run deploy_wa.sh).

Enjoy WhatsApp

## Thanks to

- <https://github.com/nativefier/nativefier> Nativefier

Feel free to make pull requests, fork, destroy or whatever you like most. Any criticism is more than welcome.

<br/>

<p align="center"><img src="https://avatars1.githubusercontent.com/u/8522635?s=96&v=4" /><br/>#followtheturtle</p>
