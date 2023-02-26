
window.onscroll = function() {replaceWithSticky()};
const navbar = document.getElementById("navigation");

let sticky = navbar.offsetTop;

function replaceWithSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}