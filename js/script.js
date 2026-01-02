/** [TAG: CARD_LOGIC] **/
function toggleCard(element) {
    const isCurrentlyOpen = element.classList.contains('open');

    // Close all other cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('open');
    });

    // If the clicked card wasn't open, open it
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
    particles = Array.from({length: 30}, () => new Particle()); 
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
window.addEventListener('resize', init);
init(); animate();

// ===========================
// STATS COUNTER ANIMATION
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const statsContainer = document.querySelector('#stats-container');
    const counters = document.querySelectorAll('.counter-number');
    let started = false; // Ensure animation only runs once

    // Easing function for smooth end deceleration (Ease Out Quint)
    // This makes the counting slow down smoothly at the end
    const easeOutQuint = (t, b, c, d) => {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    };

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix');
            const duration = 2000; // Animation duration in milliseconds (2 seconds)
            let startTime = null;

            // The animation engine
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                
                // Calculate current position using easing function
                let run = easeOutQuint(timeElapsed, 0, target, duration);

                // Display the current number (rounded) plus the suffix (% or °)
                counter.innerText = Math.round(run) + suffix;

                // Keep running until duration is met
                if (timeElapsed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    // Ensure it ends exactly on the target number
                    counter.innerText = target + suffix;
                }
            };

            requestAnimationFrame(animate);
        });
    };

    // Watcher: Triggers animation when section is 40% visible in viewport
    const observerOptions = { root: null, threshold: 0.4 }; 
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                startCounting();
                started = true;
                observer.unobserve(entry.target); // Stop watching once animated
            }
        });
    }, observerOptions);

    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});

// FAQ Accordion Toggle
function toggleFaq(element) {
    // Optional: Close other FAQs when one opens
    const allFaqs = document.querySelectorAll('#faq .group');
    allFaqs.forEach(faq => {
        if (faq !== element) {
            faq.classList.remove('open');
        }
    });

    // Toggle the clicked one
    element.classList.toggle('open');
}
