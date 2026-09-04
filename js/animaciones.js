document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll("[data-animate]");

    if (!("IntersectionObserver" in window)) {
        elementos.forEach((el) => el.classList.add("in-view"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elementos.forEach((el) => observer.observe(el));
});