import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { ChordSettingToolbar } from "./setting-toolbar/ChordSettingToolbar";
import { ChordProgression } from "./ChordProgression";
import { Loader } from "./interface/Loader";
import {Sequence, Part, Synth, Transport} from "tone/tone";
import { ProgressionButtons } from "./setting-toolbar/ProgressionButtons";


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

new ChordProgression(progresssionContainer)

const sound = new PianoSound(0, 100);
sound.load();

piano.onKeyDown = function(chord: Array<string>){
    sound.keyDown(chord);
}

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
}

const progresssionBtnsContainer = document.createElement("div");
progresssionBtnsContainer.id = "progressionContainer";
document.body.appendChild(progresssionBtnsContainer);

const progressionBtns = new ProgressionButtons(progresssionBtnsContainer);

progressionBtns.onPlayChord = function(chords: Array<Array<string>>){

	//pass in an array of events
	var seq = new Sequence(function(time, note){
		console.log(note);
		sound.keyDownUp(note);
	//chords in the progression
	//@ts-ignore
	}, chords, "4n");
	
	//loop the part 3 times
	seq.loop = 3
	seq.loopEnd = '1m';
	//start the part at the beginning of the Transport's timeline
	seq.start(0);

	//start/stop the transport
	Transport.toggle();
}



