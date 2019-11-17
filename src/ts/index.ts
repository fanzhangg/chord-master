import {Piano} from "./keyboard/Piano";
import {Note} from "./Note";
import {PianoSound} from "./sound/PianoSound";
import {ChordProgression} from "./ChordProgression";
import { chord } from "d3";

const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

const sound = new PianoSound(0, 100);
sound.load();

const chordProgressionContainer = document.createElement("div");
chordProgressionContainer.id = "chordProgressionContainer";
document.body.appendChild(chordProgressionContainer);

const chordProgression = new ChordProgression(chordProgressionContainer);

chordProgression.on("chordDown", (chordName: string) => {
    sound.keyDownUp(chordName);
    const keyNum = Note.toKeyNum(chordName);
    piano.keyDown(keyNum);
})

piano.on("keyDown", (keyNum: number) => {
    const note: string = Note.toNoteName(keyNum);
    sound.keyDown(note);
    const noteName: string = Note.toNoteName(keyNum);
    chordProgression.appendChord(noteName)
});

piano.on("keyUp", (keyNum: number) => {
    const note: string = Note.toNoteName(keyNum);
    sound.keyUp(note);
});
