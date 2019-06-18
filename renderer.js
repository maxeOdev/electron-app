const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');
let path = '';
//ipc call


btn.addEventListener('click', function () {
    ipcRenderer.send('getHomePath');
})

//ipc replay
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


ipcRenderer.on('getHomePath-reply', (event, arg) => {
    this.path = arg;
    ipcRenderer.send('getList', this.path);
})