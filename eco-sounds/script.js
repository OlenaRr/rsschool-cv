const buttons = document.querySelectorAll('.button')
const button_container = document.querySelector('.button-container')
const footer_container = document.querySelector('.footer-container')
const play_pause = document.querySelector('.audio-button')
const play_pause_image = document.querySelector('.audio-button-image')
const audio = new Audio(); audio.loop = true; audio.currentTime = 0;

const audios = ["assets/audio/sea.mp3", "assets/audio/stream.mp3", "assets/audio/forest.mp3", "assets/audio/home.mp3", "assets/audio/fire.mp3"]
const backgrounds = ["assets/pictures/sea.jpg", "assets/pictures/stream.jpg", "assets/pictures/forest.jpg", "assets/pictures/home.jpg", "assets/pictures/fire.jpg"]
const index = Math.floor((Math.random() * audios.length));
audio.src = audios[index]
document.body.style.backgroundImage = "url(./"+backgrounds[index]+")";

function checkActive() {
    if (audio.paused) {
        buttons.forEach((el) => {el.classList.remove("active");})
    } else {
        for (let i = 0; i < audios.length; i++) {
            if (audio.src.includes(audios[i])) {
                buttons[i].classList.add("active");
                buttons[i].classList.remove("weak");
            } else {buttons[i].classList.remove("active");}
        }
    }
}

function playAudio(event) {
    if (event.target.id === "button1") {audio.src = audios[0]; document.body.style.backgroundImage = "url(./"+backgrounds[0]+")";}
    else if (event.target.id === "button2") {audio.src = audios[1]; document.body.style.backgroundImage = "url(./"+backgrounds[1]+")";}
    else if (event.target.id === "button3") {audio.src = audios[2]; document.body.style.backgroundImage = "url(./"+backgrounds[2]+")";}
    else if (event.target.id === "button4") {audio.src = audios[3]; document.body.style.backgroundImage = "url(./"+backgrounds[3]+")";}
    else if (event.target.id === "button5") {audio.src = audios[4]; document.body.style.backgroundImage = "url(./"+backgrounds[4]+")";}
    audio.currentTime = 0;
    audio.play();
    play_pause_image.src = "assets/pause.svg"
}

function playPauseAudio(event) {
    if (event.target.classList.contains("audio-button") || event.target.classList.contains("audio-button-image") || event.target.classList.contains("main-container")) {
        if (play_pause_image.src.includes("pause")) {audio.pause(); play_pause_image.src = "assets/play.svg"; checkActive();}
        else if (play_pause_image.src.includes("play")) {audio.play(); play_pause_image.src = "assets/pause.svg"; checkActive();}
    }
}

function highlightSelected(event) {
    buttons.forEach((el) => {
        if (el === event.target) {el.classList.remove("weak");}
        else {el.classList.add("weak");}
    });
}

function unhighlightOnLeave(event) {
    event.target.classList.add("weak");
}

buttons.forEach((el) => el.addEventListener("click", playAudio));
buttons.forEach((el) => el.addEventListener("mouseenter", highlightSelected));
buttons.forEach((el) => el.addEventListener("mouseleave", unhighlightOnLeave));

document.body.addEventListener('click', playPauseAudio);

button_container.classList.add('weak');

document.body.addEventListener("mouseenter", function(event) {play_pause_image.classList.add('highlight'); button_container.classList.add('weak');});
document.body.addEventListener("mouseleave", function(event) {play_pause_image.classList.remove('highlight');});

button_container.addEventListener("mouseenter", function(event) {play_pause_image.classList.remove('highlight'); button_container.classList.remove('weak');});
button_container.addEventListener("mouseleave", function(event) {play_pause_image.classList.add('highlight'); button_container.classList.add('weak');});

button_container.addEventListener("mouseenter", function(event) {play_pause_image.classList.remove('highlight'); button_container.classList.remove('weak'); buttons.forEach((el) => {el.classList.remove("active");})});
button_container.addEventListener("mouseleave", function(event) {play_pause_image.classList.add('highlight'); button_container.classList.add('weak'); checkActive();});

footer_container.addEventListener("mouseenter", function(event) {play_pause_image.classList.remove('highlight'); button_container.classList.add('weak');});
footer_container.addEventListener("mouseleave", function(event) {play_pause_image.classList.add('highlight');});

function preloadImages() {
    for(let i = 0; i < backgrounds.length; i++) {
        const img = new Image();
        img.src = './'+backgrounds[i];
    }
}
preloadImages();