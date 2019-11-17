import {Keyboard} from "./Keyboard";
import {EventEmitter} from "events"

class Piano extends EventEmitter{
    _container: Element;
    _keyboardInterface: Keyboard;

    constructor(container: Element){
        super();
        this._container = container;

        // The piano keyboard interface
        this._keyboardInterface = new Keyboard(container);
        this._keyboardInterface.on("keyDown", (keyNum: number) => {
            this.keyDown(keyNum);
            this._emitKeyDown(keyNum);
        });
        this._keyboardInterface.on("keyUp", (keyNum: number) => {
            this.keyUp(keyNum);
            this._emitKeyUp(keyNum);
        });

        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();
    };

    _resize(){
        const keyWidth = 27;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 2); // Octave not less than 2
        octaves = Math.min(octaves, 7); // Octave not greater than 7
        this._keyboardInterface.resize(31, octaves);  // Populate keys
    }

    public keyDown(keyNum: number){
        this._keyboardInterface.keyDown(keyNum);
    }

    _emitKeyDown(keyNum: number){
        this.emit("keyDown", keyNum);
    }

    keyUp(keyNum: number){
        this._keyboardInterface.keyUp(keyNum);
    }

    _emitKeyUp(keyNum: number){
        this.emit("keyUp", keyNum);
    }
}

export {Piano}
