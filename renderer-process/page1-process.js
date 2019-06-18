var fs = require("fs");
const btn = document.getElementById("create-file");


//event listener
btn.addEventListener("click", function () {
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  });


fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


 