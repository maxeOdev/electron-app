const { ipcRenderer } = require('electron');
const btn = document.getElementById('homedir-list');

//ipc call


btn.addEventListener('click', function () {
    ipcRenderer.send('getList');
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
