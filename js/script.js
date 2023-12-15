const header = document.querySelector("header");
const toggleSwitch = document.getElementById("toggleSwitch");
const currentTheme = localStorage.getItem("theme");
const navbar = document.getElementById("navbar");
const projectSection = document.querySelector(".projects");

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

let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function () {
  const currentScrollPos = window.pageYOffset;

  if (currentScrollPos > prevScrollPos) {
    if (window.scrollY >= projectSection.offsetTop) {
      console.log("here");
      navbar.style.display = "none";
    }
  } else {
    navbar.style.display = "flex";
  }

  prevScrollPos = currentScrollPos;
});
