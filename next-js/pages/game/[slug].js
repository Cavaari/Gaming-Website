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


        class StartScreen extends Phaser.Scene {
          constructor() {
            super('StartScreen');
          }

          preload() {
            this.load.image('bg', '/textures/back.png');
            this.load.image('card_back', '/runeTextures/Black/Slab/card1.png');
          }

          create(data) {
            const { width, height } = this.scale
            let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
            bg.displayWidth = this.sys.game.config.width;
            bg.displayHeight = this.sys.game.config.height;
            // this.createCardGrid(4, 6, 2);
            let easy = this.add.sprite(width/3, height/2, 'card_back').setInteractive()
            let medium = this.add.sprite(width/2, height/2, 'card_back').setInteractive()
            let hard = this.add.sprite(width/1.5, height/2, 'card_back').setInteractive()

            easy.on('pointerdown', () => {
              this.scene.start('GameScene',{rows:4,columns:6,deathcards:2})
              this.scene.setActive(false,'StartScreen').setVisible(false,'StartScreen')
            });

            medium.on('pointerdown', () => {
              this.scene.start('GameScene',{rows:5,columns:7,deathcards:4})
              this.scene.setActive(false,'StartScreen').setVisible(false,'StartScreen')
            });

            hard.on('pointerdown', () => {
              this.scene.start('GameScene',{rows:5,columns:7,deathcards:6})
              this.scene.setActive(false,'StartScreen').setVisible(false,'StartScreen')
            });
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
            for (let i = 10; i <= 20; i++) {
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
            const offsetX = (this.cameras.main.width - cols * cardSpacing) / 2;
            const offsetY = (this.cameras.main.height - rows * cardSpacing) / 2;
            let cardTextureNames = this.getCardTextureNames(rows * cols / 2, numDeathCards);

            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                let cardTextureName = cardTextureNames.pop();
                let card = this.add.sprite(offsetX + x * cardSpacing, offsetY + y * cardSpacing, 'card_back').setInteractive();
                card.setData('cardTexture', cardTextureName);
                card.on('pointerdown', () => {
                  this.flipCard(card);
                });
                if(cardTextureName != 'card_death') {
                  this.cards.push(card);
                }
              }
            }
          }

          getCardTextureNames(pairs, numDeathCards) {
            let names = [];
            // Push each texture name twice for matching pairs
            for (let i = 2; i < pairs + 2 - (numDeathCards/2); i++) {
              names.push(`card_${i}`);
              names.push(`card_${i}`);
            }
            // push the death cards
            for(let i = 0; i < numDeathCards; i++) {
              names.push('card_death');
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
                this.cards.splice(this.cards.indexOf(card),1)
              });

              //check for lose
              if(this.flippedCards[0].texture.key == 'card_death') {
                //show lose screen
                this.scene.start('EndScreen',{title:'Game Over. You Lose!'})
              }
              this.flippedCards = [];

              // check for win
              if(this.cards.length == 0){
                // show win screen
                this.scene.start('EndScreen',{title:'Game Over. You Win!'})
              }
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
          scene: [StartScreen, GameScene, EndScreen, HowToPlayScreen],
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

