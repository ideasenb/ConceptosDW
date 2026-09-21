// Efecto parallax en la imagen principal durante el scroll
const stickyImage = document.getElementById("sticky-image");

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const scaleValue = 1 + (scrollY * 0.00012);

        if (stickyImage) {
            stickyImage.style.transform = `scale(${scaleValue})`;
        }
    });

    // Lógica para la animación reveal-up usando Intersection Observer
    const revealElements = document.querySelectorAll(".reveal-up");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Deja de observar para que la animación ocurra una sola vez al aparecer
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Se activa cuando al menos el 15% del elemento entra en pantalla
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => revealObserver.observe(el));
});
