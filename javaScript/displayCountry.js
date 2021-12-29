import { getElement, getLocalstorage } from "./utils.js";

function displayCounty(data) {
  const loader = getElement(".loader");
  loader.classList.add("hide");
  const country = data[0];
  if (country.length > 1) {
    const {
      altSpellings,
      name: { common, nativeName },
      borders,
      flags: { png },
      population,
      region,
      capital,
      subregion,
      currencies,
      languages,
    } = country;

    // nativename
    function natName() {
      const nt = Object.entries(nativeName);
      const NativeN = nt[0]
        .map((item) => {
          if (typeof item === "object") {
            if (item.common) {
              return item.common;
            }
          }
        })
        .join("");
      return NativeN;
    }

    const ntName = natName();

    // currencies
    function currency() {
      const CurrencyItems = Object.entries(currencies);
      const curitem = CurrencyItems[0]
        .map((item) => {
          if (typeof item === "object") {
            return item.name;
          }
        })
        .join(" ");
      return curitem;
    }
    let curr = currency();

    // population format
    const pop = Intl.NumberFormat("en-us").format(population);
    // border
    let border = "";
    if (borders) {
      border = borders
        .map((item) => {
          return `<span class="border-country"><a href="country.html?name=${item}">${item}</a></span>`;
        })
        .join("");
    }
    if (!borders) {
      border = "No borders countries";
    }

    const Content = getElement(".country-content");
    const dark = getLocalstorage("darkMode");
    let darkMode = "";
    if (dark === "active") {
      darkMode = "dark-mode";
    } else darkMode = "";
    Content.innerHTML = `  <div class="country-content ${darkMode}">
  <div class="col">
  <div class="img"><img src=${png} alt="country flag" /></div>
  </div>

  <div class="col">
    <h2 class="name"> ${common}</h2>
    <div class="infos">
      <div class="info">
        <h3 class="native-name">Native name: <span> ${ntName}</span></h3>
        <h3 class="population">Population:<span>  ${pop}<span></h3>
        <h3 class="region">Region: <span> ${region}</span></h3>
        <h3 class="sub-region">Sub Region:<span> ${subregion}</span></h3>
        <h3 class="capital">Sub Region:<span> ${capital}</span></h3>
      </div>
      <div class="info">
        <h3 class="domain">Top Level Domain: <span> .${
          altSpellings[0]
        }</span></h3>
        <h3 class="currencies">currencies: <span> ${curr}</span></h3>
        <h3 class="languages">Languages:<span> ${Object.values(languages).join(
          ", "
        )}</span></h3>
      </div>
    </div>
    <div class="border">
      <h3 class="border">Border countries:</h3>
      <div class="bordr-countries">
    ${border}
           </div>
    </div>
  </div>
</div>`;
    // dark mode
    const darkBtn = getElement(".dark");
    darkBtn.addEventListener("click", function () {
      Content.classList.toggle("dark-mode");
    });
  } else {
    content.textContent = "Sorry no infos about this country";
  }
}

export { displayCounty };
