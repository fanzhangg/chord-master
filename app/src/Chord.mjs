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

class Chord{
    // Takes gets steps from the dictionary above, for the zero code sets to just 0.
    static setCurStep(chordType, chordName){
        Chord.curSteps = chordFamilies[chordType][chordName]; // Gets the non-inverted chord from chordFamilies.
        Chord.curStepsNoInversion = chordFamilies[chordType][chordName]; // saves the steps with no inversion so we can go back to it later.
        // this.applyInversion(Chord.curSteps); // Applies the inversion the Chord.curSteps
    }

    static setCurStepDirectly(stepsArray){
        Chord.curSteps = stepsArray;
    }

    static applyInversion(inversionID) {
        Chord.curSteps = Chord.curStepsNoInversion;
        for (let i = 0; i < inversionID; i++) {
            Chord.curSteps[i] += 12;
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

    static get chords(){
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

export {Chord}
