//Anim click

window.addEventListener("click", (e) => {
  const cercle = document.createElement("div");
  cercle.className = "clickAnim";
  cercle.style.top = `${e.pageY - 20}px`;
  cercle.style.left = `${e.pageX - 20}px`;
  document.body.appendChild(cercle);

  setTimeout(() => {
    cercle.remove();
  }, 1500);
});

//Reveal div

const ratio = 0.1;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll(".reveal").forEach((r) => {
  observer.observe(r);
});