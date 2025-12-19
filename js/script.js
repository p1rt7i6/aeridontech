/** [TAG: CARD_LOGIC] **/
function toggleCard(element) {
    // 1. Check if the card clicked is already open
    const isOpen = element.classList.contains('open');

    // 2. Select all service cards and remove the 'open' class from all of them
    // This ensures only one card stays open at a time
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('open');
    });

    // 3. If the card we clicked wasn't open, open it now
    if (!isOpen) {
        element.classList.add('open');
    }
}
/**
 * EMAIL COPY SYSTEM
 */
const copyBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');
const copyStatus = document.getElementById('copyStatus');
const fullEmail = "aeridontech@gmail.com";

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(fullEmail).then(() => {
            const originalText = emailText.innerText;
            emailText.innerText = "Copied to Clipboard!";
            copyStatus.style.opacity = "1";
            
            setTimeout(() => {
                emailText.innerText = fullEmail;
                copyStatus.style.opacity = "0";
            }, 2500);
        });
    });
}
/**
 * 3. BACKGROUND ANIMATION (Optimized)
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
        this.size = Math.random() * 1.2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
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
