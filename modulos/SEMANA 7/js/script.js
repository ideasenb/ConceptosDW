//efecto parallax en la imagen principal durante el scroll
const stickyImage = document.getElementById("sticky-image");

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const scaleValue = 1 + (scrollY * 0.00012)

        if (stickyImage) {
            stickyImage.style.transform = `scale(${scaleValue})`;
        }

    });
});


