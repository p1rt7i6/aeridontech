/**
 * 1. CARD TOGGLE SYSTEM
 */
function toggleCard(element) {
    // Close other cards for a cleaner look
    document.querySelectorAll('.service-card').forEach(card => {
        if (card !== element) card.classList.remove('open');
    });
    
    // Toggle clicked card
    element.classList.toggle('open');
}

/**
 * 2. EMAIL COPY SYSTEM
 */
const copyBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');
const copyStatus = document.getElementById('copyStatus');
const fullEmail = "aeridontech@gmail.com";

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(fullEmail).then(() => {
            emailText.innerText = "Copied!";
            copyStatus.style.opacity = "1";
            setTimeout(() => {
                emailText.innerText = fullEmail;
                copyStatus.style.opacity = "0";
            }, 2500);
        });
    });
}

/**
 * 3. BACKGROUND ANIMATION
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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = Array.from({length: 40}, () => new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
animate();
