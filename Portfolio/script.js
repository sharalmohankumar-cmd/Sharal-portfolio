
/* ========================================
   SHARAL'S PORTFOLIO - SLIDE NAVIGATION
======================================== */

const slides = Array.from(document.querySelectorAll(".slide"));
const menuButtons = Array.from(document.querySelectorAll(".nav-link"));

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const slideCount = document.getElementById("slide-count");
const progressBar = document.getElementById("progress-bar");

const profilePhoto = document.getElementById("profile-photo");
const photoFallback = document.getElementById("photo-fallback");

let currentSlide = 0;

// Display a specific slide.
function showSlide(index, updateAddress = true) {
    if (index < 0 || index >= slides.length) {
        return;
    }

    currentSlide = index;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;

        slide.classList.toggle("active", isActive);
        slide.hidden = !isActive;
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    menuButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === currentSlide;

        button.classList.toggle("selected", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    // Update the slide number.
    slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;

    // Update the progress bar.
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Disable navigation at the first and last slides.
    previousButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;

    // Update the URL hash without reloading the page.
    if (updateAddress) {
        history.replaceState(null, "", `#${slides[currentSlide].id}`);
    }
}

// Navigate forward.
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

// Navigate backward.
function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Main navigation buttons.
menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.slide);
        showSlide(index);
    });
});

// Buttons that navigate to a particular slide.
document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.go);
        showSlide(index);
    });
});

// Previous and Next controls.
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);

// Keyboard navigation.
document.addEventListener("keydown", (event) => {
    // Don't change slides while someone is typing in a form field.
    const tagName = event.target.tagName;

    if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousSlide();
    }

    if (event.key === "Home") {
        showSlide(0);
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }
});

// Show a helpful message if the profile photo cannot be found.
profilePhoto.addEventListener("error", () => {
    profilePhoto.hidden = true;
    photoFallback.hidden = false;
});

profilePhoto.addEventListener("load", () => {
    profilePhoto.hidden = false;
    photoFallback.hidden = true;
});

// Start at the slide named in the URL, or Home by default.
const initialHash = window.location.hash.slice(1);
const initialIndex = slides.findIndex(
    (slide) => slide.id === initialHash
);

showSlide(initialIndex >= 0 ? initialIndex : 0, false);
