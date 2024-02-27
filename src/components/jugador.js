import { Settings } from "../scenes/settings.js";

export class Jugador {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.jugador = this.relatedScene.physics.add.sprite(
            this.relatedScene.sys.game.config.width / Settings.jugador.offSetX,
            this.relatedScene.sys.game.config.height - Settings.jugador.offSetY,
            'jugador'
        );

        this.jugador.setData('new-try', true);

        this.jugador.setCollideWorldBounds(true);
        this.jugador.setFrame(11).setDepth(Settings.depth.jugador);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update() {

        if (this.jugador.body.touching.down &&
            (this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].getData('estado') === 'pre') &&
            this.controles.space.isDown
        ) {

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]
                .setData('estado', 'lanzando');

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]
                .setVelocityX(700).setVelocityY(-700);

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].body
                .setAllowGravity(true);
        }
    }
    
    get() {
        return this.jugador;
    }
}
