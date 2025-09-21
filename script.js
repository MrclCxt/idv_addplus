document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });
});