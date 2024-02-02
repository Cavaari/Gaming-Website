import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'
import SocketContext from '@/components/SocketContext';
export default function Game() {
  const router = useRouter()
  // router.query.slug == gameId
  const roomCode = router.query.slug

    // phaser game object   
  const gameRef = useRef(null)
  // socket object   
  const socket = useContext(SocketContext)

  useEffect(()=>{
    
    if(roomCode && socket){
        // Fetch game data
        socket.emit("get game", roomCode)
        socket.on('get game', (message) => {
            console.log(message);
        });


        socket.on('game start', (message) => {
            console.log("Game is starting the state is: \n");
            console.log(message);
        });

        // Load Phaser Game
        const initPhaser = async () => {
            const Phaser = await import('phaser');

            class GameScene extends Phaser.Scene {
                preload() {
                    // Load background image
                    this.load.image('bg', '../../textures/back.png');

                    // Load card back and front images
                    this.load.image('card_back', '../../runeTextures/Black/Rectangle/Card1.png');
                    this.load.image('card_front', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_007.png');

                    // Add more card images as needed
                    this.load.image('card_0', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_002.png');
                    this.load.image('card_1', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_003.png');
                    // this.load.image('card_4', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_004.png');
                    // this.load.image('card_5', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_005.png');
                    // this.load.image('card_6', '../../runeTextures/Black/Rectangle/runeBlack_rectangle_006.png');
                    for (let i = 2; i <= 9; i++) {
                        this.load.image(`card_${i}`, '../../runeTextures/Black/Rectangle/runeBlack_rectangle_00'+`${i}`+'.png');
                    }
                    for (let i = 10; i <= 36; i++) {
                        this.load.image(`card_${i}`, '../../runeTextures/Black/Rectangle/runeBlack_rectangle_0'+`${i}`+'.png');
                    }
                }

                create() {
                    this.add.image(0, 0, 'bg').setBlendMode(Phaser.BlendModes.DARKEN);
                    this.input.on('gameobjectdown', this.flipCard, this);
                    this.createCardGrid(4, 4); // 4x4 grid, adjust as needed


                    // const brightness = -50;  // Adjust this value for brightness
                    // const contrast = -30;    // Adjust this value for contrast
                }

                createCardGrid(rows, cols) {
                    const cards = [];

                    // Create cards in a grid
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            const card = this.add.sprite(100 * j + 80, 100 * i + 80, 'card_back')
                                .setInteractive()
                                .setData('isFlipped', false);

                            // Assign unique card front image to each card
                            const cardNumber = i * cols + j + 1;
                            card.setData('cardFront', `card_${cardNumber}`);

                            cards.push(card);
                        }
                    }

                    return cards;
                }

                flipCard(pointer, card) {
                    if (!card.getData('isFlipped')) {
                        // just example of calling socket from phaser
                        socket.emit("makeMove", {gameId: roomCode, player: socket.id, moveType: "flip"})
                        card.setTexture(card.getData('cardFront'));
                        card.setData('isFlipped', true);
                    } else {
                        card.setTexture('card_back');
                        card.setData('isFlipped', false);
                    }
                }
            }

            const config = {
                type: Phaser.AUTO,
                width: 450,
                height: 500,
                autoCenter: Phaser.Scale.CenterType,
                scene: GameScene,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 }
                    }
                },
                canvas: document.getElementById("gameCanvas")
            };

            const game = new Phaser.Game(config);
            gameRef.current = game 
        };

        initPhaser();
    }
    
    return ()=>{
        if(gameRef.current){
            gameRef.current.destroy()
        }
    }
  },[roomCode, socket])
  return (
     <div className="bg-second d-flex align-items-center text-center">
        <h2 className='mt-3 w-100 text-white'>Room Code: {roomCode}</h2>
        <div id="game-container"></div>
    </div>
  )
}