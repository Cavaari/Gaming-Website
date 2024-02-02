
import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SocketContext from '@/components/SocketContext';

export default function Game() {
  const router = useRouter();
  const roomCode = router.query.slug;
  const gameRef = useRef(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (roomCode && socket) {
      // Fetch game data
      socket.emit("get game", roomCode);
      socket.on('get game', (message) => {
        console.log(message);
      });

      socket.on('game start', (message) => {
        console.log("Game is starting, the state is: \n", message);
      });

      const initPhaser = async () => {
        const Phaser = await import('phaser');

        class GameScene extends Phaser.Scene {
          constructor() {
            super('GameScene');
            this.flippedCards = [];
          }

          preload() {
            this.load.image('bg', '/textures/back.png');
            this.load.image('card_back', '/runeTextures/Black/Rectangle/card1.png');
            for (let i = 2; i <= 9; i++) {
              this.load.image(`card_${i}`, `/runeTextures/Black/Rectangle/runeBlack_rectangle_00${i}.png`);
            }
            for (let i = 10; i <= 13; i++) {
              this.load.image(`card_${i}`, `/runeTextures/Black/Rectangle/runeBlack_rectangle_0${i}.png`);
            }
          }

          create() {
            let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
            bg.displayWidth = this.sys.game.config.width;
            bg.displayHeight = this.sys.game.config.height;
            this.createCardGrid(4, 6);
          }

          createCardGrid(rows, cols) {
            const cardSpacing = 100;
            const offsetX = (this.cameras.main.width - cols * cardSpacing) / 2;
            const offsetY = (this.cameras.main.height - rows * cardSpacing) / 2;
            let cardTextureNames = this.getCardTextureNames(rows * cols / 2);

            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                let cardTextureName = cardTextureNames.pop();
                let card = this.add.sprite(offsetX + x * cardSpacing, offsetY + y * cardSpacing, 'card_back').setInteractive();
                card.setData('cardTexture', cardTextureName);
                card.on('pointerdown', () => {
                  this.flipCard(card);
                });
              }
            }
          }

          getCardTextureNames(pairs) {
            let names = [];
            // Push each texture name twice for matching pairs
            for (let i = 2; i < pairs + 2; i++) {
              names.push(`card_${i}`);
              names.push(`card_${i}`);
            }
            return Phaser.Utils.Array.Shuffle(names);
          }

          flipCard(card) {
            if (this.flippedCards.length < 2 && card.texture.key === 'card_back') {
              card.setTexture(card.getData('cardTexture'));
              this.flippedCards.push(card);

              if (this.flippedCards.length === 2) {
                this.checkForMatch();
              }
            }
          }

          checkForMatch() {
            if (this.flippedCards[0].texture.key === this.flippedCards[1].texture.key) {
              // Cards match, remove them
              this.time.delayedCall(1000, () => {
              this.flippedCards.forEach(card => {
                card.destroy();
              });
              this.flippedCards = [];
            });
            } else {
              // Cards don't match, flip them back over after a short delay
              this.time.delayedCall(1000, () => {
                this.flippedCards.forEach(card => {
                  card.setTexture('card_back');
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
          scene: [GameScene],
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
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, [roomCode, socket]);

    return (
      <div style={{ backgroundImage: 'url("/textures/background2.png")', backgroundSize: 'cover', height: '100vh', position: 'relative' }} className="bg-second d-flex align-items-center text-center">
      <h2 style={{ color: 'purple', textShadow: '2px 2px 4px #1FE8DC', zIndex: 2, position: 'absolute', top: '-1%', left: '50%', transform: 'translate(-50%, 0%)' }} className='mt-3 w-100 text-purple'>Room Code: {roomCode}</h2>
      <div id="game-container" style={{ border: '10px solid #1FE8DC', borderRadius: '10px', zIndex: 1, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </div>
    );
  }

