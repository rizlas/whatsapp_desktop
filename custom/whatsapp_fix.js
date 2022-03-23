if (document.body.innerText.replace(/\n/g, ' ').search(/whatsapp works with.*to use whatsapp.*update/i) !== -1)
    navigator.serviceWorker.getRegistration().then(function (r) { r.unregister(); document.location.reload() });

if ('serviceWorker' in navigator) {
    caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
            caches.delete(cacheName);
        });
    });
}

const electron = require('electron');

electron.ipcRenderer.on('session-interaction-reply', (event, result) => {
    console.log('session-interaction-reply', event, result);
    switch (result.id) {
        case 'isSpellCheckerEnabled':
            console.log('SpellChecker enabled?', result.value);
            if (result.value === true) {
                console.log("Getting supported languages...");
                electron.ipcRenderer.send('session-interaction', { id: 'availableSpellCheckerLanguages', property: 'availableSpellCheckerLanguages', });
            } else {
                console.log("SpellChecker disabled. Enabling...");
                electron.ipcRenderer.send('session-interaction', { id: 'setSpellCheckerEnabled', property: 'spellCheckerEnabled', propertyValue: true, });
            }
            break;
        case 'setSpellCheckerEnabled':
            console.log('SpellChecker has now been enabled. Getting supported languages...');
            electron.ipcRenderer.send('session-interaction', { id: 'availableSpellCheckerLanguages', property: 'availableSpellCheckerLanguages', });
            break;
        case 'availableSpellCheckerLanguages':
            console.log('Avaliable spellChecker languages:', result.value);
            if (result.value.indexOf('it') > -1) {
                electron.ipcRenderer.send('session-interaction', { id: 'setSpellCheckerLanguages', func: 'setSpellCheckerLanguages', funcArgs: [['it']], });
            } else {
                console.log("Not changing spellChecker language. 'it' is not supported.");
            }
            break;
        case 'setSpellCheckerLanguages':
            console.log('SpellChecker language was set.');
            break;
        default:
            console.error("Unknown reply id:", result.id);
    }
});

electron.ipcRenderer.send('session-interaction', { id: 'isSpellCheckerEnabled', func: 'isSpellCheckerEnabled', });