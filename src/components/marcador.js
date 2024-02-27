import { Settings } from "../scenes/settings.js";

// ===========================================================================
export class Marcador {

    constructor(scene, datos) {
        this.relatedScene = scene;
        this.datos = datos;
    }

    create() {

        const { x, y, size, txt, color, id } = this.datos;

        let texto = '';

        if (id === 0) texto = `${txt}${Settings.getPuntos().score}`;
        if (id === 2) texto = `${txt}${Settings.getRecord()}`;

        this.marcador = this.relatedScene.add.text(x, y, texto, {
            fontSize: size + 'px', fill: color, fontFamily: 'verdana, arial, sans-serif', fontStyle: 'bold'
        });

        this.marcador.setDepth(Settings.depth.marcadores);

        console.log(this.marcador);
    }

    update(txt, valor) {

        this.marcador.setText(`${txt}${valor}`);
    }

    get() {
        return this.marcador;
    }
}
