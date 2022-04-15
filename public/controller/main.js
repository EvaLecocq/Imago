"use strict";

function main() {
  window.addEventListener("scroll", function () {
    const loadingBar = document.getElementById("loadingBar");

    const maxHeight = document.body.clientHeight - innerHeight;
    const loadingScroll = (scrollY / maxHeight) * 100 + "%";
    loadingBar.style.width = loadingScroll;

    const color = (360 * scrollY) / maxHeight;
    loadingBar.style.backgroundColor = `hsl(${color}, 50%, 50%)`;
  });
}

addEventListener("load", main);

/*
"use strict";

const main = () => {
  const header = document.querySelector(".header");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  header.appendChild(loader);
  setLoader(loader);
  addEventListener("scroll", () => setLoader(loader));
};

const setLoader = (loader) => {
  const maxY = document.body.clientHeight - innerHeight;
  loader.style.width = (100 * scrollY) / maxY + "%";
};

addEventListener("load", main);

***************************************
*************COLLAPSIBLE***************
***************************************

"use strict";

const DELAY = 1;
const PADDING = 32;

const hide = (el) => changeHeighAndPadding(el, 0, `0 ${PADDING}px`);
const pListener = (p) => p.addEventListener("click", () => handleClick(p));

const main = () => {
  const pFirst = document.querySelectorAll("p:first-child");
  pFirst.forEach(pListener);
};

const handleClick = (el) => {
  const pLast = document.querySelectorAll("p:last-child");
  hideAll(pLast);
  showContent(el.nextElementSibling);
};

const showContent = (el) => {
  if (el.clientHeight > 0) return;
  changeHeighAndPadding(el, "auto");
  const height = el.clientHeight;
  changeHeighAndPadding(el, 0);
  const show = () => changeHeighAndPadding(el, height + "px", PADDING + "px");
  setTimeout(show, DELAY);
};

const hideAll = (arr) => {
  const hideElements = () => arr.forEach(hide);
  setTimeout(hideElements, DELAY);
};

const changeHeighAndPadding = (el, height, padding = null) => {
  el.style.height = height;
  if (!padding) return;
  el.style.padding = padding;
};

addEventListener("load", main);
*/
