$(document).ready(main);

function load() {
  console.log(window.cms);

  window.cms.on("ready", data => main(data));
}

function main(data) {
  // Ready content
  document.getElementById("content").classList.add("ready");
}
