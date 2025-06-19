const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 600,
  height: 400,
  physics: { default: 'arcade', arcade: { gravity: { y: 500 }, debug: false } },
  scene: { preload, create, update }
};

let ball;
let cursors;
let obstacles;
let obstacleTimer;
let gameOverText;

function preload() {}

function create() {
  this.cameras.main.setBackgroundColor('#0e112f');
  ball = this.add.circle(300, 50, 15, 0x00ffff);
  this.physics.add.existing(ball);
  ball.body.setBounce(0.6);
  ball.body.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  obstacles = this.physics.add.group();
  this.physics.add.collider(ball, obstacles, hit, null, this);

  obstacleTimer = this.time.addEvent({ delay: 1500, callback: addObstacle, callbackScope: this, loop: true });
  gameOverText = this.add.text(300, 200, '', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
}

function addObstacle() {
  const gapWidth = Phaser.Math.Between(100, 180);
  const gapX = Phaser.Math.Between(50, 550 - gapWidth);
  const leftW = gapX;
  const rightW = 600 - gapX - gapWidth;
  if (leftW > 0) {
    const l = this.add.rectangle(leftW / 2, 420, leftW, 20, 0x5514b4);
    this.physics.add.existing(l);
    l.body.setAllowGravity(false);
    l.body.setImmovable(true);
    l.body.setVelocityY(-120);
    obstacles.add(l);
  }
  if (rightW > 0) {
    const r = this.add.rectangle(gapX + gapWidth + rightW / 2, 420, rightW, 20, 0x5514b4);
    this.physics.add.existing(r);
    r.body.setAllowGravity(false);
    r.body.setImmovable(true);
    r.body.setVelocityY(-120);
    obstacles.add(r);
  }
}

function update() {
  if (gameOverText.text) return;
  ball.setVelocityX(0);
  if (cursors.left.isDown) ball.setVelocityX(-200);
  else if (cursors.right.isDown) ball.setVelocityX(200);
  obstacles.getChildren().forEach(o => { if (o.y < -20) o.destroy(); });
  if (ball.y < 0) lose.call(this);
}

function hit() { lose.call(this); }

function lose() {
  gameOverText.setText('Game Over');
  obstacleTimer.remove();
  this.time.delayedCall(1000, () => { this.scene.restart(); });
}

new Phaser.Game(config);
