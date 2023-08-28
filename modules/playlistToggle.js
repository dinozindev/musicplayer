const playlistToggle = document.querySelector(".fa-toggle-on");
const playlist = document.querySelector(".player__playlist");
const playlistToggleText = document.querySelector(".toggle-playlist-text");

playlistToggleText.textContent = "Desativar Playlist"

playlistToggle.addEventListener("click", () => {
    if(playlistToggle.classList.contains("fa-toggle-on")) {
       playlistToggle.classList.remove("fa-toggle-on")
       playlistToggle.classList.add("fa-toggle-off")
       playlist.classList.add("playlist__none")
       playlistToggleText.textContent = "Ativar Playlist"

    } else {
        playlistToggle.classList.remove("fa-toggle-off");
        playlistToggle.classList.add("fa-toggle-on")
        playlist.classList.remove("playlist__none")
        playlist.classList.add("playlist__block")
        playlistToggleText.textContent = "Desativar Playlist"
    }
})