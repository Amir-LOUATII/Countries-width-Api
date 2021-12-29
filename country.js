// global import
import "./javaScript/countryDarkMode.js";
import { displayCounty } from "./javaScript/displayCountry.js";
import { getData } from "./javaScript/fetchData.js";
// specific import

window.addEventListener("load", async function () {
  const countryName = window.location.href.substring(
    window.location.href.indexOf("=") + 1
  );
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  const data = await getData(url);
  displayCounty(data);
});
