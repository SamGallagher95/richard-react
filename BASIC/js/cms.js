$(document).ready(cms);

var config = {
  apiKey: "AIzaSyA2dlWGxlkaWVVTNKB8G1-iOespvaBDYKU",
  authDomain: "simple-cms-c3cde.firebaseapp.com",
  databaseURL: "https://simple-cms-c3cde.firebaseio.com",
  messagingSenderId: "430231022870",
  projectId: "simple-cms-c3cde",
  storageBucket: "simple-cms-c3cde.appspot.com"
};
firebase.initializeApp(config);

window.cms = new EventEmitter();

function cms() {
  // Get current page
  const siteId = "richard";
  let page = window.location.pathname;

  console.log(page);

  if (page === "/" || page === "/index.html") {
    page = "home";
  }

  if (page.includes(".html")) {
      page = page.split(".")[0];
      page = page.slice(1, page.length);
  }

  //   Get the firestore data
  firebase
    .firestore()
    .collection("websites")
    .doc(siteId)
    .collection("pages")
    .doc(page)
    .get()
    .then(data => {
      window.cms.data = data.data();
      window.cms.emit("ready");
    });
}
