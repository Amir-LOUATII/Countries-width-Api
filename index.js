// global import
import "./javaScript/darkMode.js";
import "./javaScript/searchFilter.js";
import "./javaScript/selectFilter.js";
// specific import
import { displayCountries } from "./javaScript/displayCountries.js";
import { getData } from "./javaScript/fetchData.js";
import { paginate } from "./javaScript/pagination.js";
import { displayButton } from "./javaScript/displayButton.js";
import { getElement } from "./javaScript/utils.js";

const url = "https://restcountries.com/v3.1/all";
const btnContainer = getElement(".btn-container");

let index = 0;
let pages = [];
window.addEventListener("DOMContentLoaded", async function () {
  const data = await getData(url);
  const pages = paginate(data);
  displayCountries(pages[0]);
  displayButton(btnContainer, pages, index);
  switchPage(pages, index);
});

function switchPage(pages, index) {
  btnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("next")) {
      index++;
      if (index > pages.length - 1) {
        index = 0;
      }
    } else if (e.target.classList.contains("prev")) {
      index--;
      if (index < 0) {
        index = pages.length - 1;
      }
    } else return;
    displayCountries(pages[index]);
    displayButton(btnContainer, pages, index);
  });
}

export { switchPage };
