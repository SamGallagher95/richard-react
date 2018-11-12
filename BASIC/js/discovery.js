$(document).ready(load);

function load() {

    console.log(window.cms);

    window.cms.on("ready", (data) => main(data));

}

function main(data) {

    console.log("From CMS", data);
    
    // Ready content
    document.getElementById("content").classList.add("ready");
    document.getElementById("sidebar").classList.add("ready");
}