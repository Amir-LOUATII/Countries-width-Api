import { getElement, getLocalstorage } from "./utils.js";

function displayCounty(data) {
  const loader = getElement(".loader");
  loader.classList.add("hide");
  const content = getElement(".country-content");
  const country = data[0];
  if (data.length > 0) {
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
    async function border() {
      const url = "https://restcountries.com/v3.1/all";
      let data = await fetch(url);
      if (data) {
        data = JSON.parse(data);
        if (borders) {
          border = borders.map((item) => {
            const country = data.filter((it) => {
              if (it.fifa == item) return it.fifa == item;
              else if (it.name.common == it) return it.name.common == it;
              else return;
            });
            return country;
          });
          border = border.map((ele) => {
            const cont = ele.map((item) => item.name.common);
            return cont;
          });
          border = border.reduce((accu, curr) => {
            accu.push(...curr);
            return accu;
          }, []);
          border = border
            .map((item) => {
              return `<span class="border-country"><a href="country.html?name=${item}">${item}</a></span>`;
            })
            .join("");
          console.log(border);
        }
        if (!borders) {
          border = "No borders countries";
        }
      }
    }
    const dark = getLocalstorage("darkMode");
    let darkMode = "";
    if (dark === "active") {
      darkMode = "dark-mode";
    } else darkMode = "";
    content.innerHTML = `  <div class="country-content ${darkMode}">
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
      content.classList.toggle("dark-mode");
    });
  } else {
    const errMsg = getElement(".cont h1");
    errMsg.classList.remove("hide");
  }
}

export { displayCounty };
