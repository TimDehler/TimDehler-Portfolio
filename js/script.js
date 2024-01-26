const header = document.querySelector("header");

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
let listElements = document.querySelectorAll(".liElement");

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 120);
});

const toggleNavbar = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("active");
};

menu.onclick = () => toggleNavbar();

listElements.forEach((element) => {
  element.addEventListener("click", function () {
    if (menu.classList.value.includes("bx-x")) toggleNavbar();
  });
});

let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slide").length;

function updateSlider() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  const slider = document.querySelector(".slider");
  slider.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

const sliderContainer = document.getElementById("slider-container");

let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let swipeDistance = touchStartX - touchEndX;

  if (swipeDistance > 50) {
    nextSlide();
  } else if (swipeDistance < -50) {
    prevSlide();
  }
}

const copyMail = () => {
  const email_copy_message_span = document.getElementById("email-copy");
  email_copy_message_span.classList.toggle("hidden");
  navigator.clipboard.writeText("tim.dehler@tibidi.de");

  setTimeout(() => {
    email_copy_message_span.classList.toggle("hidden");
  }, 2500);
};
