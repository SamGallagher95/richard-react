$(document).ready(load);

function load() {
  console.log(window.cms);
  main({});
}

function main(data) {
  console.log("From CMS", data);

  // Poem sidenav positioning
  const left = document.getElementById("sidebar").offsetWidth - 5;
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

  const changeProse = (id) => {

    const content = document.getElementById(id);
    document.getElementById("text").innerHTML = content.innerHTML;

  }

  // Prose titles
  console.log(document.querySelectorAll("#poemTitles a"));
  document.querySelectorAll("#poemTitles a").forEach(elm => {
      elm.addEventListener("click", (e) => {
          const id = e.path[0].getAttribute("data-attribute-link");
          changeProse(id);
      })
  });

  changeProse("excavatingTheSoul");

  // Ready content
  document.getElementById("content").classList.add("ready");
  document.getElementById("sidebar").classList.add("ready");
}
