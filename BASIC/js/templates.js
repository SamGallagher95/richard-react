function main() {
  // We want to get all data-template containers
  const elms = document.querySelectorAll("*[data-template-id]");

  elms.forEach(elm => {
    const templateId = elm.attributes.getNamedItem("data-template-id").value;
    // Get the html and load it in
    fetch(
      `http://${
        window.location.host
      }/templates/${templateId}/${templateId}.html`
    ).then(response => {
      response.text().then(text => {
        elm.innerHTML = text;
      });
    });
    // Load the javascript
    scriptLoader(templateId).then(() => {
      console.log("yes");
    });
  });
}

function scriptLoader(templateId) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = `http://${
      window.location.host
    }/templates/${templateId}/${templateId}.js`;
  });
}

document.addEventListener("DOMContentLoaded", main);
