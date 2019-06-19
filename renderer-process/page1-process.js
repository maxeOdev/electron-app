var fs = require("fs");
const btn = document.getElementById("create-file");
const btnSubmit = document.getElementById("submit");

//btnSubmit.addEventListener("submit", function (event) {
//event.preventDefault();
// console.log(event);
// });

//Get datas from form with click event
btnSubmit.addEventListener("click", function(event) {
  var name = document.getElementsByTagName("input")[0].value;
  var content = document.getElementsByTagName("input")[1].value;

  fs.appendFile(name + ".txt", content, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
});
