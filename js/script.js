function draw() {
  // Create a radial gradient centered in the canvas
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,          // inner circle
    canvas.width / 2, canvas.height / 2, canvas.width / 2 // outer circle
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");   // pure white center
  gradient.addColorStop(0.5, "rgba(255,255,255,0.95)");
  gradient.addColorStop(1, "rgba(255,255,255,0.9)"); // subtle fade outward

  // Fill background with gradient
  ctx.fillStyle = gradient;
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
