const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 200 }, debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  this.load.setBaseURL('https://labs.phaser.io');
  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
}

function create() {
  this.add.image(400, 300, 'sky');
  const logo = this.physics.add.image(400, 100, 'logo');
  logo.setVelocity(200, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);
}

function update() {}

new Phaser.Game(config);
