const chords = {
    "triad": {  // chord with 3 notes
        "major triad": [0, 4, 7],
        "minor triad": [0, 3, 7],
        "augmented triad": [0, 4, 8],
        "diminished triad": [0, 3, 6]
    },
    "seventh": {
        "diminished seventh": [0, 3, 6, 9],
        "half diminished seventh": [0, 3, 6, 8],
        "minor seventh": [0, 3, 7, 8]
    }
};

class Note{
    /**
     * Get the scientific notation of note based on id
     * @param id: Integer
     * @private
     * @return {String}
     */
    static getNote(id){
        let note = id % 12;
        const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        note = chromatic[note];
        const octave = Math.floor(id / 12) + 1;
        return `${note}${octave}`;
    }

    static get chordNames(){
        return Object.keys(chords);
    }

    static get chords(){
        return chords
    }

    /**
     * Get the key on the keyboard to trigger the sound of the id
     * @param id
     */
    static getKey(id) {
        return "1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".charAt(id)
    }

    static getChordSteps(){
        // Get the chord type
        const chordType = document.querySelector('input[name="chordTypeButton"]:checked').value;
        return chords[chordType];
    }

    /**
     * Get the list of notes in the selected chord
     * @param  id: String
     * @returns {Array}
     */
    static getChordList(id){
        const steps = this.curSteps;
        let notes = [];
        for (let i = 0; i < steps.length; i++){
            const curId = parseInt(id) + steps[i];
            const curNote = Note.getNote(`${curId}`);
            notes.push(curNote);
        }
        return notes
    }

    /**
     * Convert a note string to a html of the note, make '#' as a superscript
     * @param noteStr: String
     * @returns {String}
     */
    static toNoteHTML(noteStr){
        let noteHTML = "";
        for (let j = 0; j < noteStr.length; j++){
            if (noteStr[j] === "#"){
                noteHTML += "<sup>#</sup>"
            } else {
                noteHTML += noteStr[j]
            }
        }
        return noteHTML
    }
}

Note.curSteps = [0];

export {Note}
