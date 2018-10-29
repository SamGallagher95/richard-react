$(document).ready(load);

function load() {

    console.log(window.cms);

    window.cms.on("ready", (data) => main(data));

}

function main(data) {

    console.log("From CMS", data);

    // News
    let news = data.news;
    news = news.map(item => {
        let string = `<div class='news'><b>${item.title}</b><p>${item.text}</p></div>`;
        return string;
    });
    document.getElementById("news").innerHTML = news.join("\n");

    
  // Ready content
  document.getElementById("sidebar").classList.add("ready");
  document.getElementById("content").classList.add("ready");

}