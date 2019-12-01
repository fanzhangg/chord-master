import {Note} from "./Note"

export class Chord {
    //TODO: the symbol dictionary is not complete
    static readonly chordTypeSymbols: any = {
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
            "Seventh Sharp Ninth": [0, 4, 7, 10, 15],  // C E G B♭ D♯
            "Seventh Augmented Eleventh": [0, 4, 7, 10, 14, 18],   // C E G B♭ D F♯
        }
    };

    public type: string; // Must have a type
    public family: string;    // Family is nullable if it is a  single note
    public inversionNum: number;
    public rootKeyNum: number;

    constructor(rootKeyNum=48, type="Major Triad", family="Triads", inversionNum=0){
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
        if (halfSteps == null){
            throw new Error("Cannot get the half steps");
        }
        for (let i = 0; i < this.inversionNum; i++){    // Inverse half steps
            halfSteps[i] += 12;
        }

        let notes = [];
        for (let halfStep of halfSteps){
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
        if (halfSteps == []){
            throw new Error("Cannot get the half steps");
        } else {
            return halfSteps.length;
        }
    }

    /**
     * Overwrite toString method
     */
    public toString(){
        const notes = this.getNotes();
        return notes.toString();
    }

    /**
     * Get the chord name
     */
    public getChordName() {
        const typeSymbol = Chord.chordTypeSymbols[this.type];
        const chroma = Note.toChroma(this.rootKeyNum);
        const inversionSymbol = this._getInversionSymbol();
        return `${chroma}${inversionSymbol}${typeSymbol}`;
    }

    private _getHalfSteps(): Array<number>{
        const halfSteps = Chord.chordFamilies[this.family][this.type].slice(0);
        if (halfSteps == null){
            throw new Error("Cannot get the half steps");
        }
        return halfSteps
    }

    private _getInversionSymbol(): string{
        if (this.inversionNum == 0){
            return "";
        }
        const halfSteps = this._getHalfSteps();
        const rootKeyNum = this.rootKeyNum;
        const inversedKeyNum = rootKeyNum + halfSteps[this.inversionNum];
        const inversedNote = Note.toChroma(inversedKeyNum);
        return `/${inversedNote}`;
    }
}
