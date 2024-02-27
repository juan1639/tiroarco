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
        this.jugador.setVisible(false).setFrame(11).setDepth(Settings.depth.jugador);

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

// ===========================================================================
export class JugadorAnima {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.jugadoranima = this.relatedScene.physics.add.sprite(
            this.relatedScene.diana.get().getChildren()[0].x - 100,
            this.relatedScene.sys.game.config.height - Settings.jugador.offSetY,
            'jugador'
        );

        this.jugadoranima.setCollideWorldBounds(true);
        this.jugadoranima.setFrame(10).setFlipX(true).setDepth(Settings.depth.jugador);
        this.jugadoranima.setVelocityX(-200);

        this.relatedScene.anims.create({
            key: 'jugador-anima-inicial',
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {frames: [9, 10]}),
            frameRate: 10,
            repeat: -1
        });

        this.jugadoranima.anims.play('jugador-anima-inicial');

        console.log(this.jugadoranima);
    }

    update() {

        if (this.jugadoranima.x <= this.relatedScene.sys.game.config.width / Settings.jugador.offSetX) {
            Settings.setAnimaInicial(false);
            this.jugadoranima.destroy();

            this.relatedScene.jugador.get().setVisible(true);
            this.relatedScene.arco.get().setVisible(true);
            this.relatedScene.flecha.get().getChildren()[0].setVisible(true);
            
            this.relatedScene.cameras.main.startFollow(
                this.relatedScene.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]
            );
        }
    }

    get() {
        return this.jugadoranima;
    }
}
