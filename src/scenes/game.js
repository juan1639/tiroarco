// =========================================================================================
//  T i r o  c o n  A r c o
// 
// -----------------------------------------------------------------------------------------
import { FondoScroll } from '../components/fondoscroll.js';
import { BarraFuerza } from '../components/barra-fuerza.js';
import { Jugador } from '../components/jugador.js';
import { Arco, Flecha } from '../components/arco.js';
import { Diana } from '../components/diana.js';
import { Marcador } from '../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida, BotonFullScreen } from '../components/boton-nuevapartida.js';
import { play_sonidos } from '../functions/functions.js';
import { Settings } from './settings.js';
import { TileSuelo } from '../components/tile-suelo.js';

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {

    this.fondoscroll = new FondoScroll(this);
    this.tilesuelo = new TileSuelo(this);
    this.barrafuerza = new BarraFuerza(this);
    this.jugador = new Jugador(this);
    this.arco = new Arco(this);
    this.flecha = new Flecha(this);
    this.diana = new Diana(this);

    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: -50, size: 35, txt: ' Puntos: ', color: '#fff', id: 0
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2), y: -50, size: 35, txt: ' Record: ', color: '#fff', id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width / 1.1), y: -25,
      ang: 0, scX: 0.8, scY: 0.6 
    });

    this.txt = new Textos(this);
    this.botoninicio = new BotonNuevaPartida(this);
  }

  preload() {}

  create() {

    this.sonidos_set();
    this.set_camerasMain();
    this.set_cameras_marcadores();

    this.fondoscroll.create();
    this.tilesuelo.create();
    this.barrafuerza.create();
    this.jugador.create();
    this.arco.create(this.jugador.get().x, this.jugador.get().y);
    this.flecha.create();
    this.diana.create();

    this.marcadorPtos.create();
    this.marcadorHi.create();
    // this.jugadorSV.create();
    this.botonfullscreen.create();

    this.mouse_showXY = {
      create: this.add.text(this.jugador.get().x, this.jugador.get().y - 100, ' ', { fill: '#111' }),
      show_mouseXY: true
    }

    this.cameras.main.startFollow(this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]);

    this.crear_colliders();
  }
  
  update() {

    // this.pointer_showXY(this.mouse_showXY);
    this.jugador.update();
    this.arco.update(this.jugador.get().x, this.jugador.get().y);
    this.flecha.update();
  }

  sonidos_set() {

    /* this.sonidoMusicaFondo = this.sound.add('musica-fondo');
    if (!this.sonidoMusicaFondo.isPlaying) play_sonidos(this.sonidoMusicaFondo, true, 0.7);

    this.sonidoDieT1 = this.sound.add('dieT1');
    this.sonidoDieT2 = this.sound.add('dieT2');
    this.sonidoMonedaMario = this.sound.add('moneda-mario');
    this.sonidoGameOver = this.sound.add('gameover'); */
  }
  
  set_camerasMain() {

    const { numberWidths, numberHeights } = Settings.getScreen();

    this.cameras.main.setBounds(
      -this.sys.game.config.width, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    this.physics.world.setBounds(
      -this.sys.game.config.width, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    console.log(this.physics.world);
  }

  set_cameras_marcadores() {

    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraScores();
    
    this.mapa_scores = this.cameras.add(x, y, ancho, alto).setZoom(0.9).setName('view-scores').setAlpha(0.9).setOrigin(0, 0);
    this.mapa_scores.scrollX = scrollX;
    this.mapa_scores.scrollY = scrollY;
    // console.log(this.mapa_scores);
  }

  nextFlecha_cambioCamera(flecha, puntuacion) {

    if (flecha.getData('estado') === 'clavada') return;

    console.log(puntuacion);

    flecha.setData('estado', 'clavada');
    flecha.setVelocityX(0).setVelocityY(0);
    flecha.body.setAllowGravity(false);

    this.jugador.get().setY(this.sys.game.config.height - Settings.jugador.offSetY);
    this.jugador.get().setData('fin-pulsacion', false);

    Settings.flecha.lanzamientoNro ++;
    console.log(Settings.flecha.lanzamientoNro);

    this.barrafuerza.get().setScale(0.1, 1);
    this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].setData('estado', 'pre');
    this.cameras.main.startFollow(this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]);
  }

  crear_colliders() {

    this.physics.add.collider(this.jugador.get(), this.tilesuelo.get());

    this.physics.add.collider(
      this.flecha.get(), this.tilesuelo.get(), (flecha, suelo) => this.nextFlecha_cambioCamera(suelo, 0)
    );

    this.physics.add.collider(
      this.flecha.get(), this.diana.get(), (flecha, diana) => this.nextFlecha_cambioCamera(flecha, diana.getData('index'))
    );
  }

  texto_preparado() {

    const left = Math.floor(this.sys.game.config.width / 2.2);
    const top = Math.floor(this.sys.game.config.height / 2);

    this.txt.create({
        x: left, y: top, texto: ' Preparado... ',
        size: 30, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
        fillShadow: true, fll: '#3a1', family: 'verdana, arial, sans-serif',
        screenWidth: this.sys.game.config.width, multip: 1
    });

    setTimeout(() => this.txt.get().destroy(), 1900);
  }

  pointer_showXY({create, show_mouseXY}) {
    
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
