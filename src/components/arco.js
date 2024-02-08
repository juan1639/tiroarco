
// =========================================================================
export class Arco {

    // -----------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(x, y) {

        this.arco = this.relatedScene.physics.add.sprite(x, y, 'arco');

        this.arco.setScale(1, 0.9).setDepth(20);
        this.arco.body.setAllowGravity(false);

        console.log(this.arco);
    }

    update(x, y) {

        const updateX = x + 25;
        const updateY = y + 12;

        this.arco.setX(updateX).setY(updateY);
    }


    get() {
        return this.arco;
    }
}

// =========================================================================
export class Flecha {

    // -----------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(x, y) {

        this.flecha = this.relatedScene.physics.add.sprite(x, y, 'flecha');

        this.flecha.setScale(1, 1).setDepth(35).setVelocityX(100);
        this.flecha.body.setAllowGravity(false);

        console.log(this.flecha);
    }

    update(x, y) {

        if (this.relatedScene.jugador.get().body.touching.down) return;

        const updateX = x + 25;
        const updateY = y + 12;

        this.flecha.setX(updateX).setY(updateY);
    }
    
    get() {
        return this.flecha;
    }
}

// =========================================================================
export class FlechaC {

    // -----------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(x, y) {

        this.flechac = this.relatedScene.physics.add.sprite(x, y, 'flecha-c');

        this.flechac.setScale(1, 1.4).setDepth(32).setVelocityX(100);
        this.flechac.body.setAllowGravity(false);

        console.log(this.flechac);
    }

    update(x, y) {

        if (this.relatedScene.jugador.get().body.touching.down) return;

        const updateX = x - 5;
        const updateY = y + 12;

        this.flechac.setX(updateX).setY(updateY);
    }


    get() {
        return this.flechac;
    }
}
