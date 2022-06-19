///DRAW CIRCLE ON CLICK///
window.addEventListener("click", (e) => {
  const cercle = document.createElement("div");
  cercle.className = "clickAnim";
  //Draw cercle on x & y
  cercle.style.top = `${e.pageY - 20}px`;
  cercle.style.left = `${e.pageX - 20}px`;
  document.body.appendChild(cercle);
  //Time remove cercle
  setTimeout(() => {
    cercle.remove();
  }, 1500);
});
