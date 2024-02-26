
export class Jugador {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const posX = this.relatedScene.sys.game.config.width;
        this.jugador = this.relatedScene.physics.add.sprite(
            posX / 10, this.relatedScene.sys.game.config.height - 120, 'jugador'
        );

        this.jugador.setData('new-try', true);

        this.jugador.setCollideWorldBounds(true);
        this.jugador.setFrame(11).setDepth(30);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update() {

        if (this.jugador.body.touching.down && this.relatedScene.faseLanzamiento.pre && this.controles.space.isDown) {

            this.relatedScene.faseLanzamiento.pre = false;
            this.relatedScene.faseLanzamiento.lanzando = true;
            this.relatedScene.flecha.get().setVelocityX(700).setVelocityY(-700);
            this.relatedScene.flecha.get().body.setAllowGravity(true);
        }
    }
    
    get() {
        return this.jugador;
    }
}
