import {Keyboard} from "./Keyboard";
import { Chord } from "../Chord";

class Piano{
    _container: Element;
    _keyboardInterface: Keyboard;
    onNotes: any;

    constructor(container: Element){
        this._container = container;

        // The piano keyboard interface
        this._keyboardInterface = new Keyboard(container);
        this._keyboardInterface.onKeyDown = this.keyDown.bind(this);    // Trigger the callback event after clicking a key

        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();

        // Callback events
        this.onNotes = function(){};
    };

    _resize(){
        const keyWidth = 27;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 2); // Octave not less than 2
        octaves = Math.min(octaves, 7); // Octave not greater than 7
        this._keyboardInterface.resize(31, octaves);  // Populate keys
    }

    public keyDown(keyNum: number){
        this._setChord(keyNum);
    }

    _setChord(keyNum: number){
        const chord = Chord.getChordList(keyNum);
        console.log(`Set the chord to ${chord}`);
        this._keyboardInterface.highlight(chord);
        this.onNotes(chord);
    }

    keyUp(keyNum: number){
        this._keyboardInterface.keyUp(keyNum);
    }
}

export {Piano}
