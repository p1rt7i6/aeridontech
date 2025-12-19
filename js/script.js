// === AeridonTech Binary Rain Background ===
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
    // Light fade background
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      // Pick random binary char
      const text = chars[Math.floor(Math.random() * chars.length)];
      // Cycle brand colors
      const color = colors[i % colors.length];
      ctx.fillStyle = color;

      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      // Draw text
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Move drop down slowly
      drops[i] += 0.5;

      // Reset drop randomly
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
});
