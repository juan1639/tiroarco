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

        this.jugador.setData('fin-pulsacion', false);
        this.jugador.setData('ini-pulsacion', false);
        this.jugador.setData('pow', 0.1);
        this.jugador.setData('inc-pow', 0.05);
        this.jugador.setData('multiplicador', 300);

        this.jugador.setCollideWorldBounds(true);
        this.jugador.setFrame(11).setDepth(Settings.depth.jugador);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update() {

        this.incrementando_fuerza_pulsando();
        this.pulsacion_inicial();
        this.soltar_lanzarFlecha();
    }

    incrementando_fuerza_pulsando() {

        if (this.jugador.getData('ini-pulsacion') && !this.jugador.getData('fin-pulsacion')) {

            console.log('...sum');
            this.jugador.setData('pow', this.jugador.getData('pow') + this.jugador.getData('inc-pow'));
            this.relatedScene.barrafuerza.get().setScale(this.jugador.getData('pow'), 1);
        }
    }

    pulsacion_inicial() {

        if (this.jugador.body.touching.down &&
            !this.jugador.getData('fin-pulsacion') &&
            !this.jugador.getData('ini-pulsacion') &&
            (this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].getData('estado') === 'pre') &&
            this.controles.space.isDown
        ) {

            console.log('pulsando...');
            this.jugador.setData('ini-pulsacion', true);
        }
    }

    soltar_lanzarFlecha() {

        if (this.jugador.body.touching.down &&
            !this.jugador.getData('fin-pulsacion') &&
            this.jugador.getData('ini-pulsacion') &&
            (this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].getData('estado') === 'pre') &&
            this.controles.space.isUp
        ) {
            this.jugador.setData('fin-pulsacion', true);
            this.jugador.setData('ini-pulsacion', false);

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]
                .setData('estado', 'lanzando');

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]
                .setVelocityX(this.jugador.getData('pow') * this.jugador.getData('multiplicador'))
                .setVelocityY(-this.jugador.getData('pow') * (this.jugador.getData('multiplicador') - 50));

            this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].body
                .setAllowGravity(true);
            
            console.log('pulsado!');
            console.log(this.jugador.getData('pow') * this.jugador.getData('multiplicador'));

            this.jugador.setData('pow', 0.1);
        }
    }

    get() {
        return this.jugador;
    }
}
