const hamb = document.querySelector(".burder-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");

function mobileMenu () {
    hamb.classList.toggle("open");
    navList.classList.toggle("open");
}
function closeMenu(event) {
    if (event.target.classList.contains("nav-link")) {
        hamb.classList.remove("open");
        navList.classList.remove("open")
    }

}
hamb.addEventListener("click", mobileMenu);
navLinks.forEach((el) => el.addEventListener("click", closeMenu));

console.log(75)