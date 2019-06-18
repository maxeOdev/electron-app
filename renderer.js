const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');
let path = '';
const content = document.getElementById('syncReponse');
//ipc call


btn.addEventListener('click', function () {
    ipcRenderer.send('getHomePath');
})

//ipc replay
ipcRenderer.on('getList-reply', (event, arg) => {

    var ul = document.createElement("ul");
    ul.className = 'list-group';
    content.appendChild(ul);

    arg.forEach(element => {
        if(element.indexOf('.', 0)){
            var li = document.createElement("li");
            li.className = 'list-group-item';
            li.innerHTML = element;
            ul.appendChild(li);
        }
    });
})


ipcRenderer.on('getHomePath-reply', (event, arg) => {
    this.path = arg;
    ipcRenderer.send('getList', this.path);
})