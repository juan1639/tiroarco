import { play_sonidos } from "../functions/functions.js";

// ==================================================================================
export class BotonNuevaPartida {

  // --------------------------------------------------------
  constructor(scene) {
    this.relatedScene = scene;
  }

  create(siguienteScene, gameover) {

    // this.sonidoMenuSelect = this.relatedScene.sound.add('moneda-mario');

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const botonCondicional = 'boton-nueva-partida';

    let posY = 1.5;
    if (siguienteScene === 'game') posY = 1.25;
    if (gameover) posY = 3;

    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / posY), botonCondicional).setInteractive();
    this.boton.setScale(0.6).setAngle(1).setDepth(30);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.7);
    });

    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.6);
    });

    this.boton.on('pointerdown', (e) => {

      // play_sonidos(this.sonidoMenuSelect, false, 0.9);
      this.relatedScene.scene.start(siguienteScene);
      console.log(e);
    });

    this.relatedScene.tweens.add({
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 2000,
      duration: 3000,
      repeat: -1
    });
  }

  get() {
    return this.boton;
  }
}

// ==================================================================================
export class BotonFullScreen {

  // --------------------------------------------------------
  constructor(scene, direccion) {
    this.relatedScene = scene;
    this.direccion = direccion;
  }

  create() {

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;

    this.boton = this.relatedScene.add.image(this.direccion.x, this.direccion.y, this.direccion.id).setInteractive();
    this.boton.setScale(this.direccion.scX, this.direccion.scY);
    this.boton.setAngle(this.direccion.ang).setFrame(0).setDepth(50);
    this.boton.setX(this.direccion.x).setY(this.direccion.y);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(this.direccion.scX + 0.1, this.direccion.scY + 0.1);
    });
    
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(this.direccion.scX, this.direccion.scY);
    });

    this.boton.on('pointerdown', () => {
      if (!this.relatedScene.scale.isFullscreen) {
        this.relatedScene.scale.startFullscreen();
      } else {
        this.relatedScene.scale.stopFullscreen();
      }
    });
  }
}
