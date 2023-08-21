const darkMode = document.querySelector(".fa-moon");
const screen = document.getElementById("screen");

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