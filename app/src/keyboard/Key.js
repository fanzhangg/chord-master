/*
A key component in the piano keyboard
 */
import {ChordManager} from "../ChordManager";

class Key {
    constructor(id){
        this.id = id;   // The note's offset from C1
        this._renderView();
    }

    _renderView(){
        let key = document.createElement("div");
        key.classList.add("key");
        key.setAttribute("data-node", `${this.id}`);
        let isSharp = ([1, 3, 6, 8, 10].indexOf(this.id % 12) !== -1);
        if (isSharp === true){
            key.classList.add("black");
        } else {
            key.classList.add("white");
        }
    }

    _renderNoteView(){
        const note = this.getNote();

    }

    _getNote(){
        let note = this.id % 12;
        const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        note = chromatic[note];
        const octave = Math.floor(id / 12) + 1;
        return `${note}${octave}`;
    }
}
