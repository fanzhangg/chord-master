import {Note} from "./Note"

export class Chord {
    //TODO: the symbol dictionary is not complete
    static readonly chordTypeSymbols: any = {
        //Triads
        "Major Triad": "",
        "Minor Triad": "m",
        "Augmented Triad": "+",
        "Diminished Triad": "<sup>o</sup>",
        //Sevenths
        "Dominant Seventh": "<sup>7</sup>",
        "Major Seventh": "maj<sup>7</sup>",
        "Minor Seventh": "min<sup>7</sup>",
        "Diminished Seventh": "<sup>o7</sup>",
        "Half Diminished Seventh": "<sup>ø7</sup>",
        "Augmented Seventh": "+<sup>7</sup>",
        "Augmented Major Seventh": "+<sup>M7</sup>",
        //Extended
        "Dominant Ninth": "<sup>9</sup>",
        "Dominant Thirteenth": "<sup>13</sup>",
        //Altered
        "Seventh Augmented Fifth": "<sup>7♯5</sup>",
        "Seventh Minor Ninth": "<sup>7♭9</sup>",
        "Seventh Sharp Ninth": "<sup>7♯9</sup>"
    };

    static readonly chordFamilies: any = {
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
            "Seventh Sharp Ninth": [0, 4, 7, 10, 15]  // C E G B♭ D♯
        }
    };

    static readonly letters = ["A", "B", "C", "D", "E", "F", "G"];

    public type: string; // Must have a type
    public family: string;    // Family is nullable if it is a  single note
    public inversionNum: number;
    public rootKeyNum: number;

    constructor(rootKeyNum = 48, type = "Major Triad", family = "Triads", inversionNum = 0) {
        this.type = type;
        this.rootKeyNum = rootKeyNum;   // Root is C4 initially
        this.family = family;
        this.inversionNum = inversionNum;
    }

    /**
     * Get an array of string of the note in the chord
     */
    public getNotes(): Array<string> {
        const halfSteps = Chord.chordFamilies[this.family][this.type].slice(0);
        if (halfSteps == null) {
            throw new Error("Cannot get the half steps");
        }
        for (let i = 0; i < this.inversionNum; i++) {    // Inverse half steps
            halfSteps[i] += 12;
        }

        let notes = [];
        for (let halfStep of halfSteps) {
            const curKeyNum = this.rootKeyNum + halfStep;
            const curNote = Note.toNoteName(curKeyNum);
            notes.push(curNote);
        }

        return notes;
    }

    /**
     * Get the half steps of the chord type
     * @param family
     * @param type
     */
    static getLen(family: string, type: string) {
        const halfSteps = Chord.chordFamilies[family][type].slice(0);
        if (halfSteps == []) {
            throw new Error("Cannot get the half steps");
        } else {
            return halfSteps.length;
        }
    }

    /**
     * Overwrite toString method
     */
    public toString() {
        const notes = this.getNotes();
        return notes.toString();
    }

    /**
     * Get the chord name to place in the chord inversion symbol
     */
    public getChordName() {
        const typeSymbol = Chord.chordTypeSymbols[this.type];
        const chroma = Note.toChroma(this.rootKeyNum);
        const inversionSymbol = this._getInversionSymbol();
        return `${chroma}${typeSymbol}${inversionSymbol}`;
    }

    /**
     * Returns the array of halfsteps of the current Chord.
     * @private
     */
    private _getHalfSteps(): Array<number> {
        const halfSteps = Chord.chordFamilies[this.family][this.type].slice(0);
        if (halfSteps == null) {
            throw new Error("Cannot get the half steps");
        }
        return halfSteps
    }


    /**
     * Gets the note if there is an inversion. (IE: C/E) in first inversion.
     * @private
     */
    private _getInversionSymbol(): string {
        if (this.inversionNum == 0) {
            return "";
        }
        const halfSteps = this._getHalfSteps();
        const rootKeyNum = this.rootKeyNum;
        const rootKeyName = Note.toNoteName(rootKeyNum); // Gets name of root key
        const inversedKeyNum = rootKeyNum + halfSteps[this.inversionNum]; // Key or ID number of lowest note in chord.
        let inversedNote = Note.toChroma(inversedKeyNum); // Name of inversed (lowest) note in chord.

        console.log(inversedNote);

        let noteDiff = Chord.letters.indexOf(inversedNote[0]) - Chord.letters.indexOf(rootKeyName[0]);
        console.log(noteDiff); // Calculates the difference of the note letters

        let firstInversionBoolean = (this.inversionNum === 1 && [1, -6].includes(noteDiff)); // Checks to see if a note needs to be changed for chord inversions
        let secondInversionBoolean = (this.inversionNum === 2 && [3, -4].includes(noteDiff));
        let thirdInversionBoolean = (this.inversionNum === 3) && [5, -2].includes(noteDiff); // Messes up with double flats

        if (firstInversionBoolean || secondInversionBoolean || thirdInversionBoolean){ // Checks to see if there are any of the errors above
            inversedNote = Chord.letters[7%(Chord.letters.indexOf((inversedNote[0]) + 1))] + "♭"; // Changes it to the next note up but flat
        }

        if (this.inversionNum === 3 && this.type === "Diminished Seventh" && rootKeyName[0] === "C") { // Adds a double flat for the one outlier case of c-dim7
            inversedNote = Chord.letters[Chord.letters.indexOf(rootKeyName[0]) - 1] + "♭♭"
        }

        if (inversedNote.indexOf("#") > -1){
            inversedNote = inversedNote.replace("#", "♯"); // Changes the sharp sign to a fancy sharp.
        }
        if (inversedNote == undefined) {
            console.warn("Inversion note is undefined");
            return "";
        }
        return `/${inversedNote}`;
    }
}
