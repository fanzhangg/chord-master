import {Note} from "../note";
import {Chord} from "../chord";
import {EventEmitter} from "events";

const offsets = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];

class Keyboard extends EventEmitter{
    _container: HTMLElement;
    _keys: Array<HTMLElement>;
    _prevKeys: Array<Element>;
    _chords: Array<Array<string>>;

    constructor(container: Element){
        super();
        this._container = document.createElement('div');
        this._container.id = 'keyboard';
        container.setAttribute('touch-action', 'none');
        container.appendChild(this._container);

        this._keys = [];
        this._prevKeys = [];

        this._chords = [];
    }

    resize(lowestKeyNum=0, octaves: number){
        this._container.innerHTML = ''; // Clear the previous ones
        const keyWidth = (1 / 7) / octaves;
        for (let keyNum = lowestKeyNum; keyNum < lowestKeyNum + octaves * 12; keyNum++){
            let key = document.createElement('div');    // Add a div for a key
            key.classList.add('key');
            let isSharp = ([1, 3, 6, 8, 10].indexOf(keyNum % 12) !== -1);    // A key is sharp if the note it represents is a sharp note
            if (isSharp){
                key.classList.add('black');
            } else {
                key.classList.add('white');
            }

            // Add the note on the key if it is C
            const noteName = Note.toNoteName(keyNum);
            const isC = keyNum % 12 === 0;
            if (isC){  // Starts with C, not C#
                const noteP = document.createElement("p");
                noteP.classList.add('note-name');
                noteP.dataset.noteName = noteName;
                noteP.dataset.keyNum = keyNum.toString();
                noteP.innerText = noteName;
                key.appendChild(noteP);
            }

            // calculate the position of the div
            let lowestOctave = Math.floor(lowestKeyNum / 12);
            let lowestOffset = offsets[lowestKeyNum % 12]  + lowestOctave * 7;

            let noteOctave = Math.floor(keyNum / 12);
            let offset = offsets[keyNum % 12]  + noteOctave * 7 - lowestOffset;

            // let lowestOctave = offsets[lowest % 12]  + noteOctave * 7;;
            if (Number.isInteger(offset) === true){  // Is white key
                key.style.width = `${keyWidth * 100}%`;
                key.style.left = `${offset * keyWidth * 100}%`;
            } else {    // is black key
                key.style.width = `${keyWidth * 100 / 2}%`; // half width
                key.style.left = `${offset * keyWidth * 100 + keyWidth * 100 / 4}%`;    // + 1/4 width
            }

            // Assign the html property to the div
            key.dataset.keyNum = keyNum.toString();
            key.dataset.noteName = noteName;
            key.setAttribute('touch-action', 'none');

            this._container.appendChild(key);   // Add each key as the child of 'keyboard' class
            this._bindKeyEvents(key);   // Bind event listeners
            this._keys[keyNum] = key;    // Add key to the keys list
        }
    }

    _bindKeyEvents(key: HTMLDivElement) {
        key.addEventListener('pointerdown', (e) => {
            const target = e.target as HTMLDivElement;
            const keyNum = parseInt(target.getAttribute("data-key-num") as string);
            this.emit("keyDown", keyNum);
        });

        key.addEventListener("pointerout", (e) => { // Release the key if the pointer moves out of the key div
            const target = e.target as HTMLDivElement;
            const keyNum = parseInt(target.getAttribute("data-key-num") as string);
            this.emit("keyUp", keyNum);
        });

        key.addEventListener("pointerup", (e) => {
            const target = e.target as HTMLDivElement;
            const keyNum = parseInt(target.getAttribute("data-key-num") as string);
            this.emit("keyUp", keyNum);
        });
    }


    /**
     * Show the chord by displaying the chord string and highlight the keys in the chord
     * @param keyNum of selected key
     * @public
     */
    public keyDown(keyNum: number){
        // Change the previous keys' color back to the original color
        this._prevKeys.forEach(function (key) {
            key.classList.remove("highlight");
        });

        this._prevKeys = [];    // Reset the prev keys

        Chord.getChordList(keyNum);    // Set the Half Steps

        const notes = Chord.notes;

        if (!notes){ // notes do not exists
            console.warn("Notes not specified. Cannot play the chord");
            return false;
        }

        for (const note of notes as Array<string>){
            const selectorNote = note.replace("#", "\\#");
            const key = document.querySelectorAll(`.key[data-note-name=${selectorNote}]`)[0];
            key.classList.add("highlight"); // Highlight the key
            this._prevKeys.push(key);
        }

        this._chords.push(notes);
        console.log(`Push the chord ${notes}`);
        return true;
    }

    public keyUp(keyNum: number){
        console.log(`${keyNum} released`);
        return
    }
}

export {Keyboard};
