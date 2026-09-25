// Cambiar el estilo del Navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Suavizar el scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            
            // Actualizar clase activa en nav
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Animar elementos al aparecer en pantalla (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Preparar y observar las tarjetas de servicio
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Lógica para el sistema interactivo de reservas de pistas
function selectLane(laneNumber, element) {
    // Quitar clase selected de todas
    document.querySelectorAll('.lane').forEach(lane => {
        lane.classList.remove('selected');
    });
    
    // Agregar a la clickeada
    element.classList.add('selected');
    
    // Actualizar panel
    const panel = document.getElementById('booking-panel');
    const title = document.getElementById('booking-title');
    const btn = document.getElementById('checkout-btn');
    
    panel.classList.add('active-panel');
    title.innerHTML = `PISTA ${laneNumber} <span style="color:var(--neon-magenta)">SELECCIONADA</span>`;
    
    btn.disabled = false;
    btn.innerText = "Reservar por WhatsApp";
    
    // Animación extra al botón
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    
    btn.onclick = () => {
        // Enlace simulado a WhatsApp
        const text = encodeURIComponent(`¡Hola! Quisiera reservar la PISTA ${laneNumber} en Bowling Game Center.`);
        window.open(`https://wa.me/584120000000?text=${text}`, '_blank');
    };
}
