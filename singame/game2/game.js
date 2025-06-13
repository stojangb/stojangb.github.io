const OPENAI_API_KEY = window.OPENAI_API_KEY || '';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create }
};

let ghost;
let dialog;
const history = [
  { role: 'system', content: 'Eres un fantasma de una ciudad abandonada. Responde siempre en español con frases cortas.' }
];

function preload() {
  this.load.setBaseURL('https://labs.phaser.io');
  this.load.image('bg', 'assets/skies/deep-space.jpg');
  this.load.image('ghost', 'assets/sprites/ghost.png');
}

function create() {
  dialog = document.getElementById('dialog');
  this.add.image(400, 300, 'bg');
  ghost = this.physics.add.image(400, 300, 'ghost');
  ghost.setInteractive();
  ghost.on('pointerdown', () => talk.call(this));
  showDialog('Haz clic en el fantasma para hablar.');
}

function showDialog(text) {
  dialog.textContent = text;
  dialog.classList.remove('hidden');
}

async function talk() {
  showDialog('...');
  const response = await getGhostMessage('Habla con el jugador');
  showDialog(response);
  this.tweens.add({
    targets: ghost,
    x: Phaser.Math.Between(100, 700),
    y: Phaser.Math.Between(100, 500),
    duration: 800,
    ease: 'Sine.easeInOut'
  });
}

async function getGhostMessage(prompt) {
  if (!OPENAI_API_KEY) {
    return 'Falta la API key de OpenAI.';
  }
  history.push({ role: 'user', content: prompt });
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: history,
      max_tokens: 60
    })
  });
  const data = await res.json();
  const msg = data.choices?.[0]?.message?.content?.trim() || '...';
  history.push({ role: 'assistant', content: msg });
  return msg;
}

new Phaser.Game(config);
