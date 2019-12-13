// Third-party modules
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
import "material-design-icons"
import "bootstrap-submenu/dist/css/bootstrap-submenu.css"
import "bootstrap-submenu/dist/js/bootstrap-submenu"
import "jquery"
import {Part} from "tone";
import $ from "jquery";

import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import {Loader} from "./interface/Loader";
import {ChordTypeBtn} from "./setting-toolbar/ChordTypeBtn";
import {InversionBtn} from "./setting-toolbar/InversionBtn";
import {Chord} from "./music-theory/Chord";
import {ChordProgression} from "./progression/ChordProgression";

import {MidiSaver} from "./progression/MidiSaver"


new Loader();   // Loader to create the loading page

const chordTypeBtn = new ChordTypeBtn();
const inversionBtn = new InversionBtn();

const pianoContainer = document.getElementById("pianoContainer")!;
const piano = new Piano(pianoContainer);

const sound = new PianoSound(0, 100);
sound.load();

const progression = new ChordProgression();

const midiSaver = new MidiSaver();

/**
 * Handles the key presses for the piano class.
 * @param chord
 */
piano.onKeyDown = function (chord: Chord) {
    progression.setChord(chord);

    const notes = chord.getNotes();
    sound.keyDown(notes);
};

/**
 * Stops the chord sound when the mouse is releases
 * @param chord
 */
piano.onKeyUp = function (chord: Array<string>) {
    sound.keyUp(chord);
};

/**
 * Sets the chord when a chord progression chord is clicked.
 * @param chord
 */
piano.onSetChord = function (chord: Chord) {
    const notes = chord.getNotes();
    sound.keyDownUp(notes, 1);
};

/**
 * Changes the chord type when you click from the menu.
 * @param type
 * @param family
 */
chordTypeBtn.onSetChordType = function (type: string, family: string) {
    console.log(`Set the type to ${type}`);
    const chordLen = Chord.getLen(family, type);
    inversionBtn.reset(chordLen);   // Reset the chord inversion to none
    piano.setChordType(family, type);
    progression.setChordType(family, type);
};

/**
 * Changes the inversion when you click from the menu
 * @param inversionNum
 */
inversionBtn.onSetInversion = function (inversionNum: number) {
    piano.setInversion(inversionNum);
    progression.setInversion(inversionNum);
    console.log(`Set the inversion to ${inversionNum}`)
};

/**
 * Sets chord on piano, changes text on chord type button and inversion button.
 * @param chord
 */
progression.onActivate = function (chord: Chord) {
    piano.setChord(chord);
    chordTypeBtn.setTypeText(chord.type);
    inversionBtn.setInversionText(chord);
    console.log(`Set the chord to ${chord}`);
};


let part = new Part(() => {}, []); // Declaring a blank part to be used in progression.onPlay()
/**
 * Plays through the chord progression when play button is clicked.
 * @param chords
 */
progression.onPlay = function (chords: Array<Array<string>>) {
    // @ts-ignore
    part.removeAll();

    let events = [];
    for (let i = 0; i < chords.length; i++) {
        const event = {"time": i, "chord": chords[i]};
        events.push(event);
    }

    // @ts-ignore
    part = new Part(function (time, value) {
        //the value is an object which contains both the note and the velocity
        progression.switch();

        // @ts-ignore
        console.log(`Play the chord ${value.chord}`);
        //@ts-ignore
    }, events).start(0);
    part.loop = true;
    part.loopStart = 0;
    part.loopEnd = chords.length;
};

/**
 * Callback after switching to the next chord
 * Disable the chord, and inversion buttons and the piano interface
 */
progression.onSwitch = function () {
    chordTypeBtn.disable();
    inversionBtn.disable();
    piano.disable();
};

/**
 * Callback after stopping playing the progression
 * Enable the chord type, and inversion button and piano
 */
progression.onStop = function () {
    chordTypeBtn.enable();
    inversionBtn.enable();
    piano.enable();
};

/**
 * Get the chord progression from the progression for writing to the midi file
 */
midiSaver.onGetChords = function(){
    return progression.chordsList
};


// @ts-ignore
$('#helpBtn').tooltip();   // Trigger the tooltip of the play button


window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };
