/** [TAG: CARD_LOGIC] **/
function toggleCard(element) {
    const isCurrentlyOpen = element.classList.contains('open');

    // Remove 'open' class from all other cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('open');
    });

    // If it wasn't open, open it now
    if (!isCurrentlyOpen) {
        element.classList.add('open');
    }
}

/** [TAG: EMAIL_LOGIC] **/
const copyBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');
const copyStatus = document.getElementById('copyStatus');
const fullEmail = "aeridontech@gmail.com";

if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(fullEmail).then(() => {
            emailText.innerText = "Address Copied!";
            copyStatus.style.opacity = "1";
            setTimeout(() => {
                emailText.innerText = fullEmail;
                copyStatus.style.opacity = "0";
            }, 2000);
        });
    });
}

/** [TAG: CANVAS_ANIMATION] **/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.06)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function init() { 
    resize(); 
    particles = Array.from({length: 35}, () => new Particle()); 
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
window.addEventListener('resize', init);
init(); animate();
