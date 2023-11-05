let slideIndex = 0;
let slideshowTimeout;
let isPaused = false;

showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    
    if (!isPaused) {
        slideshowTimeout = setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
}

// Function to pause/unpause the slideshow when the button is clicked
const pauseButton = document.getElementById("pauseButton");

function togglePause() {
    isPaused = !isPaused; // Toggle the pause state
    if (isPaused) {
        clearTimeout(slideshowTimeout); // Pause the slideshow
        pauseButton.innerHTML = '&#9658;'; // Play icon
    } else {
        // Resume the slideshow
        slideshowTimeout = setTimeout(showSlides, 5000); // Change image every 5 seconds
        pauseButton.innerHTML = '&#10074;&#10074;'; // Pause icon
    }
}

pauseButton.addEventListener("click", togglePause);

// Initialize the button text
pauseButton.innerHTML = '&#10074;&#10074;'; // Initially set to the Pause icon


/* || mobile version menu */

const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");
const scrollBtn = document.querySelector(".scroll-top-btn");


openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);


function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
    scrollBtn.style.display = 'none';
}


function close(){
    mainMenu.style.top = '-100%';
    scrollBtn.style.display = 'block';
}





