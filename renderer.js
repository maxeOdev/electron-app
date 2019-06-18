var fs = require('fs');
const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');
var path = '';
const content = document.getElementById('syncReponse');

//ipc call
btn.addEventListener('click', function () {
    ipcRenderer.send('getHomePath');
})

//ipc replay
ipcRenderer.on('getHomePath-reply', (event, arg) => {
    path = arg;
    ipcRenderer.send('getList', path);
})

//ipc replay
ipcRenderer.on('getList-reply', (event, arg) => {

    var ul = document.createElement("ul");
    ul.className = 'list-group';
    content.appendChild(ul);

    arg.forEach(element => {
        if(element.indexOf('.', 0)){
            var elementStat = fs.statSync(path+'/'+element);
            console.log(path+'/'+element);

            if(elementStat.isDirectory()){
                var li = document.createElement("li");
                li.className = 'list-group-item folder';
                li.innerHTML = element;
                ul.appendChild(li);
            } else {
                var li = document.createElement("li");
                li.className = 'list-group-item file';
                li.innerHTML = element;
                ul.appendChild(li);
            }
        }
    });
})






