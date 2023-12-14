const header = document.querySelector("header");

window.addEventListener("load", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
  updateThemeVariables("dark");
});

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 120);
});

const toggleSwitch = document.getElementById("toggleSwitch");
const currentTheme = localStorage.getItem("theme");

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
  // Update other variables as needed
}

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  updateThemeVariables(theme);

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggleSwitch.addEventListener("change", switchTheme);
