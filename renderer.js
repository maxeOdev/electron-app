// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');

btn.addEventListener('click', function () {
    ipcRenderer.send('getHomeDirList');
})

ipcRenderer.on('getHomeDirList-reply', (event, arg) => {
document.getElementById('syncReponse').innerHTML = arg;
   
})
