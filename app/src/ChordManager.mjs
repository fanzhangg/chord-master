const chordFamilies = {
    "triad": {  // chord with 3 notes
        "major triad": [0, 4, 7],
        "minor triad": [0, 3, 7],
        "augmented triad": [0, 4, 8],
        "diminished triad": [0, 3, 6]
    },
    "seventh": {
        "diminished seventh": [0, 3, 6, 9], // C E♭ G♭ B♭♭
        "half diminished seventh": [0, 3, 6, 10],
        "minor seventh": [0, 3, 7, 10],
        "major seventh": [0, 4, 7, 11], // C E G B
        "augmented seventh": [0, 4, 8, 10], // C E G♯ B♭
        "augmented major seventh": [0, 4, 8, 11] // C E G♯ B
    },
    "dominant": {
        "dominant ninth": [0, 4, 7, 10, 14],    // C E G B♭ D`// TODO: should be B-flat
        "dominant thirteenth": [0, 4, 7, 10, 14, 21] // C E G B♭ D F A
    },
    "altered": {
        "seventh sharp fifth": [0, 4, 8, 10],   // C E G♯ B♭
        "seventh flat ninth": [0, 4, 7, 10, 13],   // C E G B♭ D♭
        "seventh sharp ninth": [0, 4, 7, 10, 15],  // C E G B♭ D♯
        "seventh sharp eleventh": [0, 4, 7, 10, 14, 18],   // C E G B♭ D F♯
    }
};

class ChordManager{

    static setCurStep(chordType, chordName){
        ChordManager.curSteps = chordFamilies[chordType][chordName];
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

    static get chordFamilies(){
        return chordFamilies
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
            const curNote = ChordManager.getNote(`${curId}`);
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

ChordManager.curSteps = [0];    // Initialize current step

export {ChordManager}
