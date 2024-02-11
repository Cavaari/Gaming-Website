import React, { useEffect, useRef } from 'react';


export default function Game() {
  const gameRef = useRef(null);

  useEffect(() => {
    const initPhaser = async () => {
      const Phaser = await import('phaser');

      class EndScreen extends Phaser.Scene {
        constructor() {
          super('EndScreen');
        }
        create(data) {
          const { width, height } = this.scale

          this.add.text(width * 0.15, height * 0.5, data.title, {
            fontSize: '48px',
            color: '#fff',
            backgroundColor: "rgba(43, 197, 151, 0.76)",
            padding: { right: 10, top: 10, bottom: 10 }
          })
        }
      }
      //////////////////
      // LevelSelectionScreen.js
      class LevelSelectionScreen extends Phaser.Scene {
        constructor() {
          super('LevelSelectionScreen');
        }

        preload() {
          this.load.image('bg', '/textures/back.png'); // Background texture is the sma eas in the figma
        }
        create() {
          const { width, height } = this.scale;

          let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
          bg.displayWidth = this.sys.game.config.width;
          bg.displayHeight = this.sys.game.config.height;

          // Style for the buttons
          const buttonStyle = { fontSize: '32px', color: '#000', backgroundColor: '#FFF', padding: 10, borderRadius: 15 };

          // Create a white rounded rectangle bubble for each button
          this.createButton(width / 2, height / 2 - 100, 'NOOB\'S', () => this.selectLevel('noobs'), buttonStyle);
          this.createButton(width / 2, height / 2, 'PRO\'S', () => this.selectLevel('pros'), buttonStyle);
          this.createButton(width / 2, height / 2 + 100, 'HACKER\'S', () => this.selectLevel('hackers'), buttonStyle);
        }

        createButton(x, y, text, callback, style) {
          // Draw the bubble background as the contrast was too little with the background
          const bubbleWidth = 200; // Adjust the width 
          const bubbleHeight = style.fontSize * 1.5; // Adjust the height 
          const bubblePadding = 10;
          const bubble = this.add.graphics({ x: x - bubbleWidth / 2 - bubblePadding, y: y - bubbleHeight / 2 - bubblePadding });

          bubble.fillStyle(0xffffff, 1); // White color is being used with the level selection buttons
          bubble.fillRoundedRect(0, 0, bubbleWidth + 2 * bubblePadding, bubbleHeight + 2 * bubblePadding, 16); // Rounded rectangle

          // Add the text for levels
          const button = this.add.text(x, y, text, style)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', callback);

          return { bubble, button };
        }

        selectLevel(level) {
          let config;
          switch (level) {
            case 'noobs':
              config = { rows: 4, columns: 6, deathcards: 2 };
              break;
            case 'pros':
              config = { rows: 5, columns: 7, deathcards: 4 };
              break;
            case 'hackers':
              config = { rows: 6, columns: 8, deathcards: 6 };
              break;
            default:
              config = { rows: 4, columns: 6, deathcards: 2 }; // default to noobs if something goes wrong
          }

          this.scene.start('StartScreen', config);
        }
      }


      ////////////////////
      class HowToPlayScreen extends Phaser.Scene {
        preload() {
          this.load.image('close', '/symbols/close.png');
        }
        constructor() {
          super('HowToPlayScreen');
        }

        create() {
          const { width, height } = this.scale

          this.add.text(0, 0, "How To Play\n\n- Click on tiles to flip them over\n- Match two tiles to get rid of a pair\n- Be careful, if you match two death cards, you lose!\n\n- Match all cards (except death cards) to win!", {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: "rgba(43, 197, 151, 0.76)",
            padding: { right: 10, top: 10, bottom: 10 }
          });

          let close = this.add.sprite(width - 50, 20, 'close')
            .setInteractive()
          close.on('pointerdown', () => {
            this.scene.setActive(false, "HowToPlayScreen").setVisible(false, "HowToPlayScreen")
            // this.scene.remove("HowToPlayScreen")
          });
          close.displayWidth = 50
          close.displayHeight = 50
        }
      }

      class StartScreen extends Phaser.Scene {
        constructor() {
          super('StartScreen');
        }

        preload() {
          this.load.image('bg', '/textures/back.png');
          this.load.image('card_back', '/runeTextures/Black/Slab/card1.png');
        }

        create(data) {
          const { width, height } = this.scale;
          let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
          bg.displayWidth = this.sys.game.config.width;
          bg.displayHeight = this.sys.game.config.height;

          // directly start the GameScene with the data provided when we clickedon a level in  LevelSelectionScreen
          this.scene.start('GameScene', data);
        }
      }


      class GameScene extends Phaser.Scene {
        constructor() {
          super('GameScene');
          this.flippedCards = [];
          this.cards = [];
        }

        preload() {
          this.load.image('bg', '/textures/back.png');
          this.load.image('card_back', '/runeTextures/Black/Slab/card1.png');
          this.load.image('card_death', '/runeTextures/Red/cardDeath.png');
          for (let i = 2; i <= 9; i++) {
            this.load.image(`card_${i}`, `/runeTextures/Black/Slab/runeBlack_slab_00${i}.png`);
          }
          for (let i = 10; i < 37; i++) {
            this.load.image(`card_${i}`, `/runeTextures/Black/Slab/runeBlack_slab_0${i}.png`);
          }
        }

        create(data) {
          let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
          bg.displayWidth = this.sys.game.config.width;
          bg.displayHeight = this.sys.game.config.height;
          this.createCardGrid(data.rows, data.columns, data.deathcards);
        }

        createCardGrid(rows, cols, numDeathCards) {
          const cardSpacing = 100;
          const offsetX = (this.cameras.main.width - cols * cardSpacing) / 2 + cardSpacing / 2;
          const offsetY = (this.cameras.main.height - rows * cardSpacing) / 2 + cardSpacing / 2;
          let totalCards = rows * cols;
          let cardTextureNames = this.getCardTextureNames((totalCards - numDeathCards) / 2, numDeathCards);

          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              let cardTextureName = cardTextureNames.pop();
              let card = this.add.sprite(offsetX + x * cardSpacing, offsetY + y * cardSpacing, 'card_back').setInteractive();
              card.setData('cardTexture', cardTextureName);
              card.on('pointerdown', () => {
                this.flipCard(card);
              });
              if (cardTextureName !== 'card_death') {
                this.cards.push(card);
              }
            }
          }
        }

        getCardTextureNames(pairs, numDeathCards) {
          // We have 35 unique card textures from 2 to 36 and we load all those crads in first
          let names = [];
          let cardIndices = [];
          for (let i = 2; i < 37; i++) {
            cardIndices.push(i);
          }

          // then if  there are not enough unique cards, repeat the card making process
          // meaning if we dont have enough loaded cards, more pairs will be made to fill in the board
          while (cardIndices.length < pairs) {
            cardIndices = [...cardIndices, ...cardIndices].slice(0, pairs);
          }

          // then the cards are shuffled for randomness
          cardIndices = Phaser.Utils.Array.Shuffle(cardIndices);

          // Create pairs
          for (let i = 0; i < pairs; i++) {
            names.push(`card_${cardIndices[i]}`);
            names.push(`card_${cardIndices[i]}`);
          }

          // Adding the death cards
          for (let i = 0; i < numDeathCards; i++) {
            names.push('card_death');
          }

          return Phaser.Utils.Array.Shuffle(names);
        }


        flipCard(card) {
          if (this.flippedCards.length < 2 && card.texture.key === 'card_back') {
            // start flip animation
            this.tweens.add({
              targets: card,
              scaleX: 0,
              ease: 'Linear',
              duration: 100,
              onComplete: () => {
                card.setTexture(card.getData('cardTexture'));

                this.tweens.add({
                  targets: card,
                  scaleX: 1,
                  ease: 'Linear',
                  duration: 100,
                });


                this.flippedCards.push(card);

                if (this.flippedCards.length === 2) {
                  this.checkForMatch();
                }
              },
            });

          }
        }

        checkForMatch() {
          if (this.flippedCards[0].texture.key === this.flippedCards[1].texture.key) {

            // Cards match, remove them
            this.time.delayedCall(1000, () => {
              this.flippedCards.forEach(card => {
                card.destroy();
                this.cards.splice(this.cards.indexOf(card), 1)
              });

              //check for lose
              if (this.flippedCards[0].texture.key == 'card_death') {
                //show lose screen
                this.scene.start('EndScreen', { title: 'Game Over. You Lose!' })
              }
              this.flippedCards = [];

              // check for win
              if (this.cards.length == 0) {
                // show win screen
                this.scene.start('EndScreen', { title: 'Game Over. You Win!' })
              }
            });
          } else {
            // Cards don't match, flip them back over after a short delay
            this.time.delayedCall(1000, () => {
              this.flippedCards.forEach(card => {
                // start flip animation
                this.tweens.add({
                  targets: card,
                  scaleX: 0,
                  ease: 'Linear',
                  duration: 100,
                  onComplete: () => {
                    card.setTexture('card_back');

                    this.tweens.add({
                      targets: card,
                      scaleX: 1,
                      ease: 'Linear',
                      duration: 100,
                    });
                    this.flippedCards = [];
                  },
                });

              });
              this.flippedCards = [];
            });
          }
        }
      }

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        scene: [LevelSelectionScreen, StartScreen, GameScene, EndScreen, HowToPlayScreen],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 }
          }
        }
      };

      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, []);

  function howToPlay() {
    gameRef.current.scene.start("HowToPlayScreen");
  }

  return (
    <div style={{ backgroundImage: 'url("/textures/background2.png")', backgroundSize: 'cover', height: '100vh', position: 'relative' }} className="bg-second d-flex align-items-center text-center">
      <button type="button" class="btn btn-success" style={{ position: 'absolute', left: '1%', top: '2%', zIndex: 5 }} onClick={howToPlay}>How To Play</button>
      <div id="game-container" style={{ border: '10px solid #1FE8DC', borderRadius: '10px', zIndex: 1, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </div>
  );
}
