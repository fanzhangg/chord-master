const chordFamilies = {
    "Triads": {  // chord with 3 notes
        "Major Triad": [0, 4, 7],
        "Minor Triad": [0, 3, 7],
        "Augmented Triad": [0, 4, 8],
        "Diminished Triad": [0, 3, 6]
    },
    "Sevenths": {   // triads with a 7th added on
        "Dominant Seventh": [0, 4, 7, 10],
        "Major Seventh": [0, 4, 7, 11], // C E G B
        "Minor Seventh": [0, 3, 7, 10],
        "Diminished Seventh": [0, 3, 6, 9], // C E♭ G♭ B♭♭
        "Half Diminished Seventh": [0, 3, 6, 10],
        "Augmented Seventh": [0, 4, 8, 10], // C E G♯ B♭
        "Augmented Major Seventh": [0, 4, 8, 11] // C E G♯ B
    },
    "Extended": {
        "Dominant Ninth": [0, 4, 7, 10, 14],    // C E G B♭ D
        "Dominant Thirteenth": [0, 4, 7, 10, 14, 16, 20] // C E G B♭ D F A
    },
    "Altered": {
        "Seventh Minor Ninth": [0, 4, 7, 10, 13],   // C E G B♭ D♭
        "Seventh Sharp Ninth": [0, 4, 7, 10, 15],  // C E G B♭ D♯
        "Seventh Augmented Eleventh": [0, 4, 7, 10, 14, 17],   // C E G B♭ D F♯
    }
};

const chordNameSheet = {
    //Triads
    "Single Note": "",
    "Major Triad": "",
    "Minor Triad": "m",
    "Augmented Triad": "aug",
    "Diminished Triad": "dim",
    //Sevenths
    "Dominant Seventh": "7",
    "Major Seventh": "maj7",
    "Minor Seventh": "min7",
    "Diminished Seventh": "dim7",
    "Half Diminished Seventh": "min7♭5",
    "Augmented Seventh": "aug7",
    "Augmented Major Seventh": "augM7",
    //Extended
    "Dominant Ninth": "9",
    "Dominant Thirtheenth": "13",
    //Altered
    "Seventh Minor Ninth": "7♭9",
    "Seventh Sharp Ninth": "7#9",
    "Seventh Augmented Eleventh": "7aug11"
};


class Chord{
    /**
     * Return the half steps of the chord from the root. [0] if no chord type is specified
     * @return {Array}
     */
    static getHalfSteps(){
        if (this.family === null){
            return [0]
        } else {
            return [...chordFamilies[this.family][this.type]];
        }
    }

    /**
     * Set the half steps of the chord from the root based on its type and inversion number
     */
    static setHalfSteps() {
        const halfSteps = this.getHalfSteps();
        if (Chord.family !== null) { // We have this condition to avoid the 1 note breaking the inversion.
            for (let i = 0; i < this.inversionNum; i++) {
                halfSteps[i] += 12;
            }
            Chord.curSteps = halfSteps;
            console.log(`Chord.curSteps: ${halfSteps}`);
        }
    }

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

    /**
     * Get the key on the keyboard to trigger the sound of the id
     * @param id
     */
    static getKey(id) {
        return "1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".charAt(id)
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
            const curNote = Chord.getNote(`${curId}`);
            notes.push(curNote);
        }
        return notes
    }

    /**
     * Convert a note string to a html of the note, make '#' as a superscript
     * @param noteStr: String
     * @returns {String}
     */
    static toNotesHTML(noteStr){
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

Chord.curSteps = [0];
Chord.type = null;
Chord.family = null;
Chord.inversionNum = 0;

export {Chord}
