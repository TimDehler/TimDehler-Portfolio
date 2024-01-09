const header = document.querySelector("header");
const toggleSwitch = document.getElementById("toggleSwitch");
const currentTheme = localStorage.getItem("theme");
const navbar = document.getElementById("navbar");
const projectSection = document.querySelector(".projects");
const errorField = document.getElementById("email-validation-error");

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
let listElements = document.querySelectorAll(".liElement");

window.addEventListener("load", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
  updateThemeVariables("dark");
});

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 120);
});

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeVariables(currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function updateThemeVariables(theme) {
  document.documentElement.style.setProperty(
    "--text-color",
    `var(--text-color-${theme})`
  );
  document.documentElement.style.setProperty(
    "--bg-color",
    `var(--bg-color-${theme})`
  );
}

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  updateThemeVariables(theme);

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggleSwitch.addEventListener("change", switchTheme);

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

const toggleError = (event) => {
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
  }

  if (!emailRegex.test(senderEmail)) {
    if (errorField.classList.contains("hidden")) {
      errorField.classList.toggle("hidden");
    }
    errorField.innerText = "Seems like you entered an invalid Email";
  }

  if (emailMessage === "") {
    if (errorField.classList.contains("hidden")) {
      errorField.classList.toggle("hidden");
    }
    errorField.innerText = "Seems like you forgot to add a Message";
  }

  button.innerHTML = loader;

  setTimeout(() => {
    button.innerHTML = successMessage;
  }, 4500);

  const url = "#";

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

  // fetch(url, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => console.log("Response:", data))
  //   .catch((error) => console.error("Error:", error));
};
