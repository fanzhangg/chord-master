import {Note} from "./Note"

export class Chord {
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
        "Dominant Eleventh": "<sup>11</sup>",
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
            "Dominant Eleventh": [0, 4, 7, 10, 14, 16],  // C E G B♭ D F
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
        this.rootKeyNum = rootKeyNum;   // Root is C4 by default
        this.family = family;
        this.inversionNum = inversionNum;
    }

    /**
     * @returns an array of string of the note in the chord
     */
    public getNotes(): Array<string> {
        const halfSteps = Chord.chordFamilies[this.family][this.type].slice(0); // Copy the half steps
        if (halfSteps == null) {
            throw new Error("Cannot get the half steps");
        }
        for (let i = 0; i < this.inversionNum; i++) {    // Inverse half steps
            halfSteps[i] += 12;
        }

        let notes = []; // Get the notes in the chord
        for (let halfStep of halfSteps) {
            const curKeyNum = this.rootKeyNum + halfStep;
            const curNote = Note.toNoteName(curKeyNum);
            notes.push(curNote);
        }

        return notes;
    }

    /**
     * @param family
     * @param type
     * @returns the length of the half steps
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
        let chroma = Note.toChroma(this.rootKeyNum);
        const inversionSymbol = this._getInversionSymbol();

        if (chroma.indexOf("#") > -1) {
            chroma = chroma.replace("#", "♯"); // Changes the sharp sign to a fancy sharp.
        }

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
     * Gets the base note if there is an inversion. (IE: C/E) in first inversion.
     * @private
     */
    private _getInversionSymbol(): string {
        if (this.inversionNum == 0) {
            return "";
        }
        const halfSteps = this._getHalfSteps();
        const rootKeyNum = this.rootKeyNum;
        const rootKeyName = Note.toNoteName(rootKeyNum); // Gets name of root key

        const rootNoteLetter = rootKeyName[0];
        const rootNoteLetterIndex = Chord.letters.indexOf(rootNoteLetter);    // Get the index of root note letter

        const inversionLetter = Chord.letters[(rootNoteLetterIndex + 2 * this.inversionNum) % 7]; // Gets just the letter of the note being played
        const chromaIDOfLetter = Note.chromas.indexOf(inversionLetter); // Note.chromas starts on C and includes half steps

        const idOfPlayed = rootKeyNum + halfSteps[this.inversionNum]; // The actual ID of the note being played
        const nameOfPlayed = Note.toNoteName(idOfPlayed);
        const shortNameOfPlayed = nameOfPlayed.substring(0, nameOfPlayed.length - 1); // Gets just the chroma of played note.
        const chromaIDOfPlayed = Note.chromas.indexOf(shortNameOfPlayed);

        let inversionSymbol = inversionLetter;

        switch ((chromaIDOfLetter - chromaIDOfPlayed) % Note.chromas.length) { // The difference between the two notes.
            case -2:
                inversionSymbol = inversionLetter + "♯♯";
                break;
            case -1:
                inversionSymbol = inversionLetter + "♯";
                break;
            case 0:
                inversionSymbol = inversionLetter;
                break;
            case 1:
                inversionSymbol = inversionLetter + "♭";
                break;
            case 2:
                inversionSymbol = inversionLetter + "♭♭";
                break;
        }

        return `/${inversionSymbol}`;
    }
}
