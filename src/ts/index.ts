import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { ChordSettingToolbar } from "./setting-toolbar/ChordSettingToolbar";
import { ChordProgression } from "./ChordProgression";
import { Loader } from "./interface/Loader";
import {Sequence, Part, Synth, Transport} from "tone/tone";


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

var synth = new Synth().toMaster()

//pass in an array of events
var seq = new Sequence(function(time, note){
	console.log(note);
	sound.keyDownUp(note);
//straight quater notes
}, ["C4", "E4", "G4", "A4"], "4n");
 

//start the part at the beginning of the Transport's timeline
// part.start(0);

//loop the part 3 times
seq.loop = 3
seq.loopEnd = '1m';
seq.start(0);

//start/stop the transport
window.addEventListener('pointerdown', e => {
	console.log("Start the part")
	Transport.toggle();
});

// window.addEventListener("pointerdown", e=>{
// 	const part = new Sequence(function(time, note){
// 		//the notes given as the second element in the array
// 		//will be passed in as the second argument
// 		sound.keyDownUp(note);
// 		console.log("Play the funcking sound");
// 		console.log(`${note} ${time}`);
// 		//@ts-ignore
// 	}, ["C2", "E2", "G2"], "4n");
// 	console.log("Play the funcking sound");
// 	part.start();
// })
