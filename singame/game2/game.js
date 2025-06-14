const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create, update }
};

let player;
let sheep;
let cursors;
let winText;

function preload() {
  this.load.setBaseURL('https://labs.phaser.io');
  this.load.image('player', 'assets/sprites/dude.png');
  this.load.image('sheep', 'assets/demoscene/star2.png');
}

function create() {
  this.cameras.main.setBackgroundColor('#000');
  player = this.physics.add.sprite(100, 300, 'player').setScale(0.5);
  player.setCollideWorldBounds(true);

  sheep = this.physics.add.sprite(700, 300, 'sheep').setScale(1.2);
  sheep.setBlendMode(Phaser.BlendModes.ADD);

  cursors = this.input.keyboard.createCursorKeys();
  winText = this.add.text(400, 50, '', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);

  this.physics.add.overlap(player, sheep, win, null, this);
}

function update() {
  if (winText.text) return;

  player.setVelocity(0);
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  }
}

function win() {
  winText.setText('¡Ganaste!');
  sheep.destroy();
}

new Phaser.Game(config);
