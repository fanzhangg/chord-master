import {Keyboard} from "./Keyboard";
import {Chord} from "../music-theory/Chord";
import {Note} from "../music-theory/Note";

class Piano {
    private _keyboardInterface: Keyboard;
    public onKeyDown: Function;
    public onKeyUp: Function;
    public onSetChord: Function;
    public currChord: Chord;
    private _container: Element;

    constructor(container: Element) {
        this.currChord = new Chord();
        this._container = container;

        // The piano keyboard interface
        this._keyboardInterface = new Keyboard(container);
        this._keyboardInterface.onKeyDown = this.keyDown.bind(this);    // Trigger the callback event after clicking a key
        this._keyboardInterface.onKeyUp = this.keyUp.bind(this);

        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();

        // Callback events
        this.onKeyDown = function () {
        };
        this.onKeyUp = function () {
        };
        this.onSetChord = function () {
        };

        this.setChord(new Chord());
    };

    /**
     * Resize the keyboard according to the window's width
     * @private
     */
    _resize() {
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
    public keyDown(keyNum: number) {
        if (this._container.classList.contains("disabled")){
            return;
        }
        this.setRootKeyNum(keyNum);
        this.onKeyDown(this.currChord);
    }

    /**
     * Key the root note, set the inversion to 0, and setChord the chord type and family
     * @param type
     * @param family
     */
    public setChordType(family: string, type: string) {
        this.currChord.type = type;
        this.currChord.family = family;
        this.currChord.inversionNum = 0;    // Reset inversion number to 0
        this.setChord(this.currChord);
    }

    /**
     * Set the inversion of the chord, setChord the highlight and play the sound
     * @param inversionNum
     */
    public setInversion(inversionNum: number) {
        this.currChord.inversionNum = inversionNum; // Update inversion number
        this.setChord(this.currChord);
    }

    /**
     * Get the chord based on the root note, highlight the keys in the chord and the root note on the keyboard. and play the sound
     * @public
     * @param chord
     */
    public setChord(chord: Chord) {
        this.currChord = chord;  // Update current chord
        const notes = this.currChord.getNotes();

        // Highlight the chord
        console.log(`Set the chord to ${notes}`);

        // Highlight the root note if the inversion is not None
        let rootNote = null;
        if (this.currChord.inversionNum > 0){
            const rootKeyNum = this.currChord.rootKeyNum;
            rootNote = Note.toNoteName(rootKeyNum);
        }

        this._keyboardInterface.highlight(notes, rootNote);

        this.onSetChord(chord);
    }

    setRootKeyNum(keyNum: number) {
        this.currChord.rootKeyNum = keyNum;
        const notes = this.currChord.getNotes();

        // Highlight the root note if the inversion is not None
        let rootNote = null;
        if (this.currChord.inversionNum > 0){
            const rootKeyNum = this.currChord.rootKeyNum;
            rootNote = Note.toNoteName(rootKeyNum);
        }

        this._keyboardInterface.highlight(notes, rootNote);
        console.log(`Set the root key num to ${this.currChord.rootKeyNum}`);
    }

    /**
     * Release the sound
     */
    keyUp() {
        if (this._container.classList.contains("disabled")){
            return;
        }
        const chord = this.currChord.getNotes();
        this.onKeyUp(chord);
    }

    /**
     * Disable changing the root note on the piano
     */
    public disable(){
        this._container.classList.add("disabled");
    }

    /**
     * Enable changing the root note on the piano
     */
    public enable(){
        this._container.classList.remove("disabled");
    }
}

export {Piano}
