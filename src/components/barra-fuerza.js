import { dibuja_rectangulos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

export class BarraFuerza {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        dibuja_rectangulos(this.relatedScene, {
            x: Settings.barraFuerza.x,
            y: Settings.barraFuerza.y,
            ancho: Settings.barraFuerza.ancho,
            alto: Settings.barraFuerza.alto,
            pad: Settings.barraFuerza.padding
        });

        this.barrafuerza = this.relatedScene.add.sprite(
            Settings.barraFuerza.x, Settings.barraFuerza.y, 'barra-fuerza'
        );

        this.barrafuerza.setOrigin(0, 0).setScale(0.1, 1).setTint(0x00ff20);
        this.barrafuerza.setX(Settings.barraFuerza.x).setY(Settings.barraFuerza.y);
    }
    
    get() {
        return this.barrafuerza;
    }
}
