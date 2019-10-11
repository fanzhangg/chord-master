import {Keyboard} from "./src/keyboard/Keyboard.mjs";
// import {Tone} from "tone";
// import Tone from "tone";


/**
 * Initialize the page
 */

class Initializer {
    constructor() {
        Initializer.setDefaultChordType();
    }
    static setDefaultChordType() {
        const chordTypeFrm = document.getElementById("chord_type_frm");
        chordTypeFrm[0].checked = true; // Set major to be checked by default
    }
}

const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

const keyboard = new Keyboard(container);

// Set default chord type
const chordTypeFrm = document.getElementById("chord_type_frm");
chordTypeFrm[0].checked = true; // Set major to be checked by default



