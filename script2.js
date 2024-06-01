const spiral = document.getElementById('spiral');
const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    circle.style.left = `${window.innerWidth / 2}px`;
    circle.style.top = `${window.innerHeight / 2}px`;
    return circle;
}

function animateCircles() {
    const numCircles = 100;
    const sizeIncrement = 0.5;
    
    let i = 0;
    const interval = setInterval(() => {
        if (i >= numCircles) {
            clearInterval(interval);
            return;
        }

        const circle = createCircle();
        const size = 20 + i * sizeIncrement;

        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        spiral.appendChild(circle);

        setTimeout(() => {
            const deltaX = mouseX - (window.innerWidth / 2);
            const deltaY = mouseY - (window.innerHeight / 2);
            circle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }, 0);

        i++;
    }, 100); // Ajusta la velocidad de aparición de los círculos
}

document.getElementById('navigateButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

window.onload = animateCircles;