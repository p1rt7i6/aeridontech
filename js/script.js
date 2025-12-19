// === AeridonTech Binary Rain Background + Service Card Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // AeridonTech brand colors
  const colors = ["#073B4C", "#118AB2", "#06D6A0"];

  // Binary characters
  const chars = ["0", "1"];

  // Font size and columns
  const fontSize = 18;
  let columns = Math.floor(canvas.width / fontSize);

  // Drops (y positions per column)
  let drops = Array(columns).fill(0);

  function draw() {
    // Radial gradient centered in canvas
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.95)");
    gradient.addColorStop(1, "rgba(255,255,255,0.9)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const color = colors[i % colors.length];
      ctx.fillStyle = color;

      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      drops[i] += 0.5;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
    }
  }

  // Animate
  setInterval(draw, 50);

  // Handle resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(0);
  });

  // === Service Card Toggle ===
  window.toggleCard = function(id) {
    const allCards = document.querySelectorAll(".service-card");

    allCards.forEach(card => {
      const details = card.querySelector(".service-info");
      if (card.id === "card-" + id) {
        const isOpen = card.classList.contains("open");
        if (isOpen) {
          card.classList.remove("open");
          details.style.maxHeight = "0px";
        } else {
          card.classList.add("open");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      } else {
        card.classList.remove("open");
        card.querySelector(".service-info").style.maxHeight = "0px";
      }
    });
  };
});
