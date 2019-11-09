import {Keyboard} from "./src/keyboard/Keyboard.mjs";
import {ChordTypeSelector} from "./src/ChordTypeSelector.mjs";
import {ChordSettingToolbar} from "./src/settingToolbar/ChordSettingToolbar.mjs";


// Add chord type selector view
// const chordTypeContainer = document.createElement('div');
// chordTypeContainer.id = 'chord_type_frm';
// chordTypeContainer.classList.add("container");
// document.body.appendChild(chordTypeContainer, document.body.firstChild);    // Insert as the first child
new ChordSettingToolbar();

// Add keyboard view
const keyboardContainer = document.createElement('div');
keyboardContainer.id = 'keyboard-container';
document.body.appendChild(keyboardContainer);

const keyboard = new Keyboard(keyboardContainer);


