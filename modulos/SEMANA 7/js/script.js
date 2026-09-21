// Efecto parallax en la imagen principal durante el scroll
const stickyImage = document.getElementById("sticky-image");

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const scaleValue = 1 + (scrollY * 0.00005);

        if (stickyImage) {
            stickyImage.style.transform = `scale(${scaleValue})`;
        }
    });

    // Lógica para la animación reveal-up usando Intersection Observer
    const revealElements = document.querySelectorAll(".reveal-up");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Remueve la clase active al salir de la pantalla para que la animación se reinicie
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.15, // Se activa cuando al menos el 15% del elemento entra en pantalla
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => revealObserver.observe(el));
});
