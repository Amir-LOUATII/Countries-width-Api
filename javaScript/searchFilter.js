// specific import
import { getElement } from "./utils.js";
import { displayButton } from "./displayButton.js";
import { paginate } from "./pagination.js";
import { displayCountries } from "./displayCountries.js";
import { switchPage } from "../index.js";
import { getData } from "./fetchData.js";

//  select item
const searchInput = getElement('[type="search"]');
const btnContainer = getElement(".btn-container");
let index = 0;
async function searchFilter() {
  const value = searchInput.value;
  if (value) {
    const url = `https://restcountries.com/v3.1/name/${value}
`;
    const data = await getData(url);
    if (data.length > 0) {
      const pages = paginate(data);
      displayCountries(pages[0]);
      displayButton(btnContainer, pages, index);
      switchPage(pages, index);
    }
  }
  if (!value) {
    if (value === "All") {
      const url = "https://restcountries.com/v3.1/all";
      const data = await getData(url);
      const pages = paginate(data);
      displayCountries(pages[index]);
      displayButton(btnContainer, pages, index);
      switchPage(pages, index);
    }
  }
}

searchInput.addEventListener("input", function () {
  searchFilter();
});
