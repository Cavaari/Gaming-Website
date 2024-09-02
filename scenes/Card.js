// Card.js
import Phaser from 'phaser';

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, 'cardBack');
    this.textureKey = textureKey;
    this.isFaceUp = false;
    this.setInteractive();

    this.on('pointerdown', () => {
      if (!this.isFaceUp && scene.openedCards.length < 2) {
        this.flip();
        scene.checkForMatch(this);
      }
    });

    scene.add.existing(this);
  }

  flip() {
    this.isFaceUp = !this.isFaceUp;
    this.setTexture(this.isFaceUp ? this.textureKey : 'cardBack');
  }
}
export default Card;
