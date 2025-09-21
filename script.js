document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA EXISTENTE PARA ANIMAÇÃO DOS SLIDES ---
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

    // --- NOVA LÓGICA PARA A GALERIA DE IMAGENS ---

    // Defina aqui as imagens para cada galeria
    const galleries = {
        'digital': [
            { src: 'img/mockup-digital.png', caption: 'Interface de Apresentação Digital' },
            { src: 'img/redes-sociais.png', caption: 'Exemplo de post para redes sociais' },
            { src: 'img/website.png', caption: 'Banner para o website' }
        ],
        'uniformes': [
            { src: 'img/mockup-uniformes.png', caption: 'Camiseta Polo com Logo Monocromático' },
            { src: 'img/bone.png', caption: 'Boné com aplicação da marca' }
        ],
        'impressos': [
            { src: 'img/mockup-impressos.png', caption: 'Catálogo de produtos e serviços' },
            { src: 'img/papel.png', caption: 'Pasta e papel timbrado' },
            { src: 'img/card.png', caption: 'Cartão de Visitas' }
        ]
    };

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-button');
    const prevBtn = document.querySelector('.navigation .prev');
    const nextBtn = document.querySelector('.navigation .next');

    let currentGallery = [];
    let currentIndex = 0;

    document.querySelectorAll('.mockup-item').forEach(item => {
        item.addEventListener('click', () => {
            const galleryKey = item.getAttribute('data-gallery');
            currentGallery = galleries[galleryKey];
            if (currentGallery && currentGallery.length > 0) {
                currentIndex = 0;
                openModal();
            }
        });
    });

    function openModal() {
        modal.style.display = 'block';
        updateModalContent();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModalContent() {
        modalImg.src = currentGallery[currentIndex].src;
        captionText.innerHTML = currentGallery[currentIndex].caption;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalContent();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModalContent();
    }

    // Event Listeners dos controles
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Fechar modal ao clicar fora da imagem
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // Navegação com as setas do teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
});
