var fs = require("fs");
const btnSubmit = document.getElementById("submit");

//Get datas from form with click event
btnSubmit.addEventListener("click", function(event) {
  var name = document.getElementsByTagName("input")[0].value;
  var content = document.getElementsByTagName("input")[1].value;

  fs.appendFile(name + ".txt", content, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  let myNotification = new Notification(name, {
    body: content
  });

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
});
