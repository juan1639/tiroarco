
export class TileSuelo {

    static sizeXY = [64, 64];

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const posY = this.relatedScene.sys.game.config.height;

        this.tilesuelo = this.relatedScene.physics.add.sprite(
            -this.relatedScene.sys.game.config.width / 2, posY, 'tile-suelo'
        );

        this.tilesuelo.setOrigin(0, 0.5).setScale(37.5, 1).setDepth(10);
        this.tilesuelo.setImmovable(true);
        this.tilesuelo.body.setAllowGravity(false);

        console.log(this.tilesuelo);
    }

    get() {
        return this.tilesuelo;
    }
}
