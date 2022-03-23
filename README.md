
# WhatsApp Desktopish

This repo will bring to linux and docker users Whatsapp Desktop app.
This is an unofficial app and is not verified by WhatsApp LLC nor affiliated or supported. It's just Electron under the hood (that's why I said desktopish).

How you say?

- Using Nativefier that is a command-line tool to easily create a “desktop app” for any web site with minimal fuss. <https://github.com/nativefier/nativefier>
- Docker and docker-compose to keep your system clean and avoiding command like

    <pre><code>npm install world</code></pre>

## Usage

<pre><code>
chmod +x deploy_wa.sh
sudo bash ./deploy_wa.sh
</pre></code>

If you want a shortcut in your application menù

<pre><code>
cp whatsapp.desktop /usr/share/applications
</pre></code>

Keep in mind, times to times remember to change user agent in docker-compose.yml

Enjoy WhatsApp

## Thanks to

- <https://github.com/nativefier/nativefier> Nativefier

Fell free to make pull requests, fork, destroy or whatever you like most. Any criticism is more than welcome.

<br/>

<p align="center"><img src="https://avatars1.githubusercontent.com/u/8522635?s=96&v=4" /><br/>#followtheturtle</p>
