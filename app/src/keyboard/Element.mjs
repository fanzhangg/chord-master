const offsets = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];

const chords = {
    "major": [0, 4, 7],
    "minor": [0, 3, 7],
    "diminished": [0, 3, 6]
};

class KeyboardElement{
    constructor(container, lowest=36, octaves=4){
        this._container = document.createElement('div');
        this._container.id = 'keyboard';
        container.setAttribute('touch-action', 'none');
        container.appendChild(this._container);

        this._keys = {};
        this.resize(lowest, octaves);

        this._prevKeys = [];
    }

    resize(lowest, octaves){
        this._keys = {};
        // clear the previous ones
        this._container.innerHTML = '';
        const keyWidth = (1 / 7) / octaves;
        for (let i = lowest; i < lowest + octaves * 12; i++){
            let key = document.createElement('div');    // Add a div for a key
            key.classList.add('key');
            let isSharp = ([1, 3, 6, 8, 10].indexOf(i % 12) !== -1);    // A key is sharp if the note it represents is a sharp note
            if (isSharp){
                key.classList.add('black');
            } else {
                key.classList.add('white');
            }

            // Add the note on the key if it is C
            const note = this._getNote(i);
            if (note.search(/C[^#]/) === 0){  // Starts with C, not C#
                const noteStr = document.createElement("p");
                noteStr.id = 'noteStr';
                noteStr.innerText = note;
                key.appendChild(noteStr);
            }

            // Add the key binding to the piano key
            const keyStr = document.createElement("p");
            keyStr.id = 'keyStr';
            keyStr.innerText = "1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".charAt(i);
            key.appendChild(keyStr);

            let noteOctave = Math.floor(i / 12) - Math.floor(lowest / 12);
            let offset = offsets[i % 12] + noteOctave * 7;
            if (Number.isInteger(offset) === true){  // Is white key
                key.style.width = `${keyWidth * 100}%`;
                key.style.left = `${offset * keyWidth * 100}%`;
            } else {    // is black key
                key.style.width = `${keyWidth * 100 / 2}%`; // half width
                key.style.left = `${offset * keyWidth * 100 + keyWidth * 100 / 4}%`;    // + 1/4 width
            }

            key.id = i.toString();
            key.setAttribute('touch-action', 'none');

            this._container.appendChild(key);   // Add each key as the child of 'keyboard' class
            this._bindKeyEvents(key);   // Bind event listeners
            this._keys[i] = key;    // Add key to the keys list
        }
    }

    _bindKeyEvents(key){

        key.addEventListener('pointerup', (e) => {
            // Get the chord type
            const chordTypeFrm = document.getElementById("chord_type_frm");
            let chordType = "major";
            for (let i = 0; i < chordTypeFrm.length; i++) {
                if (chordTypeFrm[i].checked) {
                    chordType = chordTypeFrm[i].value;
                }
            }

            // Change the previous keys' color back to the original color
            for (let i = 0; i < this._prevKeys.length; i++) {
                const prevDiv = document.getElementById(this._prevKeys[i]);
                prevDiv.style.removeProperty("background-color");
            }

            const chordSteps = chords[chordType];   // Get half steps of the chord

            let chordStr = "";

            // Change color of keys of the chord
            for (let i = 0; i < chordSteps.length; i ++) {
                const noteId = parseInt(e.target.id) + chordSteps[i];
                chordStr += ` ${this._getNote(noteId)}`;
                const noteDiv = document.getElementById(`${noteId}`);

                if (noteDiv !== null) { // noteDiv in bound
                    noteDiv.style.backgroundColor = "#f7d794";  // Change the color to yellow
                    this._prevKeys.push(noteId);    // Save the key as a previous key
                } else {
                    console.log(`${noteId} out of bound`);
                }
            }

            document.getElementById("chord").innerText = chordStr;  // Display the notes in the chord in 'chord' p
        })
    }

    /**
     * Get the scientific notation of note based on id
     * @param id: Integer
     * @private
     * @return {String}
     */
    _getNote(id){
        let note = id % 12;
        const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        note = chromatic[note];
        const octave = Math.floor(id / 12) + 2;
        return `${note}${octave}`;
    }
}

export {KeyboardElement};
