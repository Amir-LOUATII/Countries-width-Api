// specific import
import { getElement, getLocalstorage, setLocalsorage } from "./utils.js";
// selelct ietm
const darkSelector = getElement(".dark");
const body = getElement("body");
const header = getElement("header");
const searchInput = getElement('[type="search"]');
const search = getElement(".search");
const select = getElement("select");
const selectItem = select.querySelectorAll("option");

// check dark mode in the local storage
function checkDarkMode() {
  const dark = getLocalstorage("darkMode");

  if (dark === "active") {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    searchInput.classList.add("dark-mode");
    search.classList.add("dark-mode");
    search.classList.add("dark-mode");
    select.classList.add("dark-mode");
    selectItem.forEach((op) => op.classList.add("dark-mode"));
  }
}

window.addEventListener("load", function () {
  checkDarkMode();
});

darkSelector.addEventListener("click", function () {
  if (!body.classList.contains("dark-mode")) {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    searchInput.classList.add("dark-mode");
    search.classList.add("dark-mode");
    select.classList.add("dark-mode");
    selectItem.forEach((op) => op.classList.add("dark-mode"));

    setLocalsorage("darkMode", "active");
  } else {
    body.classList.remove("dark-mode");
    header.classList.remove("dark-mode");
    searchInput.classList.remove("dark-mode");
    search.classList.remove("dark-mode");
    select.classList.remove("dark-mode");
    selectItem.forEach((op) => op.classList.add("dark-mode"));

    setLocalsorage("darkMode", null);
  }
});
