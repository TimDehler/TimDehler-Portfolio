const header = document.querySelector("header");
const toggleSwitch = document.getElementById("toggleSwitch");
const currentTheme = localStorage.getItem("theme");
const navbar = document.getElementById("navbar");
const projectSection = document.querySelector(".projects");
const errorField = document.getElementById("email-validation-error");

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

const toggleError = () => {
  if (!errorField.classList.contains("hidden")) {
    errorField.classList.toggle("hidden");
  }
};

const sendMail = (event) => {
  event.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const senderEmail = document.getElementById("email-sender").value;
  const emailMessage = document.getElementById("email-body").value;

  const button = document.getElementById("submit-btn");

  const loader = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
  const successMessage = `<h1>Email Send ✔️</h1>`;

  if (senderEmail === "") {
    if (errorField.classList.contains("hidden")) {
      errorField.classList.toggle("hidden");
    }
    errorField.innerText = "Seems like you forgot to add your Email";
    return;
  }

  if (!emailRegex.test(senderEmail)) {
    if (errorField.classList.contains("hidden")) {
      errorField.classList.toggle("hidden");
    }
    errorField.innerText = "Seems like you entered an invalid Email";
    return;
  }

  if (emailMessage === "") {
    if (errorField.classList.contains("hidden")) {
      errorField.classList.toggle("hidden");
    }
    errorField.innerText = "Seems like you forgot to add a Message";
    return;
  }

  button.innerHTML = loader;

  const url = "http://localhost:5000/mailService";

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const body = {
    senderEmail,
    emailMessage,
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        button.innerHTML = successMessage;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      button.innerHTML = "<h1>Error Sending Mail❌</h1>";
    });

  // setTimeout(() => {
  //   button.innerHTML = successMessage;
  // }, 2500);
};

document.addEventListener("DOMContentLoaded", function () {
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

  updateSlider(); // Ensure the initial state is set
});
