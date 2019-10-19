import {Keyboard} from "./src/keyboard/Keyboard.mjs";
// import {Tone} from "tone";
// import Tone from "tone";

// Add a container
const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

const keyboard = new Keyboard(container);


