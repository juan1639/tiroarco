
function dibuja_rectangulos(scene, args) {

  const {x, y, ancho, alto, pad} = args;
  
  scene.add.rectangle(x - pad, y - pad, ancho + pad * 2, alto + pad * 2, 0x111111)
    .setStrokeStyle(3, 0xff9910).setOrigin(0, 0);
}

// =================================================================================
function centrar_txt(texto, anchoScreen) {
  
  console.log(texto.width);
  return Math.floor(anchoScreen / 2 - texto.width / 2);
}

// =================================================================================
function play_sonidos(id, loop, volumen) {

  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  dibuja_rectangulos,
  centrar_txt,
  play_sonidos
};
