
# WhatsApp Desktopish

This repo will bring to Linux and Docker users a WhatsApp Desktop app. This is an
unofficial app and is not verified by WhatsApp LLC nor affiliated or supported. It's
just Electron under the hood (that's why I say desktopish).

You say how?

- Using a hand-rolled Electron wrapper instead of Nativefier (archived). The wrapper
  files were written with the help of [Claude](https://claude.ai).
- Docker and docker-compose to keep your system clean and avoiding commands like

    ```bash
    npm install world
    ```

## Usage

```bash
chmod +x deploy_wa.sh
sudo bash ./deploy_wa.sh
```

The script builds the app via Docker, installs it to `/opt/whatsApp/` and copies the
desktop shortcut to `/usr/share/applications/`.

To update the Firefox user agent edit `electron/main.js` and change the `USER_AGENT`
constant, then re-run `deploy_wa.sh`.

## Alternatives

[Pake](https://github.com/tw93/Pake) is a valid alternative, there is also my
[Fork](https://github.com/rizlas/Pake) with WhatsApp already generated. I tried it but
preferred going back to using Electron directly as it works better for my taste.

## Thanks to

- <https://github.com/nativefier/nativefier> Nativefier (archived, previously used)
- <https://github.com/electron-userland/electron-builder> electron-builder

Feel free to make pull requests, fork, destroy or whatever you like most. Any criticism
is more than welcome.

<br/>

<p align="center"><img src="https://avatars1.githubusercontent.com/u/8522635?s=96&v=4" /><br/>#followtheturtle</p>
