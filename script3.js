const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;
const G = 0.1; // Gravitational constant

const word = "CHILE";
const letterData = []; // Array to store letter coordinates and radii

// Function to define letter coordinates and radii
function defineLetters() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const letterSpacing = 20; // Adjust for spacing between letters
  let currentX = centerX - word.length * letterSpacing / 2; // Center alignment

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const letterRadius = getLetterRadius(letter); // Function to calculate radius based on letter complexity (implement below)
    letterData.push({
      x: currentX + letterRadius,
      y: centerY,
      radius: letterRadius,
    });
    currentX += letterSpacing + letterRadius * 2; // Update position for next letter
  }
}

// Function to calculate letter radius based on complexity (replace with your implementation)
function getLetterRadius(letter) {
  switch (letter) {
    case 'C':
    case 'E':
      return 10;
    case 'H':
    case 'I':
    case 'L':
      return 5;
    case 'I':
      return 3; // Adjust as needed
    default:
      return 8; // Default radius for other letters
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  update() {
    for (const letter of letterData) {
      const dx = letter.x - this.x;
      const dy = letter.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > letter.radius) {
        const force = G / (distance * distance);
        const ax = force * dx;
        const ay = force * dy;

        this.vx += ax;
        this.vy += ay;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }
}

function initParticles() {
  defineLetters(); // Call to define letter coordinates before particle creation

  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

document.getElementById('navigateButton').addEventListener('click', () => {
  window.location.href = 'index2.html';
});

initParticles();
animate();
