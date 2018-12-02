var admin = require("firebase-admin");
var fs = require("fs");

var serviceAccount = require("./simple-cms-c3cde-firebase-adminsdk-2xaef-dac600281d.json");

// Init app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://simple-cms-c3cde.firebaseio.com"
});

admin
  .firestore()
  .collection("websites")
  .doc("richard")
  .collection("pages")
  .doc("poems")
  .get()
  .then(data => {
    writePoemtitles(data.data());
  });

function writePoemtitles(data) {
  var outStr = "";

  data.poems.forEach(poem => {
    outStr += `<a href='#${poem.title}'>${poem.title}</a>`;
  });

  fs.writeFile("poemtitles.html", outStr, err => {
    if (err) throw err;
    console.log("done");
  });
}

function writePoemsFile(data) {
  var outStr = "";

  data.poems.forEach(poem => {
    outStr += "<div class='poem'>";
    outStr += `<a name='${poem.title}'></a><h3 class='title'>${
      poem.title
    }</h3>`;

    poem.text.forEach(line => {
      outStr += line === "break" ? "<br />" : `<p>${line}</p>`;
    });
    outStr += "</div>";
  });

  fs.writeFile("poems.html", outStr, err => {
    if (err) throw err;
    console.log("done");
  });
}
