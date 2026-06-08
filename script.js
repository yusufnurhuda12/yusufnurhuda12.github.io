// Initialize Lucide Icons
lucide.createIcons();

// Initialize VanillaTilt for 3D card effects (Micro-interactions)
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-panel"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
    });
}

// Navbar Scroll Effect & Progress Bar
const navbar = document.querySelector('.navbar');
const scrollProgressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Progress Bar Logic
    const scrollProgressRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollProgressRatio * 100}%`;
    }

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// 3D Avatar Robot interactions
const modelViewer = document.querySelector('model-viewer');

if (modelViewer) {
    // Click interaction
    modelViewer.addEventListener('click', () => {
        modelViewer.animationName = 'Wave';
        modelViewer.play();
        setTimeout(() => { modelViewer.animationName = 'Idle'; }, 3000);
    });

    // Initial load animation
    modelViewer.addEventListener('load', () => {
        modelViewer.animationName = 'Wave';
        setTimeout(() => { modelViewer.animationName = 'Idle'; }, 3000);
    });

    // Scroll-based dynamic motion and animations
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll)); // 0 to 1

        // 1. Dynamic Camera Orbit (Motion follows the page scroll)
        // Orbit shifts horizontally and slightly vertically. We use 'auto' for radius so it doesn't zoom in massively.
        const theta = -30 + (scrollProgress * 60); // rotates from -30deg to +30deg
        const phi = 75 + (scrollProgress * 15); // tilts slightly down
        modelViewer.cameraOrbit = `${theta}deg ${phi}deg auto`;

        // 2. Change Animations based on Active Section
        let currentSection = 'home';
        const allSections = [...sections, document.getElementById('achievement'), document.getElementById('footer')];
        
        allSections.forEach(section => {
            if (!section) return;
            // Handle both actual <section> elements and divs within sections
            let sectionTop = section.offsetTop;
            
            // If the element is deeply nested or at the bottom, getBoundingClientRect is safer
            if (section.id === 'achievement' || section.id === 'footer') {
                sectionTop = section.getBoundingClientRect().top + window.scrollY;
            }
            
            if (scrollY >= sectionTop - 600) {
                currentSection = section.getAttribute('id');
            }
        });

        // Force 'footer' if we are at the very bottom of the page
        if (scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
            currentSection = 'footer';
        }

        // Map sections to animations
        let targetAnimation = 'Idle';
        if (currentSection === 'experience') targetAnimation = 'Walking';
        if (currentSection === 'education') targetAnimation = 'Yes';
        if (currentSection === 'projects') targetAnimation = 'Running'; // "Lari/Semangat pamer project"
        if (currentSection === 'achievement') targetAnimation = 'Dance'; // "Bergaya gitu"
        if (currentSection === 'skills') targetAnimation = 'ThumbsUp';
        if (currentSection === 'footer') targetAnimation = 'Wave'; // "Emot maaf/terima kasih"
        
        // Adjust position dynamically for footer
        if (currentSection === 'footer') {
            modelViewer.classList.add('footer-mode');
        } else {
            modelViewer.classList.remove('footer-mode');
        }

        // Only trigger if it's a different animation
        if (modelViewer.animationName !== targetAnimation) {
            modelViewer.animationName = targetAnimation;
        }
    });
}

// Typewriter effect for subtitle
const titleElement = document.querySelector('.title');
if (titleElement) {
    const text = titleElement.innerText;
    titleElement.innerText = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Optional: add a blinking cursor effect after typing finishes
            titleElement.style.borderRight = "2px solid var(--accent-neon)";
            titleElement.style.animation = "blink 1s step-end infinite";
        }
    };
    setTimeout(typeWriter, 1000); // start after 1s
}

// ===== Lightbox Logic =====
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling in background
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
