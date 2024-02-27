
export class Settings {

    static screen = {
        width: 800,
        height: 600,
        numberWidths: 4,
        numberHeights: 1
    };

    static puntos = 0;
    static hi = 550;

    static jugador = {
        offSetX: 10,
        offSetY: 95
    };

    static flecha = {
        nroFlechas: 10,
        lanzamientoNro: 0,
        changeCam: false,
        iniX: -100,
        iniY: 200,
        offSetX: 12,
        offSetY: 80
    };

    static depth = {
        fondoScroll: 0,
        tileSuelo: 10,
        jugador: 20,
        arco: 30,
        flecha: 35,
        marcadores: 50,
        textos: 60
    };

    static cameraScores = {
        x: 0,
        y: 0,
        ancho: 800,
        alto: 45,
        scrollX: 0,
        scrollY: -50
    };

    // -----------------------------------------------
    static getScreen() {
        return Settings.screen;
    }

    static getPuntos() {
        return Settings.puntos;
    }

    static getRecord() {
        return Settings.hi;
    }

    static getCameraScores() {
        return Settings.cameraScores;
    }

    // -----------------------------------------------
    static setPuntos(ptos) {
        Settings.puntos = ptos;
    }

    static setRecord(hiScore) {
        Settings.hi = hiScore;
    }

    static setCameraScores(x, y, ancho, alto, scrollX, scrollY) {
        Settings.cameraScores.x = x;
        Settings.cameraScores.y = y;
        Settings.cameraScores.ancho = ancho;
        Settings.cameraScores.alto = alto;
        Settings.cameraScores.scrollX = scrollX;
        Settings.cameraScores.scrollY = scrollY;
    }
}
