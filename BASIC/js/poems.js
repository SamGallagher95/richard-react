$(document).ready(load);

function load() {
  console.log(window.cms);

  window.cms.on("ready", data => main(data));
}

function main(data) {
  console.log("FROM CMS", data);

  // Poems
  let poems = data.poems;
  poems = poems.map(item => {
    let string = `<div class='poem'><a name='${item.title}'></a><h3 class='title'>${item.title}</h3>`;
    string += item.text
      .map(text => {
        if (text === "break") {
          return `<br />`;
        } else {
          return `<p>${text}</p>`;
        }
      })
      .join("\n");
    string += "</div>";
    return string;
  });
  document.getElementById("poems").innerHTML = poems.join("\n");

  // Poem Titles
  let poemTitles = data.poems;
  poemTitles = poemTitles.map(item => {
    return `<a href='#${item.title}'>${item.title}</a>`;
  });
  document.getElementById("poemTitles").innerHTML = poemTitles.join("\n");

  // Poem sidenav positioning
  const left = document.getElementById("sidebar").offsetWidth;
  document.getElementById("sideNav").style.left = left + "px";

  // Poem sidenav scroll event
  document.addEventListener("scroll", e => {
    document.getElementById("sideNav").style.top = window.scrollY + 55 + "px";
  });

  // Start poem sidenav animation
  const expandedLeft = document.getElementById("sideNav").style.left;
  const restingLeft =
    parseInt(document.getElementById("sideNav").style.left.split("p")[0]) -
    263 +
    "px";
  let mouseBool = false;
  document.getElementById("sideNav").addEventListener("mouseover", e => {
    mouseBool = true;
    document.getElementById("sideNav").style.left = expandedLeft;
    document.getElementById("sideNav").classList.remove("hidden");
  });
  document.getElementById("sideNav").addEventListener("mouseleave", e => {
    mouseBool = false;
    setTimeout(() => {
      if (!mouseBool) {
        document.getElementById("sideNav").style.left = restingLeft;
        document.getElementById("sideNav").classList.add("hidden");
      }
    }, 2000);
  });

  // Trigger mouse leave on sidenav
  const event = new Event("mouseleave");
  document.getElementById("sideNav").dispatchEvent(event);

  // Ready content
  document.getElementById("sidebar").classList.add("ready");
  document.getElementById("content").classList.add("ready");
}
