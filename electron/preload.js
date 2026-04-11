'use strict';

// Preload script — runs in the renderer process before the page loads.
// Has access to Node.js (ipcRenderer) but isolated from the page via contextIsolation: true.
//
// Preload-compatible adaptation of custom/whatsapp_fix.js:
//   • Service-worker fix:  deferred to DOMContentLoaded (DOM not available at eval time).
//   • Spellchecker IPC:    same session-interaction protocol; handled by main.js.

const { ipcRenderer } = require('electron');

// ── Service-worker / cache fix ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (
    document.body &&
    document.body.innerText
      .replace(/\n/g, ' ')
      .search(/whatsapp works with.*to use whatsapp.*update/i) !== -1
  ) {
    navigator.serviceWorker.getRegistration().then((r) => {
      if (r) { r.unregister(); document.location.reload(); }
    });
  }

  if ('serviceWorker' in navigator) {
    caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
  }
});

// ── Spellchecker IPC ───────────────────────────────────────────────────────────
ipcRenderer.on('session-interaction-reply', (_event, result) => {
  switch (result.id) {
    case 'isSpellCheckerEnabled':
      if (result.value === true) {
        ipcRenderer.send('session-interaction', {
          id: 'availableSpellCheckerLanguages',
          property: 'availableSpellCheckerLanguages',
        });
      } else {
        ipcRenderer.send('session-interaction', {
          id: 'setSpellCheckerEnabled',
          property: 'spellCheckerEnabled',
          propertyValue: true,
        });
      }
      break;
    case 'setSpellCheckerEnabled':
      ipcRenderer.send('session-interaction', {
        id: 'availableSpellCheckerLanguages',
        property: 'availableSpellCheckerLanguages',
      });
      break;
    case 'availableSpellCheckerLanguages':
      if (Array.isArray(result.value) && result.value.includes('it')) {
        ipcRenderer.send('session-interaction', {
          id: 'setSpellCheckerLanguages',
          func: 'setSpellCheckerLanguages',
          funcArgs: [['it']],
        });
      }
      break;
    case 'setSpellCheckerLanguages':
      console.log('[preload] SpellChecker set to Italian.');
      break;
    default:
      console.error('[preload] Unknown reply id:', result.id);
  }
});

ipcRenderer.send('session-interaction', {
  id: 'isSpellCheckerEnabled',
  property: 'spellCheckerEnabled',
});
