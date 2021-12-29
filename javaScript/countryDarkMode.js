// specific import
import { getElement, getLocalstorage, setLocalsorage } from "./utils.js";
// selelct ietm
const darkSelector = getElement(".dark");
const body = getElement("body");
const header = getElement("header");
const backBtn = getElement(".back");

// check dark mode in the local storage
function checkDarkMode() {
  const dark = getLocalstorage("darkMode");

  if (dark === "active") {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    backBtn.classList.add("dark-mode");
  }
}

window.addEventListener("load", function () {
  checkDarkMode();
});

darkSelector.addEventListener("click", function () {
  if (!body.classList.contains("dark-mode")) {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    backBtn.classList.add("dark-mode");

    setLocalsorage("darkMode", "active");
  } else {
    body.classList.remove("dark-mode");
    header.classList.remove("dark-mode");
    backBtn.classList.remove("dark-mode");

    setLocalsorage("darkMode", null);
  }
});
