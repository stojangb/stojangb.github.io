const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 80;
const G = 1; // Gravitational constant

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
    }

    update() {
        for (let particle of particles) {
            if (particle !== this) {
                const dx = particle.x - this.x;
                const dy = particle.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0 && distance < canvas.width / 2) {
                    const force = G / (distance * distance);
                    const ax = force * dx;
                    const ay = force * dy;

                    this.vx += ax;
                    this.vy += ay;
                }
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

initParticles();
animate();
