
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

        class EndScreen extends Phaser.Scene{
          constructor(){
            super('EndScreen');
          }
          create(data){
            const {width,height} = this.scale
    
            this.add.text(width * 0.15,height * 0.5, data.title,{
                fontSize: '48px',
                color: '#fff',
                backgroundColor: "rgba(43, 197, 151, 0.76)",
                padding: {right:10,top:10,bottom:10}
            })
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
            this.scene.start('EndScreen',{title:'Game Over. You Win!'});
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

          createCardGrid(rows, cols, numDeathCards) {
            const cardSpacing = 100;
            const offsetX = (this.cameras.main.width - cols * cardSpacing) / 2;
            const offsetY = (this.cameras.main.height - rows * cardSpacing) / 2;

            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                let card = this.add.sprite(offsetX + x * cardSpacing, offsetY + y * cardSpacing, 'card_back').setInteractive();
                card.on('pointerdown', () => {
                  this.flipCard(card);
                });
              }
            }
          }

          flipCard(x, y) {
            // cardTexture = // card at loop
            // card.setTexture(cardTexture)
            card.setTexture('card_04');
          }

          unflipCard(x, y) {
            // cardTexture = // card at loop
            card.setTexture('card_back');
          }
          
          removeCard(x, y) {
            return null;
          }
          
          /* Displays that the special cards have been reshuffled*/
          displayReshuflleScreen() {
              return null;
          }
          
          /* Gets player input */
          getPlayerClicks(x, y, board) {
            
            card.on('gameobjectclick',  () => {
              this.flipCard(x, y);
            });
        }
      }

        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          parent: 'game-container',
          scene: [GameScene, EndScreen],
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

