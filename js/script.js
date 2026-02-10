// ============================================
// Definir tempo de experiência
// ============================================

function calcularExperiencia() {
    const dataInicio = new Date('2022-02-01');
    const dataAtual = new Date();
    const diferenca = dataAtual - dataInicio;
    const anosExperiencia = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
    return anosExperiencia;
}

const anosExperienciaElement = document.getElementById('anos-experiencia');
anosExperienciaElement.textContent = `${calcularExperiencia()}+`;

// ============================================
// CARROSSEL DE IMAGENS
// ============================================

function showImage(card, imageIndex) {
    const images = card.querySelectorAll('.carousel-image');
    const dots = card.querySelectorAll('.dot');
    
    // Remover classe active de todas as imagens e dots
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active à imagem e dot corretos
    if (images[imageIndex]) {
        images[imageIndex].classList.add('active');
        dots[imageIndex].classList.add('active');
    }
}

function nextImage(event) {
    const card = event.target.closest('.project-card');
    const images = card.querySelectorAll('.carousel-image');
    const activeImage = card.querySelector('.carousel-image.active');
    const currentIndex = Array.from(images).indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % images.length;
    
    showImage(card, nextIndex);
}

function prevImage(event) {
    const card = event.target.closest('.project-card');
    const images = card.querySelectorAll('.carousel-image');
    const activeImage = card.querySelector('.carousel-image.active');
    const currentIndex = Array.from(images).indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    showImage(card, prevIndex);
}

function goToImage(event, imageIndex) {
    const card = event.target.closest('.project-card');
    showImage(card, imageIndex);
}

// ============================================
// MENU HAMBÚRGUER
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// EFEITO SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR DINÂMICA (MUDA COR AO SCROLL)
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// ANIMAÇÃO AO CARREGAR (FADE IN)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .tool-category, .timeline-item, .stat'
);

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// ============================================
// CONTADOR ANIMADO (SEÇÃO SOBRE)
// ============================================

function animateCounter() {
    const stats = document.querySelectorAll('.stat h3');
    const duration = 2000; // 2 segundos
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);

    stats.forEach(stat => {
        const endValue = parseInt(stat.textContent);
        let frameNumber = 0;

        const countUp = setInterval(() => {
            frameNumber++;
            const easeOutQuad = 1 - Math.pow(1 - frameNumber / totalFrames, 2);
            const currentValue = Math.floor(easeOutQuad * endValue);

            stat.textContent = currentValue + '+';

            if (frameNumber === totalFrames) {
                clearInterval(countUp);
                stat.textContent = endValue + '+';
            }
        }, frameDuration);
    });
}

// Iniciar animação quando a seção Sobre fica visível
const aboutSection = document.querySelector('.sobre');
let counterAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounter();
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// ============================================
// VALIDAÇÃO E ENVIO DE FORMULÁRIO
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validação básica
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });

        if (isValid) {
            // Email básico
            const emailInput = contactForm.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                showNotification('Por favor, insira um email válido!', 'error');
                return;
            }

            // Simular envio
            showNotification('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
        } else {
            showNotification('Por favor, preencha todos os campos!', 'error');
        }
    });
}

// ============================================
// NOTIFICAÇÃO (TOAST)
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: #10b981;' 
            : 'background: #ef4444;'}
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animação ao documento
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// EFEITO DE HOVER NOS CARDS
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
    });
});

// ============================================
// ATIVAR LINK ATIVO NA NAVBAR
// ============================================

window.addEventListener('scroll', () => {
    let currentSection = '';

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FUNÇÃO PARA ADICIONAR HOVER AOS LINKS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-color)';
    });

    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.color = 'var(--text-dark)';
        }
    });
});

// ============================================
// PREVENÇÃO DE DUPLA SUBMISSÃO
// ============================================

let isSubmitting = false;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }

        isSubmitting = true;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            isSubmitting = false;
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ============================================
// PARALLAX EFFECT (OPCIONAL)
// ============================================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.image-placeholder');
    
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        let elementPosition = element.offsetTop;
        
        if (scrollPosition < elementPosition + 400 && scrollPosition > elementPosition - 400) {
            element.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
});

// ============================================
// INICIALIZAÇÃO
// ============================================

console.log('Portfolio carregado com sucesso!');
