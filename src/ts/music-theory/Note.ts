import {note} from "@tonaljs/tonal";


export class Note {
    static readonly chromas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    /**
     * Gets the id number of a note given its string representation.
     * @param noteName
     */
    static toKeyNum(noteName: string): number {
        const octave = note(noteName).oct as number;
        const chroma = note(noteName).chroma as number;
        return octave * 12 + chroma;
    }

    /**
     * Returns the name of a note given its id number representation.
     * @param keyNum
     */
    static toNoteName(keyNum: number): string {
        if (keyNum < 0) {
            throw new Error("The key number is less than 0");
        }
        const octave = Math.floor(keyNum / 12);
        const chroma = Note.chromas[keyNum % 12];
        return `${chroma}${octave}`
    }

    /**
     * Get the pitch of the key number
     * @param keyNum
     */
    static toChroma(keyNum: number): string {
        if (keyNum < 0) {
            throw new Error("The key number is less than 0");
        }
        return Note.chromas[keyNum % 12];
    }
}
