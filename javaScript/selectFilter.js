// specific import
import { getElement } from "./utils.js";
import { displayButton } from "./displayButton.js";
import { paginate } from "./pagination.js";
import { displayCountries } from "./displayCountries.js";
import { switchPage } from "../index.js";
import { getData } from "./fetchData.js";

//  select item
const select = getElement("select");
const btnContainer = getElement(".btn-container");
let index = 0;
async function selectFilter() {
  const value = select.value;
  if (value && value !== "All") {
    const url = `https://restcountries.com/v3.1/region/${value}
    `;
    const data = await getData(url);
    if (data.length > 0) {
      const pages = paginate(data);
      displayCountries(pages[0]);
      displayButton(btnContainer, pages, index);
      switchPage(pages, index);
    }
  }
  if (value === "All") {
    const url = "https://restcountries.com/v3.1/all";
    const data = await getData(url);
    const pages = paginate(data);
    displayCountries(pages[index]);
    displayButton(btnContainer, pages, index);
    switchPage(pages, index);
  }
}

select.addEventListener("change", function () {
  selectFilter();
});
