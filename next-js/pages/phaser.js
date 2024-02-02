// import { useEffect } from 'react';

// const Game = () => {
//     useEffect(() => {
//         const initPhaser = async () => {
//             const Phaser = await import('phaser');
            
//             class GameScene extends Phaser.Scene {

//                 preload() {
//                     // Load background image
//                     this.load.image('bg', 'textures/back.png');

//                     // Load card back and front images
//                     this.load.image('card_back', 'runeTextures/Black/Rectangle/Card1.png');
//                     this.load.image('card_front', 'runeTextures/Black/Rectangle/runeBlack_rectangle_007.png');

//                     // Add more card images as needed
//                     this.load.image('card_1', 'runeTextures/Black/Rectangle/runeBlack_rectangle_002.png');
//                     this.load.image('card_2', 'runeTextures/Black/Rectangle/runeBlack_rectangle_003.png');
//                     this.load.image('card_2', 'runeTextures/Black/Rectangle/runeBlack_rectangle_004.png');
//                     this.load.image('card_2', 'runeTextures/Black/Rectangle/runeBlack_rectangle_005.png');
//                     this.load.image('card_2', 'runeTextures/Black/Rectangle/runeBlack_rectangle_006.png');
//                 }

//                 create() {
//                     this.add.image(0, 0, 'bg').setBlendMode(Phaser.BlendModes.DARKEN);
//                     this.input.on('gameobjectdown', this.flipCard, this);
//                     this.createCardGrid(4, 4); // 4x4 grid, adjust as needed


//                     // const brightness = -50;  // Adjust this value for brightness
//                     // const contrast = -30;    // Adjust this value for contrast
//                 }

//                 createCardGrid(rows, cols) {
//                     const cards = [];

//                     // Create cards in a grid
//                     for (let i = 0; i < rows; i++) {
//                         for (let j = 0; j < cols; j++) {
//                             const card = this.add.sprite(100 * j + 80, 100 * i + 80, 'card_back')
//                                 .setInteractive()
//                                 .setData('isFlipped', false);

//                             // Assign unique card front image to each card
//                             const cardNumber = i * cols + j + 1;
//                             card.setData('card_front', `card_${cardNumber}`);

//                             // Replacing cardFront with existing image as temporary measure (no missing assets)
//                             // card.setData('cardFront', `card_${cardNumber}`);

//                             cards.push(card);
//                         }
//                     }

//                     return cards;
//                 }

//                 flipCard(pointer, card) {
//                     if (!card.getData('isFlipped')) {
//                         card.setTexture('card_front');
//                         card.setData('isFlipped', true);
//                     } else {
//                         card.setTexture('card_back');
//                         card.setData('isFlipped', false);
//                     }
//                 }
//             }

//             const config = {
//                 type: Phaser.AUTO,
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//                 scene: GameScene,
//                 physics: {
//                     default: 'arcade',
//                     arcade: {
//                         gravity: { y: 200 }
//                     }
//                 }
//             };

//             const game = new Phaser.Game(config);
//         };

//         initPhaser();
//     }, []);

//     return <div id="game-container"></div>;
// };

// export default Game;
