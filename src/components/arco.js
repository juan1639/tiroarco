import { dibuja_rectangulos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

export class Arco {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(x, y) {

        this.arco = this.relatedScene.physics.add.sprite(x, y, 'arco');

        this.arco.setScale(1, 0.8).setDepth(Settings.depth.arco);
        this.arco.body.setAllowGravity(false);

        console.log(this.arco);
    }

    update(x, y) {

        const updateX = x + 1;
        const updateY = y + 12;

        this.arco.setX(updateX).setY(updateY);
    }

    get() {
        return this.arco;
    }
}

// =========================================================================
export class Flecha {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.flecha = this.relatedScene.physics.add.group();

        for (let i = 0; i < Settings.flecha.nroFlechas; i ++) {

            this.flecha.create(
                Settings.flecha.iniX,
                Settings.flecha.iniY + i * 20,
                'flecha'
            );
        }

        this.flecha.children.iterate((fl, index) => {

            fl.setScale(1, 1).setAngle(0).setDepth(Settings.depth.flecha);
            fl.setVelocityX(0).setVelocityY(0);
            fl.setCollideWorldBounds(true);
            fl.body.setAllowGravity(false);
            fl.setData('ajuste-clavar-diana', 20);
            fl.setData('angulo', 7);
            fl.setData('ajuste-division-angulo', 20);
            fl.setData('estado', 'null'); // null / pre / lanzando / clavada

            if (index === 0) fl.setData('estado', 'pre');
        });

        dibuja_rectangulos(this.relatedScene, {
            x: Settings.flecha.iniX - 50,
            y: Settings.flecha.iniY,
            ancho: 100,
            alto: 20 * Settings.flecha.nroFlechas,
            pad: 10
        });

        console.log(this.flecha);
    }

    update() {

        this.flecha.children.iterate(fl => {

            if (fl.getData('estado') === 'pre') {
                fl.setX(this.relatedScene.sys.game.config.width / 10 + Settings.flecha.offSetX);
                fl.setY(this.relatedScene.sys.game.config.height - Settings.flecha.offSetY);
            }

            if (fl.getData('estado') === 'lanzando') {

                fl.setAngle(fl.body.velocity.y / fl.getData('ajuste-division-angulo'));
            }
        });
    }
    
    get() {
        return this.flecha;
    }
}
