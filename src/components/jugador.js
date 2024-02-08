
// =========================================================================
export class Jugador {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const posX = this.relatedScene.sys.game.config.width;
        this.jugador = this.relatedScene.physics.add.sprite(posX / 10, 0, 'jugador');

        this.jugador.setCollideWorldBounds(true);
        this.jugador.setFrame(11).setDepth(30);

        console.log(this.jugador);
    }

    update() {

        
    }
    
    get() {
        return this.jugador;
    }
}
