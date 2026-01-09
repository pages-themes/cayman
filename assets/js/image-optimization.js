document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        root: null,
        threshold: 0,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Función para generar srcset
    function generateSrcset(imagePath) {
        const sizes = [300, 600, 900, 1200];
        return sizes.map(size => 
            `${imagePath}-${size}.webp ${size}w`
        ).join(', ');
    }

    // Añadir srcset a las imágenes que lo necesiten
    const responsiveImages = document.querySelectorAll('img[data-responsive]');
    responsiveImages.forEach(img => {
        const basePath = img.dataset.src.replace(/\.[^/.]+$/, '');
        img.setAttribute('srcset', generateSrcset(basePath));
        img.setAttribute('sizes', '(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, 1200px');
    });
});