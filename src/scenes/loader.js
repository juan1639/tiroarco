
export function loader(scene) {

  // scene.load.json('settings', '../src/json/settings.json');

  scene.load.image('fondo-scroll', './src/img/fondo-cielo3200x600.png');

  scene.load.image('boton-nueva-partida', './src/img/boton-start.png');
  scene.load.spritesheet('boton-fullscreen', './src/img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
  
  scene.load.image('tile-suelo', './src/img/tile-suelo.png');
  scene.load.image('barra-fuerza', './src/img/barra-energia.png');

  // scene.load.image('arco', './src/img/arco1.png');
  scene.load.image('arco', './src/img/arco-v2.png');
  // scene.load.image('flecha', './src/img/flecha.png');
  scene.load.image('flecha', './src/img/flecha-v2.png');
  scene.load.image('flecha-c', './src/img/flecha-c.png');
  
  scene.load.spritesheet('jugador', './src/img/Ssheet_enemigo.png', {frameWidth: 80, frameHeight: 110});

  // -------------------------------------------------------------------------
  //  Archivos de audio
  // -------------------------------------------------------------------------

  /* scene.load.audio('musica-fondo', './src/audio/8-bit-arcade-1.mp3');
  scene.load.audio('dieT1', './src/audio/dieThrow1.ogg');
  scene.load.audio('dieT2', './src/audio/dieThrow2.ogg');
  scene.load.audio('moneda-mario', './src/audio/p-ping.mp3');
  scene.load.audio('gameover', './src/audio/gameover.mp3'); */
}
