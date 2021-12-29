import { getElement, getLocalstorage } from "./utils.js";

function displayButton(container, pages, activeIndex) {
  let btns = pages.map((item, index) => {
    // setup hidden and visible button
    let classOne = "hide ";
    if (index == 0 || index == pages.length - 1 || index == activeIndex) {
      classOne = "";
    }
    // button content
    let btnContent = `${index + 1}`;
    let activeClass = "";
    if (index === activeIndex) {
      activeClass = "active";
    }
    return `<button class="${classOne} ${activeClass} btn" data-id=${index}>${btnContent}</button>`;
  });
  //   add next and prev btn
  btns.push(`<button class="next">&gt;</button>`);
  btns.unshift(`<button class="prev">&lt;</button>`);
  container.innerHTML = btns.join("");
  // setuo dark mode with switch btn
  const darkBtn = getElement(".dark");
  const allBtns = document.querySelectorAll("button");
  // get dark class from local storage
  let darkClass = "";
  if (getLocalstorage("darkMode") === "active") {
    allBtns.forEach((element) => {
      element.classList.add("dark-mode");
    });
  }
  darkBtn.addEventListener("click", function () {
    allBtns.forEach((element) => {
      element.classList.toggle("dark-mode");
    });
  });
}

export { displayButton };
