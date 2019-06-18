var fs = require("fs");
const { ipcRenderer } = require("electron");
const btn = document.getElementById("homedir-list");
const btnReturn = document.getElementById("return");
var path = "";
const content = document.getElementById("syncReponse");

//event listener
btn.addEventListener("click", function () {
  //ipc call
  ipcRenderer.send("getHomePath");
});

//event listener 
btnReturn.addEventListener("click", function () {
  var splitter = path.split("/");
  var newPath = "";
  for (let index = 0; index < splitter.length - 1; index++) {
    if (index == 0) {
      newPath += splitter[index];
    } else {
      newPath += "/" + splitter[index];
    }
  }
  path = newPath;
  ipcRenderer.send("getList", path);
});

//ipc replay
ipcRenderer.on("getHomePath-reply", (event, arg) => {
  path = arg;
  ipcRenderer.send("getList", path);
});

//ipc replay
ipcRenderer.on("getList-reply", (event, arg) => {
  content.innerHTML = "";
  var ul = document.createElement("ul");
  ul.className = "list-group";
  content.appendChild(ul);

  //event listener

  ul.addEventListener("click", function (event) {
    var element = event.target.className;
    if (element.includes('file')) {
      var filePath = path+'/'+event.target.innerHTML;
      ipcRenderer.send('openFileWindow', filePath);
    } else {
      path += "/" + event.target.innerHTML;
      ipcRenderer.send("getList", path);
    }
  });

  arg.forEach(element => {
    //To not display hidden elements
    if (element.indexOf(".", 0)) {
      elementPath = path + "/" + element;
      var elementStat = fs.statSync(elementPath);

      if (elementStat.isDirectory()) {
        var li = document.createElement("li");
        li.className = "list-group-item folder";
        li.innerHTML = element;
        ul.appendChild(li);
      } else {
        var li = document.createElement("li");
        li.className = "list-group-item file";
        li.innerHTML = element;
        ul.appendChild(li);
      }
    }
  });
});
