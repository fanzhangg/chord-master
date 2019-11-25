import {Note} from "./Note"

const chordFamilies: any = {
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
        "Seventh Augmented Eleventh": [0, 4, 7, 10, 14, 18],   // C E G B♭ D F♯
    }
};

class Chord {
    private halfSteps = [0];
    private type: string = "Single"; // Must have a type
    private family: string | null = null;    // Family is nullable if it is a  single note
    private inversionNum = 0;
    private rootKeyNum: number | null = null;
    private rootNoteName: string | null = null;
    private notes: Array<string> | null = null;

    getHalfSteps(){
        return this.halfSteps;
    }
    setHalfStepsDirectly(halfSteps: Array<number>){
        this.halfSteps = halfSteps;
    }
    getType(){
        return this.type;
    }
    setType(type: string) {
        this.type = type;
    }
    getFamily(){
        return this.family;
    }
    setFamily(family: string) {
        this.family = family;
    }
    getInversionNum(){
        return this.inversionNum;
    }
    setInversionNum(inversionNum: number) {
        this.inversionNum = inversionNum;
    }
    getRootKeyNum(){
        return this.inversionNum;
    }
    setRootKeyNum(rootKeyNum: number) {
        this.rootKeyNum = rootKeyNum;
    }
    getRootNoteName(){
        return this.rootNoteName;
    }
    setRootNoteName(rootNoteName: string) {
        this.rootNoteName = rootNoteName;
    }
    getNotes(){
        return this.notes;
    }
    setNotes(notes: Array<string>){
        this.notes = notes;
    }


    /**
     * Return the half steps of the chord from the root. [0] if no chord type is specified
     * @return {Array}
     */
    private getHalfStepsFromDict(){
        if (this.family === null){
            return [0]
        } else {
            const family: string = this.family as unknown as string;
            return [...chordFamilies[family][this.type]];
        }
    }

    /**
     * Set the half steps of the chord from the root based on its type and inversion number
     */
    private setHalfSteps() {
        const halfSteps = this.getHalfStepsFromDict();
        if (this.getFamily() !== null) { // We have this condition to avoid the 1 note breaking the inversion.
            for (let i = 0; i < this.inversionNum; i++) {
                halfSteps[i] += 12;
            }
            this.setHalfStepsDirectly(halfSteps);
            console.log(`this.getHalfSteps()": ${halfSteps}`);
        }
    }

    /**
     * Get the list of notes in the selected chord
     * @returns {Array}
     * @param rootKeyNum
     */
    private getChordList(rootKeyNum: number): Array<string>{
        this.rootKeyNum = rootKeyNum;

        const halfSteps = this.halfSteps;
        let notes = [];
        for (let halfStep of halfSteps){
            const curKeyNum = rootKeyNum + halfStep;
            const curNote = Note.toNoteName(curKeyNum);
            notes.push(curNote);
        }

        // this.notes = notes;

        return notes
    }
}

export {Chord}
