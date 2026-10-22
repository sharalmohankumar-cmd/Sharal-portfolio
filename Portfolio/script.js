
const slides = document.querySelectorAll(".slide");
const menuButtons = document.querySelectorAll(".navbar nav button");
const slideCount = document.getElementById("slide-count");

let currentSlide = 0;

function showSlide(index) {
    if (index < 0 || index >= slides.length) {
        return;
    }

    slides[currentSlide].classList.remove("active");
    menuButtons[currentSlide].classList.remove("selected");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    menuButtons[currentSlide].classList.add("selected");

    slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

showSlide(0);

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
    }
});
