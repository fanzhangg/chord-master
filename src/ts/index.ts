import {Piano} from "./keyboard/piano";
import {Note} from "./note";
import {PianoSound} from "./sound/piano_sound";

const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

const sound = new PianoSound(0, 100);
sound.load();

piano.on("keyDown", (keyNum: number) => {
    const note: string = Note.toNoteName(keyNum);
    sound.keyDown(note);
});

piano.on("keyUp", (keyNum: number) => {
    const note: string = Note.toNoteName(keyNum);
    sound.keyUp(note);
});
