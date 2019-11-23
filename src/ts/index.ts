import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { ChordSettingToolbar } from "./setting-toolbar/ChordSettingToolbar";
import { ChordProgression } from "./ChordProgression";
import { Loader } from "./interface/Loader";
import {Part, Transport} from "tone/tone";
import { ProgressionButtons } from "./setting-toolbar/ProgressionButtons";


new Loader();

// Chord Toolbar
new ChordSettingToolbar();

// Piano
const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

// Progression
const progresssionContainer = document.createElement("div");
progresssionContainer.id = "progressionContainer";
document.body.appendChild(progresssionContainer);

new ProgressionButtons(progresssionContainer);

const chordProgression = new ChordProgression(progresssionContainer);

const sound = new PianoSound(0, 100);
sound.load();

piano.onKeyDown = function(chord: Array<string>){
    sound.keyDown(chord);
};

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
};


chordProgression.onPlayChord = function(chords: Array<Array<string>>){
	let events = [];
	for (let i = 0; i < chords.length; i++){
		const event = {"time": i, "chord": chords[i]};
		events.push(event);
	}

	new Part(function(time, value){
		//the value is an object which contains both the note and the velocity
		sound.keyDownUp(value.chord, "2n", time);
		//@ts-ignore
	}, events).start(0);
	//@ts-ignore
	Transport.toggle();
};



