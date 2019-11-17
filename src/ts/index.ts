import {Piano} from "./keyboard/Piano";
import {Note} from "./Note";
import {PianoSound} from "./sound/PianoSound";

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
