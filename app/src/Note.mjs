// const scaleDegreeChords = {
//     "triad": {  // chord with 3 notes
//         "major triad": [{degree: 1, quality: "perfect"}, [3, "Major"], [5, "Perfect"]],
//         "minor triad": [[1, "Perfect"], [3, "Minor"], [5, "Perfect"]],
//         "augmented triad": [[1, "Perfect"], [3, "Minor"], [5, "Perfect"]],
//         "diminished triad": [0, 3, 6]
//     }
// }

const chords = {
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
        "Dominant Seventh": [0, 4, 7, 10, 14, 16],  // C E G B♭ D F WRONG FIX!
        "Dominant Thirteenth": [0, 4, 7, 10, 14, 16, 20] // C E G B♭ D F A
    },
    "Altered": {
        "Seventh Augmented Fifth": [0, 4, 8, 10],   // C E G♯ B♭
        "Seventh Minor Ninth": [0, 4, 7, 10, 13],   // C E G B♭ D♭
        "Seventh Sharp Ninth": [0, 4, 7, 10, 15],  // C E G B♭ D♯
        "Seventh Augmented Eleventh": [0, 4, 7, 10, 14, 17],   // C E G B♭ D F♯
    }
};

class Note{
    // Takes gets steps from the dictionary above, for the zero code sets to just 0.
    static setCurStep(chordType, chordName){
        Note.curSteps = chords[chordType][chordName];
    }

    static setCurStepDirectly(stepsArray){
        Note.curSteps = stepsArray;
    }

    // static get curSteps(){
    //     return Note.curSteps;
    // }

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

    // static getChordSteps(){
    //     // Get the chord type
    //     // const chordType = document.querySelector('input[name="chordTypeButton"]:checked').value;
    //     // return chords[chordType];
    //     return this.curSteps;
    // }

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
