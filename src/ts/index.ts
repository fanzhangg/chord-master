// Third-party modules
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
import "material-design-icons"
import "bootstrap-submenu/dist/css/bootstrap-submenu.css"
import "bootstrap-submenu/dist/js/bootstrap-submenu"
import "jquery"

import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { Loader } from "./interface/Loader";
import {ChordTypeBtn} from "./setting-toolbar/ChordTypeBtn";
import {InversionBtn} from "./setting-toolbar/InversionBtn";
import {Chord} from "./music-theory/Chord";
import {ChordProgression} from "./ChordProgression";


new Loader();

const chordTypeBtn = new ChordTypeBtn();
const inversionBtn = new InversionBtn();

const pianoContainer = document.getElementById("pianoContainer")!;
const piano = new Piano(pianoContainer);

const sound = new PianoSound(0, 100);
sound.load();

const progression = new ChordProgression();


piano.onKeyDown = function(chord: Chord){
    progression.setChord(chord);

    const notes = chord.getNotes();
    sound.keyDown(notes);
};

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
};

piano.onSetChord = function(chord: Chord){
    const notes = chord.getNotes();
    sound.keyDownUp(notes);
};

chordTypeBtn.onSetChordType = function (type: string, family: string) {
    console.log(`Set the type to ${type}`);
    const chordLen = Chord.getLen(family, type);
    inversionBtn.reset(chordLen);
    piano.setChordType(family, type);
    progression.setChordType(family, type);
};

inversionBtn.onSetInversion = function (inversionNum: number) {
    piano.setInversion(inversionNum);
    progression.setInversion(inversionNum);
    console.log(`Set the inversion to ${inversionNum}`)
};

progression.onActivate = function (chord: Chord) {
  piano.setChord(chord);
  console.log(`Set the chord to ${chord}`);
};


// chordProgression.onPlayChord = function(chords: Array<Array<string>>){
// 	let events = [];
// 	for (let i = 0; i < chords.length; i++){
// 		const event = {"time": i, "chord": chords[i]};
// 		events.push(event);
// 	}
//
// 	new Part(function(time, value){
// 		//the value is an object which contains both the note and the velocity
// 		sound.keyDownUp(value.chord, "2n", time);
// 		//@ts-ignore
// 	}, events).start(0);
// 	//@ts-ignore
// 	Transport.toggle();
// };



