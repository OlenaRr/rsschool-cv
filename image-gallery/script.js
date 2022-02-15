const token = "1NVh5JDILAsxLQCkWFUDEoSJz1iVKcDXguleB78fu6A";
const seasons = ["summer", "winter", "autumn", "spring"];
let search_term = seasons[Math.floor((Math.random() * seasons.length))];
let page_number = 1;
let total_pages = 0;
const search = document.querySelector(".search");
const search_button = document.querySelector(".search-button");
const prev_page = document.querySelector(".prev-page");
const next_page = document.querySelector(".next-page");
const images = document.querySelectorAll(".img");
const img_fullsize = [];

function fillImages(arr) {
    for(let i = 0; i < images.length; i++) {
        if (i < arr.length) {images[i].src = arr[i].urls.small; img_fullsize[i] = arr[i].urls.full; images[i].onload = function() {images[i].hidden = false; images[i].style.opacity = 1;}; images[i].style.cursor = "pointer";}
        else {images[i].style.opacity = 0; img_fullsize[i] = ""; images[i].style.cursor = "default"; if (window.innerWidth <= 720) {images[i].hidden = true;} else {images[i].hidden = false;}}
    }

    if (total_pages > 1) {prev_page.classList.add('active');next_page.classList.add('active');}
    else {prev_page.classList.remove('active');next_page.classList.remove('active');}

    if (page_number <= 1) {next_page.classList.remove('hovered'); prev_page.classList.remove('hovered');};
}

function getData() {
    images.forEach((el) => {el.style.opacity = 0.5;})
    const url = `https://api.unsplash.com/search/photos?query=${search_term}&per_page=${images.length}&page=${page_number}&orientation=landscape&client_id=${token}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {total_pages = data.total_pages; fillImages(data.results)})
      .catch(error => window.alert("It seems the Demo API of Unsplash has its rate limit exceeded.\nPlease try again later."))
}

function startSearch() {if (search.value !== "") {search_term = search.value; page_number = 1; getData();}}

function imgClickHandler(event) {
    if (img_fullsize[Number(event.target.id.replace("img", "")) - 1] !== "") {const new_window = window.open(img_fullsize[Number(event.target.id.replace("img", "")) - 1], "_blank", null);};
}

images.forEach((el) => el.addEventListener("click", imgClickHandler));

search_button.addEventListener("click", startSearch);
prev_page.addEventListener("click", () => {if (page_number > 1) {page_number--; getData();};});
next_page.addEventListener("click", () => {if (page_number < total_pages) {page_number++; getData();}; });

prev_page.addEventListener("mouseenter", () => {if (page_number > 1) {prev_page.classList.add('hovered');} next_page.classList.remove('hovered');});
prev_page.addEventListener("mouseleave", () => {prev_page.classList.remove('hovered'); next_page.classList.remove('hovered');});

next_page.addEventListener("mouseenter", () => {if (page_number < total_pages) {next_page.classList.add('hovered');} prev_page.classList.remove('hovered');});
next_page.addEventListener("mouseleave", () => {next_page.classList.remove('hovered'); prev_page.classList.remove('hovered');});

search.addEventListener('keypress', (e) => {if (e.key === 'Enter') {startSearch();}});

getData();
search.focus();