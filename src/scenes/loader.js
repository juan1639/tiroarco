
export function loader(scene) {

  // scene.load.json('settings', '../src/json/settings.json');

  scene.load.image('fondo-scroll', './src/img/fondo-cielo3200x600.png');

  scene.load.image('boton-nueva-partida', './src/img/boton-start.png');
  scene.load.spritesheet('boton-fullscreen', './src/img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
  scene.load.image('archery-img', './src/img/archeryImg.png');

  scene.load.image('tile-suelo', './src/img/tile-suelo.png');
  scene.load.image('barra-fuerza', './src/img/barra-energia.png');
  scene.load.image('diana', './src/img/diana-tiroArco.png');

  // scene.load.image('arco', './src/img/arco1.png');
  scene.load.image('arco', './src/img/arco-v2.png');
  // scene.load.image('flecha', './src/img/flecha.png');
  scene.load.image('flecha', './src/img/flecha-v2.png');
  scene.load.image('flecha-c', './src/img/flecha-c.png');
  
  scene.load.spritesheet('jugador', './src/img/Ssheet_enemigo.png', {frameWidth: 80, frameHeight: 110});

  // -------------------------------------------------------------------------
  //  Archivos de audio
  // -------------------------------------------------------------------------
  scene.load.audio('mario-tuberias', './src/audio/mario-tuberias.mp3');
  scene.load.audio('aplausos-birdie', './src/audio/aplausosbirdie.mp3');
  scene.load.audio('aplausos-eagle', './src/audio/aplausoseagle.mp3');
  scene.load.audio('arrow1', './src/audio/arrow1.mp3');
  scene.load.audio('arrow2', './src/audio/arrow2.mp3');
  scene.load.audio('abucheo', './src/audio/boooh.mp3');
}
