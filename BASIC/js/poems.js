var state = false;

function load() {
  console.log(document.getElementById("sidebar"));
  if (document.getElementById("sidebar")) {
    console.log("load");
    return main();
  } else {
    console.log("try again");
    return setTimeout(load, 50);
  }
}

function main() {
  console.log("main");
  state = true;
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

  document.getElementById("content").classList.add("ready");
}

$(document).ready(load);
