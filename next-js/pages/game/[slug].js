
import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SocketContext from '@/components/SocketContext';
import gamer from '../../lib/card_match/classes/game'

export default function Gamer() {
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

            let close = this.add.sprite(width-50, 20, 'close')
            .setInteractive()
            close.on('pointerdown', () => {
              this.scene.setActive(false,"HowToPlayScreen").setVisible(false,"HowToPlayScreen")
              // this.scene.remove("HowToPlayScreen")
            });
            close.displayWidth = 50
            close.displayHeight = 50
          }
        }
      
        

        class GameScene extends Phaser.Scene {
          preload() {
            this.load.image('bg', '/textures/back.png');
            this.load.image('card_back', '/runeTextures/Black/Slab/card1.png');
            this.load.image('card_death', '/runeTextures/Red/cardDeath.png');
            for (let i = 2; i <= 9; i++) {
              this.load.image(`card_${i}`, `/runeTextures/Black/Slab/runeBlack_slab_00${i}.png`);
            }
            for (let i = 10; i <= 35; i++) {
              this.load.image(`card_${i}`, `/runeTextures/Black/Slab/runeBlack_slab_0${i}.png`);
            }
          }

          create() {
            let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
            bg.displayWidth = this.sys.game.config.width;
            bg.displayHeight = this.sys.game.config.height;
            this.createCardGrid(4, 6, 2);
            // this.displayBoard(board);
          }

          // New method for displaying win game for player who hasn't lost
          gameOver() {
            this.scene.start('EndScreen', { title: 'Game Over. You Win!' });
          }

          displayBoard(board) {
            const cards = [];

            for (let i = 0; i < board.length; i++) {
              for (let j = 0; j < board.length; j++) {
                const card = this.add.sprite(100 * j + 80, 100 * i + 80, 'card_back')
                  .setInteractive()
                  .setData('isFlipped', false);
              }
            }
            cards.push(card);
          }


          createCardGrid() {
            const rows = 4; // Example rows, adjust as needed
            const cols = 6; // Example cols, adjust as needed
            const cardSpacing = 100;
            const offsetX = (this.cameras.main.width - cols * cardSpacing) / 2;
            const offsetY = (this.cameras.main.height - rows * cardSpacing) / 2;
            this.cardsFlipped = [];
            this.cardsMatched = [];

            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                // Simplified example for assigning card types
                let cardType = `card_${Math.floor(Math.random() * 34) + 2}`; // Assuming card types are from card_2 to card_35
                let card = this.add.sprite(offsetX + x * cardSpacing, offsetY + y * cardSpacing, 'card_back')
                  .setInteractive()
                  .setData('type', cardType)
                  .setData('position', { x, y })
                  .setData('flipped', false);
                card.on('pointerdown', () => {
                  this.flipCard(card);
                });
              }
            }
          }

          flipCard(card) {
            // Ignore if the card is already flipped or two cards are being evaluated
            if (card.getData('flipped') || this.cardsFlipped.length >= 2) {
              return;
            }

            card.setTexture(card.getData('type'));
            card.setData('flipped', true);
            this.cardsFlipped.push(card);

            if (this.cardsFlipped.length === 2) {
              // Check for a match
              const [card1, card2] = this.cardsFlipped;
              // card1.position //card1.position -> calling check for match on the backend
              if (card1.getData('type') === card2.getData('type')) {
                // Match found, do something like marking them as matched
                this.cardsMatched.push(card1, card2);
                this.removeCard(card1);
                this.removeCard(card2)
                this.cardsFlipped = [];
              } else {
                this.unflipCard(card1);
                this.unflipCard(card2);
              }
            }
          }



          unflipCard(card) {
            // No match, flip back after a delay
            this.time.delayedCall(1000, () => {
              card.setTexture('card_back').setData('flipped', false);
              this.cardsFlipped = [];
            });
          }

          removeCard(card1) {
            card1.destroy();
            // card2.destroy();
          }

          /* Displays that the special cards have been reshuffled*/
          displayReshuflleScreen() {
            return null;
          }

          /* Gets player input */
          getPlayerClicks(x, y, board) {

            card.on('gameobjectclick', () => {
              this.flipCard(x, y);
            });
          }
        }

        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          parent: 'game-container',
          scene: [GameScene, EndScreen, HowToPlayScreen],
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


  function howToPlay() {
    gameRef.current.scene.start("HowToPlayScreen");
  }

  return (
    <div style={{ backgroundImage: 'url("/textures/background2.png")', backgroundSize: 'cover', height: '100vh', position: 'relative' }} className="bg-second d-flex align-items-center text-center">
      <button type="button" class="btn btn-success" style={{position: 'absolute', left: '1%',top:'2%', zIndex:5}} onClick={howToPlay}>How To Play</button>
      <h2 style={{ color: 'purple', textShadow: '2px 2px 4px #1FE8DC', zIndex: 2, position: 'absolute', top: '-1%', left: '50%', transform: 'translate(-50%, 0%)' }} className='mt-3 w-100 text-purple'>Room Code: {roomCode}</h2>
      <div id="game-container" style={{ border: '10px solid #1FE8DC', borderRadius: '10px', zIndex: 1, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </div>
  );
}

