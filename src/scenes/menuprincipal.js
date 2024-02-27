import { loader } from './loader.js';
import { Textos } from '../components/textos.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { centrar_txt, play_sonidos } from '../functions/functions.js';
import { Settings } from './settings.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';

// =================================================================================
export class MenuPrincipal extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'menuprincipal' });
    }

    init() {

        Settings.setPuntos(0);

        this.fondoscroll = new FondoScroll(this);
        this.botoninicio = new BotonNuevaPartida(this);
        this.txt = new Textos(this);
    } 
    
    preload() {
        
        const txt = this.add.text(
            Math.floor(this.sys.game.config.width / 3), Math.floor(this.sys.game.config.height / 2),
            ' Cargando...', {
                fontSize: '50px',
                fill: '#ffa',
                fontFamily: 'verdana, arial, sans-serif'
            }
        );

        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffff00);

        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
        
        loader(this);
    }
    
    create() {
        
        // this.sonidoMenuSelect = this.sound.add('moneda-mario');

        const aparecerBoton = 100; // 1900

        this.fondoscroll.create();
        
        // -----------------------------------------------------------
        const left = Math.floor(this.sys.game.config.width / 5.2);
        const top = -200;

        this.txt.create({
            x: left, y: top, texto: ' Tiro con Arco ',
            size: 100, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
            fillShadow: true, fll: '#e81', family: 'verdana, arial, sans-serif',
            screenWidth: this.sys.game.config.width, multip: 1
        });
        
        this.add.timeline([
            {
                at: aparecerBoton,
                run: () => {
                    this.botoninicio.create('prenivel', false);
                }
            }
        ]).play();

        // play_sonidos(this.sonidoMenuSelect, false, 0.7);

        console.log(this.txt);
    }
}
