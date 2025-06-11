const neonPurple = 0x5514b4;
const neonCyan = 0x00ffff;
const neonText = 0x9f6aff;

class LevelScene extends Phaser.Scene {
  constructor(key, data) { super(key); this.levelData = data; }
  create() {
    this.cameras.main.setBackgroundColor('#0e112f');
    this.platforms = this.physics.add.staticGroup();
    for (const p of this.levelData.platforms) {
      const rect = this.add.rectangle(p.x, p.y, p.w, p.h, neonPurple).setOrigin(0.5);
      this.physics.add.existing(rect, true);
      this.platforms.add(rect);
    }
    this.player = this.add.rectangle(this.levelData.player.x, this.levelData.player.y, 32, 48, neonCyan);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.exit = this.add.rectangle(this.levelData.exit.x, this.levelData.exit.y, 32, 32, neonText);
    this.physics.add.existing(this.exit, true);
    this.physics.add.overlap(this.player, this.exit, () => {
      this.scene.start(this.levelData.next);
    }, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    const style = { font: '16px Arial', fill: '#9f6aff' };
    this.add.text(16,16, this.levelData.name, style).setShadow(0,0,'#9f6aff',10);
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(160);
    } else {
      this.player.body.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-330);
    }
  }
}

const level1Data = {
  name: 'Level 1',
  platforms: [
    { x:400, y:590, w:800, h:20 },
    { x:200, y:450, w:120, h:20 },
    { x:400, y:350, w:120, h:20 },
    { x:600, y:250, w:120, h:20 }
  ],
  player: { x:100, y:520 },
  exit: { x:750, y:520 },
  next: 'level2'
};

const level2Data = {
  name: 'Level 2',
  platforms: [
    { x:400, y:590, w:800, h:20 },
    { x:150, y:520, w:120, h:20 },
    { x:300, y:440, w:120, h:20 },
    { x:450, y:360, w:120, h:20 },
    { x:600, y:280, w:120, h:20 }
  ],
  player: { x:50, y:520 },
  exit: { x:750, y:240 },
  next: 'level3'
};

const level3Data = {
  name: 'Level 3',
  platforms: [
    { x:400, y:590, w:800, h:20 },
    { x:250, y:520, w:120, h:20 },
    { x:550, y:520, w:120, h:20 },
    { x:400, y:430, w:120, h:20 },
    { x:200, y:340, w:120, h:20 },
    { x:600, y:340, w:120, h:20 },
    { x:400, y:250, w:120, h:20 }
  ],
  player: { x:100, y:520 },
  exit: { x:750, y:210 },
  next: 'end'
};

class EndScene extends Phaser.Scene {
  constructor() { super('end'); }
  create() {
    this.cameras.main.setBackgroundColor('#0e112f');
    this.add.text(400, 300, 'YOU WIN!', { font: '32px Arial', fill: '#9f6aff' })
      .setOrigin(0.5).setShadow(0,0,'#9f6aff',10);
    this.input.keyboard.on('keydown', () => {
      this.scene.start('level1');
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#0e112f',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: [new LevelScene('level1', level1Data), new LevelScene('level2', level2Data), new LevelScene('level3', level3Data), EndScene]
};

new Phaser.Game(config);
