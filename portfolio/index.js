const hamb = document.querySelector(".burder-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");
const moon = document.querySelector(".theme-img");
const navLink = document.querySelectorAll(".nav-link");
const burgerLine = document.querySelectorAll(".burger-line");

let current_language = 'en';
let light_theme = false;

function mobileMenu () {
    hamb.classList.toggle("open");
    navList.classList.toggle("open");
    if (light_theme === false) {
        navList.classList.remove("light-theme");
    } else if (light_theme === true){
        navList.classList.add("light-theme");
        burgerLine.forEach((el) => el.classList.add("light-theme"));
        
    }
    if (!hamb.classList.contains('open')) {
        burgerLine.forEach((el) => el.classList.remove("light-theme"));
        navList.classList.remove("light-theme");
        navLink.forEach((el) => el.classList.remove("light-theme"));
    } else {
        if (light_theme === true){
            navList.classList.add("light-theme");
            navLink.forEach((el) => el.classList.add("light-theme"));
        }
    }
}

function closeMenu(event) {
    if (event.target.classList.contains("nav-link")) {
        hamb.classList.remove("open");
        navList.classList.remove("open")
    }
    burgerLine.forEach((el) => el.classList.remove("light-theme"));
    navList.classList.remove("light-theme");
    navLink.forEach((el) => el.classList.remove("light-theme"));
}
hamb.addEventListener("click", mobileMenu);
navLinks.forEach((el) => el.addEventListener("click", closeMenu));

const portfolioBtns = document.querySelector(".transparent-buttons");
const portfolioBtn = document.querySelector(".button-transparent");
const portfolioImages = document.querySelectorAll(".photo");

function changeImage(event) {
    if(event.target.classList.contains('button-transparent')) {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
}

portfolioBtns.addEventListener("click", changeImage)

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((season) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        }
    })   
}
preloadImages();

const portfolioBtnActive = document.querySelectorAll(".button-transparent");

function changeClassActive(event) {
    if (event.target.classList.contains("button-transparent")) {
        portfolioBtnActive.forEach((el) => el.classList.remove("active"));
        event.target.classList.add("active");
    }
}

portfolioBtnActive.forEach((el) => el.addEventListener("click", changeClassActive));

import i18Obj from "./translation.js";

const contactMe = document.querySelector(".contacts-title");

function getTranslate(lang) {
    if (lang !== current_language) {
        const allTextInFile =  document.querySelectorAll("[data-i18]")
        allTextInFile.forEach((el) => {
            if (i18Obj[lang][el.dataset.i18] !== undefined) {
                if (el.textContent !== undefined && el.textContent !== '') {el.textContent = i18Obj[lang][el.dataset.i18]}
                if (el.placeholder !== undefined && el.placeholder !== '') {el.placeholder = i18Obj[lang][el.dataset.i18]}
            }
        })
        current_language = lang;
        if (current_language === 'ru') {contactMe.classList.add("ru");}
        else {contactMe.classList.remove("ru");}
    }
}

function getTranslate_trigger(event) {
    const lang = event.target.value;
    getTranslate(lang);
}

const langSwich = document.querySelectorAll(".language")

langSwich.forEach((el) => el.addEventListener("click", getTranslate_trigger));

const ligthBlocks = document.querySelectorAll(".light");
const titleBlocks = document.querySelectorAll(".parent-section-skills-title");
const sectionTitle = document.querySelectorAll(".section-title");
const sectionTitleText = document.querySelectorAll(".section-title-text");
const skillsItems = document.querySelectorAll(".list-items");
const buttonTransparent = document.querySelectorAll(".button-transparent")
const titlePrice = document.querySelectorAll(".title-price");
const priceDesc = document.querySelectorAll(".price-desc");

function addLigthTheme() {
    ligthBlocks.forEach((el) => el.classList.toggle("light-theme"));
    titleBlocks.forEach((el) => el.classList.toggle("light-theme"));
    sectionTitle.forEach((el) => el.classList.toggle("light-theme"));
    sectionTitleText.forEach((el) => el.classList.toggle("light-theme"));
    skillsItems.forEach((el) => el.classList.toggle("light-theme"));
    buttonTransparent.forEach((el) => el.classList.toggle("light-theme"));
    titlePrice.forEach((el) => el.classList.toggle("light-theme"));
    priceDesc.forEach((el) => el.classList.toggle("light-theme"));
    if (light_theme === false) {
        moon.src = "./assets/svg/sun.svg";
        light_theme = true;
    } else if (light_theme === true){
        moon.src = "./assets/svg/moon.svg";
        light_theme = false;
    }
    console.log(light_theme)
}

function addLigthTheme_trigger(event){
    if (event.target.classList.contains("theme-img")) {
        addLigthTheme();
    }
}
moon.addEventListener("click", addLigthTheme_trigger)

function setLocalStorage() {
    localStorage.setItem('lang', current_language);
    localStorage.setItem('theme', light_theme);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }

    if(localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        if (theme === 'true') {
            addLigthTheme();
        }
    }
  }
window.addEventListener('load', getLocalStorage)

console.log(75)