import songs from "./modules/songs.js"
const botaoPlay = document.querySelector(".fa-circle-play");
const botaoAvancar = document.querySelector(".fa-forward");
const botaoRetroceder = document.querySelector(".fa-backward");
const album = document.querySelector(".player__song-info");
const progressBar = document.getElementById("progress");
const timeStart = document.querySelector(".player__time-start");
const timeEnd = document.querySelector(".player__time-end");
const restartSong = document.querySelector(".fa-arrow-rotate-right");
const muteSong = document.querySelector(".fa-volume-high");
const darkMode = document.querySelector(".fa-moon");
const screen = document.getElementById("screen");
const playlist = document.querySelector(".player__playlist");

let id = 0;
let song = new Audio(`./src/audio/${songs[id]["name"]}.mp3`);
song.volume = 0.2;

botaoPlay.addEventListener("click", () => {
    if (botaoPlay.classList.contains("fa-circle-play")) {
        song.play();
        botaoPlay.classList.remove("fa-circle-play");
        botaoPlay.classList.add("fa-pause");
    }
    else {
        song.pause();
        botaoPlay.classList.remove("fa-pause");
        botaoPlay.classList.add("fa-circle-play");
    }

})

restartSong.addEventListener("click", () => {
    if(song.currentTime > 0) {
        song.currentTime = 0; 
        song.play();   
    }
    
})

muteSong.addEventListener("click", () => {
    if(song.volume > 0) {
        song.volume = 0
        muteSong.classList.remove("fa-volume-high");
        muteSong.classList.add("fa-volume-xmark");
    } else {
        song.volume = 0.2
        muteSong.classList.add("fa-volume-high"); 
        muteSong.classList.remove("fa-volume-xmark");
        
    }
})

function getMinutes(SongTime){
    var min = parseInt(parseInt(SongTime) / 60);
    var sec = parseInt(SongTime % 60);
    if (sec < 10) {
      sec = "0" + sec
    }
    if (min < 10) {
      min = "0" + min
    }
    return min + ":" + sec
  }

song.onloadedmetadata = () => {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    timeStart.innerHTML = "00:00";
    timeEnd.innerHTML = songs[id]["duration"];
}

if (song.play) {
    setInterval(() => timeStart.innerHTML = getMinutes(song.currentTime), 100);
    setInterval(() => { progressBar.value = song.currentTime }, 500)
}

if (song.play) {
    setInterval(() => { console.log(progressBar.value, song.currentTime, progressBar.max) }, 500);
}

progressBar.onchange = () => {
    song.play();
    song.currentTime = progressBar.value;
    botaoPlay.classList.remove("fa-circle-play");
    botaoPlay.classList.add("fa-pause");
}

botaoAvancar.addEventListener("click", () => {
    botaoPlay.classList.remove("fa-circle-play");
    botaoPlay.classList.add("fa-pause");
    id++
    album.innerHTML =
        `
    <img class="player__cover" alt="capa do album" src="./src/img/${songs[id]["album"]}">
    <h3 class="player__song-title">${songs[id]["name"]}</h3>
    <p class="player__song-artist">${songs[id]["artist"]}</p>
    `
    song.pause();
    song = new Audio(`./src/audio/${songs[id]["name"]}.mp3`);
    setTimeout(() => progressBar.max = song.duration, 250);
    timeEnd.innerHTML = songs[id]["duration"];
    song.play();
    song.volume = 0.2;

})

botaoRetroceder.addEventListener("click", () => {
    botaoPlay.classList.remove("fa-circle-play");
    botaoPlay.classList.add("fa-pause");
    song.onloadedmetadata = () => {
        progressBar.max = song.duration;
        progressBar.value = song.currentTime;
    }
    id--
    album.innerHTML =
        `
    <img class="player__cover" alt="capa do album" src="./src/img/${songs[id]["album"]}">
    <h3 class="player__song-title">${songs[id]["name"]}</h3>
    <p class="player__song-artist">${songs[id]["artist"]}</p>
    `
    song.pause();
    song = new Audio(`./src/audio/${songs[id]["name"]}.mp3`);
    setTimeout(() => progressBar.max = song.duration, 250);
    timeEnd.innerHTML = songs[id]["duration"];
    song.play();
    song.volume = 0.2;
})

// DARK MODE

let darkModeLocalStorage;

if(localStorage.getItem("dark-mode")) {
    darkModeLocalStorage = localStorage.getItem("dark-mode")
} else {
    darkModeLocalStorage = "light";
}

if(darkModeLocalStorage == "dark") {
    screen.classList.remove("light")
    screen.classList.add("dark")
    darkMode.classList.remove("fa-moon");
    darkMode.classList.add("fa-sun");
}

localStorage.setItem("dark-mode", darkModeLocalStorage)

darkMode.addEventListener("click", () => {
    if(darkMode.classList.contains("fa-moon")) {
        darkMode.classList.remove("fa-moon");
        darkMode.classList.add("fa-sun");
        screen.classList.remove("light") 
        screen.classList.add("dark");
        localStorage.setItem("dark-mode", "dark")
     } else {
        darkMode.classList.remove("fa-sun");
        darkMode.classList.add("fa-moon");
        screen.classList.remove("dark");
        screen.classList.add("light");
        localStorage.setItem("dark-mode", "light")
     }
    
})





