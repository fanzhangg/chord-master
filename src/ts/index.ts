import {Piano} from "./keyboard/Piano";
import {Note} from "./Note";
import {PianoSound} from "./sound/PianoSound";
import {ChordProgression} from "./ChordProgression";

const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

const sound = new PianoSound(0, 100);
sound.load();

piano.onNotes = function(chord: Array<string>){
    sound.keyDownUp(chord);
}

