import {Keyboard} from "./src/keyboard/Keyboard.mjs";

// Add keyboard view
const keyboardContainer = document.createElement('div');
keyboardContainer.id = 'keyboard-container';
document.body.appendChild(keyboardContainer);

new Keyboard(keyboardContainer);

