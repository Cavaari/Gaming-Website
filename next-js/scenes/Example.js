class Example extends Phaser.Scene {
    preload() {
        // Load the local image from the public directory
        this.load.image('bg', 'textures/back.png');
    }

    create() {
        // Use the entire game canvas size to place the background image
        const bgImage = this.add.image(0, 0, 'bg');
        // const bgImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');

        // Set the background image to cover the entire game canvas
        bgImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Optionally, add other game logic here
    }
}

export default Example;
