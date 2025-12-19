/**
 * 1. CARD TOGGLE LOGIC
 */
function toggleCard(element) {
    const isOpen = element.classList.contains('open');
    
    // Close all cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('open');
    });

    // If the clicked card wasn't open, open it
    if (!isOpen) {
        element.classList.add('open');
    }
}

/**
 * 2. COPY EMAIL SYSTEM
 */
const copyBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');
const copyStatus = document.getElementById('copyStatus');
const email = "aeridontech@gmail.com";

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            emailText.innerText = "Copied!";
            copyStatus.style.opacity = "1";
            setTimeout(() => {
                emailText.innerText = email;
                copyStatus.style.opacity = "0";
            }, 2000);
        });
    });
}

/**
 * 3. OPTIMIZED BACKGROUND ANIMATION
 */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.life = Math.random() * 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, 0.08)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = Array.from({length: 50}, () => new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
animate();
