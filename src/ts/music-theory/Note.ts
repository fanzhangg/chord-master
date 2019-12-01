import {note} from "@tonaljs/tonal";


export class Note {
    static chromas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    static toKeyNum(noteName: string): number {
        const octave = note(noteName).oct as number;
        const chroma = note(noteName).chroma as number;
        return octave * 12 + chroma;
    }

    static toNoteName(keyNum: number): string {
        if (keyNum < 0) {
            throw new Error("The key number is less than 0");
        }
        const octave = Math.floor(keyNum / 12);
        const chroma = Note.chromas[keyNum % 12];
        return `${chroma}${octave}`
    }
}
