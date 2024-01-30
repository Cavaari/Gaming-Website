import { useEffect } from "react";

export default function Game() {
    useEffect(() => {
        const initPhaser = async () => {
            const Phaser = await import('phaser');

            class Example extends Phaser.Scene {
                preload() {
                    // Load the local image from the public directory
                    this.load.image('bg', 'textures/back.png');
                }

                create() {
                    // Use the entire game canvas size to place the background image
                    const bgImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');

                    // Set the background image to cover the entire game canvas
                    bgImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
                }
            }

            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                scene: Example,
            };

            const game = new Phaser.Game(config);
        };

        initPhaser();
    }, []);

    return <div></div>;
}
components/Game.js
