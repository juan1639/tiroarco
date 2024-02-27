import { Settings } from "../scenes/settings.js";

export class Diana {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const randomDiana = Phaser.Math.Between(0, this.relatedScene.sys.game.config.width);

        this.diana = this.relatedScene.physics.add.group();

        for (let i = 0; i < Settings.diana.nroElementos; i ++) {

            this.diana.create(
                Settings.diana.x - randomDiana + i * Settings.diana.ancho,
                Settings.diana.y,
                'diana'
            );
        }

        this.coloresAreasImpacto = [
            0xffff00, 0xffff00, 0xffff00, 0xffff00, 0x0040ff, 0x0040ff, 0x0040ff, 0x0040ff,
            0xee1000, 0xee1000, 0xee1000, 0xee1000, 0x10aa20, 0x10aa20, 0x10aa20, 0x10aa20
        ];

        this.diana.children.iterate((dia, index) => {

            dia.setData('index', index);
            dia.setScale(1, 1 * (index / 10));
            dia.setDepth(Settings.depth.diana).setTint(this.coloresAreasImpacto[index]);
            dia.setVelocityX(0).setVelocityY(0);
            dia.body.setAllowGravity(false);
            dia.setImmovable(true);
        });

        console.log(this.diana);
    }

    update() {
    }
    
    get() {
        return this.diana;
    }
}
