import { getElement, getLocalstorage } from "./utils.js";

async function displayCountries(data) {
  // hide preloader
  const loading = getElement(".loading");
  loading.classList.add("hide");
  // select items container
  const content = getElement(".content");
  // item container innerHTML
  content.innerHTML = data
    .map((item) => {
      const {
        name: { common },
        capital,
        flags: { svg },
        population,
        region,
      } = item;
      const pop = Intl.NumberFormat("en-us").format(population);
      return ` <a href="country.html?name=${common} "
    ><div class="card">
      <img src=${svg} alt="${common} flag" />
      <h2 class="name">${common}</h2>
      <h3 class="population">population:<span> ${pop}</span></h3>
      <h3 class="capital">Capital: <span> ${capital}</span></h3>
      <h3 class="region">Region: <span> ${region}</span></h3>
    </div></a>`;
    })
    .join("");

  // select cards
  const cards = document.querySelectorAll(".card");
  // dark mode configuration
  // select item
  const dark = getLocalstorage("darkMode");
  const darkBtn = getElement(".dark");

  if (dark === "active") {
    cards.forEach((card) => card.classList.add("dark-mode"));
  }

  darkBtn.addEventListener("click", function () {
    cards.forEach((card) => {
      card.classList.toggle("dark-mode");
    });
  });
}

export { displayCountries };
