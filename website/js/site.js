document.addEventListener("DOMContentLoaded", load);

var siteId;

function load() {
  // Setup environment

  siteId = window.location.pathname;
  if (siteId === "/" || "") {
    siteId = "index";
  }

  loadTemplates().then(() => {
    setupSideNav();
  });
}

function loadTemplates() {
  return new Promise(res => {
    const elms = document.querySelectorAll("*[data-template-id]");
    elms.forEach((elm, index) => {
      const siteId = elm.getAttribute("data-template-id");
      // Load html
      fetch(`http://${window.location.host}/templates/${siteId}.html`).then(
        response => {
          response.text().then(text => {
            elm.innerHTML = text;
            if (index === elms.length) {
              res();
            }
          });
        }
      );
    });
  });
}

function setupSideNav() {}
