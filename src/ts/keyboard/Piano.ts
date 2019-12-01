import {Keyboard} from "./Keyboard";
import { Chord } from "../music-theory/Chord";

class Piano{
    private _keyboardInterface: Keyboard;
    public onKeyDown: Function;
    public onKeyUp: any;
    public currChord: Chord;

    constructor(container: Element){
        this.currChord = new Chord();

        // The piano keyboard interface
        this._keyboardInterface = new Keyboard(container);
        this._keyboardInterface.onKeyDown = this.keyDown.bind(this);    // Trigger the callback event after clicking a key
        this._keyboardInterface.onKeyUp = this.keyUp.bind(this);

        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();

        // Callback events
        this.onKeyDown = function(){};
        this.onKeyUp = function(){};

        this._setChord(48);
    };

    /**
     * Resize the keyboard according to the window's width
     * @private
     */
    _resize(){
        const keyWidth = 27;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 1); // Octave not less than 2
        octaves = Math.min(octaves, 4); // Octave not greater than 7
        this._keyboardInterface.resize(36, octaves);  // Populate keys from G2
    }

    /**
     * Set the chord after a key is down
     * @param keyNum
     */
    public keyDown(keyNum: number){
        this._setChord(keyNum);
    }

    /**
     * Key the root note, set the inversion to 0, and update the chord type and family
     * @param type
     * @param family
     */
    public setChordType(type: string, family: string){
        this.currChord.type = type;
        this.currChord.family = family;
        this.currChord.inversionNum = 0;
        this._setChord(this.currChord.rootKeyNum, false);
    }

    /**
     * Get the chord based on the root note, highlight the keys on the keyboard. and play the sound
     * @param keyNum
     * @param clicked
     * @private
     */
    _setChord(keyNum: number, clicked=true){
        this.currChord.rootKeyNum = keyNum;  // Update root note
        const notes = this.currChord.getNotes();

        console.log(`Set the chord to ${notes}`);
        this._keyboardInterface.highlight(notes);
        this.onKeyDown(notes, clicked);
    }

    /**
     * Release the sound
     */
    keyUp(){
        const chord = this.currChord.getNotes();
        this.onKeyUp(chord);
    }
}

export {Piano}
