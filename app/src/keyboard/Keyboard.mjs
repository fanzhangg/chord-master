import {KeyboardElement} from "./Element.mjs";

class Keyboard {
    constructor(container){
        this._container = container;
        // The piano keyboard interface
        this._keyboardInterface = new KeyboardElement(container, 48, 2);
        this._resize()
    }

    _resize(){
        const keyWidth = 24;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 2);
        octaves = Math.min(octaves, 7);
        let baseNote = 48;
        if (octaves > 5){
            baseNote -= (octaves - 5) * 12;
        }
        this._keyboardInterface.resize(baseNote, octaves);  // Populate keys
    }
}

export {Keyboard}
