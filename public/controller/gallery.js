 const modal = document.querySelector(".modal");
 const previews = document.querySelectorAll(".gallery img");
 const original = document.querySelector(".full-img");
 const imgText = document.querySelector(".caption");

 previews.forEach((preview) => {
    preview.addEventListener("click", () => {
        modal.classList.add("open");
        original.classList.add("open");
        //Change text and img
        const originalSrc = preview.getAttribute('src');
        original.src = originalSrc;
        const altText = preview.alt;
        imgText.textContent = altText;
    });
 });

 modal.addEventListener('click', (e) => {
    if(e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        original.classList.add("open");
    }
 })