import {Keyboard} from "./src/keyboard/Keyboard.mjs";
import {ChordSettingToolbar} from "./src/settingToolbar/ChordSettingToolbar.mjs";
import {Loader} from "./src/Loader.mjs";
import {ChordProgression} from "./src/ChordProgression.mjs";
import {ProgressionButtons} from "./src/settingToolbar/ProgressionButtons.mjs";


// Add chord type selector view
// const chordTypeContainer = document.createElement('div');
// chordTypeContainer.id = 'chord_type_frm';
// chordTypeContainer.classList.add("container");
// document.body.appendChild(chordTypeContainer, document.body.firstChild);    // Insert as the first child
new Loader();

new ChordSettingToolbar();

const progressionContainer = document.createElement('div');
progressionContainer.id = "progression-container";
document.body.appendChild(progressionContainer);

new ChordProgression(progressionContainer);

// Add keyboard view
const keyboardContainer = document.createElement('div');
keyboardContainer.id = 'keyboard-container';
document.body.appendChild(keyboardContainer);

const keyboard = new Keyboard(keyboardContainer);


