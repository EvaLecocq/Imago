const ratio = 0.1;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

///APPEL FUNCTION CALLBACK///
const handleIntersect = (appear, observer) => {
  appear.forEach((reveal) => {
    if (reveal.intersectionRatio > ratio) {
      //reveal class div
      reveal.target.classList.add("reveal-visible");
      //stop "observer" div
      observer.unobserve(reveal.target);
    }
  });
};

///DETECTS COLLISION & DISPLAY AREA///
const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll(".reveal").forEach((r) => {
  observer.observe(r);
});
