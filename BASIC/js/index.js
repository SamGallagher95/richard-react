$(document).ready(load);

function load() {

    console.log(window.cms);

    window.cms.on("ready", (data) => main(data));

}

function main(data) {

    console.log("From CMS", data);

    // Biography
    let biography = data.biography;
    biography = biography.map(item => {
        return `<p>${item}</p>`;
    });
    document.getElementById("bio").innerHTML = biography.join("\n");

    // Quotes
    let quotes = data.quotes;
    quotes = quotes.map(item => {
        return `<p>${item}</p>`;
    });
    document.getElementById("quotes").innerHTML = quotes.join("\n");

    // Achievements
    let achievements = data.awards;
    achievements = achievements.map(item => {
        return `<p>${item}</p>`;
    });
    document.getElementById("achievements").innerHTML = achievements.join("\n");

    // Ready content
    document.getElementById("content").classList.add("ready");
    document.getElementById("sidebar").classList.add("ready");

}
