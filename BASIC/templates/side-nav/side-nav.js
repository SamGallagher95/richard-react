function main() {
  // Set the active link
  const activePage = window.location.pathname;

  // Get all of the links
  const links = document.querySelectorAll("#sidebar a");
  links.forEach(link => {
    if (activePage.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  // Show the sidebar
  document.getElementById("sidebar").classList.add("ready");
}

setTimeout(() => {
  main();
});
