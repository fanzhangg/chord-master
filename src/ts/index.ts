import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { ChordSettingToolbar } from "./setting-toolbar/ChordSettingToolbar";
import { ChordProgression } from "./ChordProgression";
import { Loader } from "./interface/Loader";
import {Chord} from "./music-theory/Chord";
import $ from "jquery";

new Loader();

// Chord Toolbar
new ChordSettingToolbar();

// Piano
const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

const progresssionContainer = document.createElement("div");
progresssionContainer.id = "progressionContainer";
document.body.appendChild(progresssionContainer);

const chordProgression = new ChordProgression(progresssionContainer);

const sound = new PianoSound(0, 100);
sound.load();

piano.onKeyDown = function(chord: Array<string>){
    sound.keyDown(chord);
};

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
};


chordProgression.chordNameClicked = function(rootNote: string, type: string, inversion: number, notes: Array<T>) {
    // alert(rootNote + " " + type + " " + inversion + " " + notes);
    sound.keyDownUp(notes);

    // Chord.rootNoteName = rootNote;
    // Chord.type = type;
    // Chord.inversionNum = inversion;

};