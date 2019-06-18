// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');

//call
btn.addEventListener('click', function () {
    ipcRenderer.send('getList');
})

ipcRenderer.on('getList-reply', (event, arg) => {
    let list ='<ul class="list-group">';
    arg.forEach(element => {
        if(element.indexOf('.', 0)){
            list+='<li class="list-group-item">'+element+'</li>';
        }
    });
    list+='</ul>';   
document.getElementById('syncReponse').innerHTML = list;  
})
