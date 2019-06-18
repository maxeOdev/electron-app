const { ipcRenderer } = require("electron");
var fs = require("fs");
const btnClose = document.getElementById("close");


//event listener
btnClose.addEventListener("click", function () {
     //ipc call
  ipcRenderer.send("closeDetailWindow");
  });

//ipc receive
ipcRenderer.on("fileDetail", (event, arg) => {
  var title = document.getElementsByClassName("card-title");
  var splitter = arg.split("/");
  var pathLength = splitter.length;
  title[0].innerHTML = "Fichier : " + splitter[pathLength - 1];

  console.log(arg);
  var infos = fs.statSync(arg);
  console.log(infos);
  var subtitle = document.getElementsByClassName("card-subtitle");
  var size = infos["size"];
  size /= 1000000;
var number = size.toFixed(2);

  console.log(number);
  subtitle[0].innerHTML = "Taille : " + number + " Mb";

  var content = document.getElementsByClassName("card-text");
  content[0].innerHTML = "Chemin du fichier : " + arg;
});
