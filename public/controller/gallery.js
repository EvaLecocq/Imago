 const modal = document.querySelector(".modal");
 const previews = document.querySelectorAll(".gallery img");
 const img = document.querySelector(".full-img");
 const imgText = document.querySelector(".caption");

 previews.forEach((preview) => {
    preview.addEventListener("click", () => {
        modal.classList.add("open");
        img.classList.add("open");
        //Change text and img
        const imgSrc = preview.getAttribute('src');
        img.src = imgSrc;
        const altText = preview.alt;
        imgText.textContent = altText;
    });
 });

 modal.addEventListener('click', (e) => {
    if(e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        img.classList.add("open");
    }
 })