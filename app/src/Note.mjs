const chords = {
    "nay": [0],
    "major": [0, 4, 7],
    "minor": [0, 3, 7],
    "diminished": [0, 3, 6],
    "augmented": [0, 4, 8],
    "dim7": [0, 3, 6, 9],
    "dream": [0, 5, 6, 7],
    "elektra": [0, 7, 9, 1, 4],
    "maj6": [0, 4, 7, 9],
    "major6ix9ine": [0, 4, 7, 9, 2],
    "minor6": [0, 3, 7, 9],
    "mu": [0, 2, 4, 7],
    "neopolitan": [1, 5, 8],
    "power": [0,7],
    "suspended": [0, 5, 7],
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
     * @param  id: str
     * @returns {Array}
     */
    static getChordList(id){
        const steps = Note.getChordSteps();
        let notes = [];
        for (let i = 0; i < steps.length; i++){
            const curId = parseInt(id) + steps[i];
            const curNote = Note.getNote(`${curId}`);
            notes.push(curNote);
        }
        return notes
    }
}

export {Note}
