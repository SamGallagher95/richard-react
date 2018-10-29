$(document).ready(load);

function load() {
    main();
}

function main(data) {
  // Ready content
  document.getElementById("sidebar").classList.add("ready");
  document.getElementById("content").classList.add("ready");
}