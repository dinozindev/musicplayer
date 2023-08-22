import songs from "./modules/songs.js"
import getMinutes from "./modules/getMinutes.js"
const botaoAvancar = document.querySelector(".fa-forward");
const botaoRetroceder = document.querySelector(".fa-backward");
const album = document.querySelector(".player__song-info");
const progressBar = document.getElementById("progress");
const timeStart = document.querySelector(".player__time-start");
const timeEnd = document.querySelector(".player__time-end");
const restartSong = document.querySelector(".fa-arrow-rotate-right");
const muteSong = document.querySelector(".fa-volume-high");
const botaoPlay = document.querySelector(".fa-circle-play");

let id = 0;
let song = new Audio(`./src/audio/${songs[id]["name"]}.mp3`);
song.volume = 0.2;

album.innerHTML =
    `
    <img class="player__cover" alt="capa do album" src="./src/img/${songs[id]["album"]}">
    <h3 class="player__song-title">${songs[id]["name"]}</h3>
    <p class="player__song-artist">${songs[id]["artist"]}</p>
`    


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

// Controles

// Botão de Play

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

// Botão de Reiniciar a música

restartSong.addEventListener("click", () => {
    song.load();
    song.play();   
})

// Botão de retirar o áudio da música

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

// Botão de avançar para a próxima música

botaoAvancar.addEventListener("click", () => {
    botaoPlay.classList.remove("fa-circle-play");
    botaoPlay.classList.add("fa-pause");
    if(id === songs.length - 1) {
        id = 0
    } else {
        id++
    }
    console.log(id)
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

// Botão de voltar para a música anterior

botaoRetroceder.addEventListener("click", () => {
    botaoPlay.classList.remove("fa-circle-play");
    botaoPlay.classList.add("fa-pause");
      if(id === 0) {
       id = songs.length - 1
    } else {
      id--   
    }
    
    song.onloadedmetadata = () => {
        progressBar.max = song.duration;
        progressBar.value = song.currentTime;
    }
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







