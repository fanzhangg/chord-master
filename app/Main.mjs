/* global d3 */
import {Keyboard} from "./src/keyboard/Keyboard.mjs";
import {ChordTypeSelector} from "./src/ChordTypeSelector.mjs";


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

const loader = d3.select("body").append("div")
    .attr("id", "loader");

sleep(1000).then(() => {
    // Add keyboard view
    d3.select("#loader").remove();
    const keyboardContainer = document.createElement('div');
    keyboardContainer.id = 'keyboard-container';
    document.body.appendChild(keyboardContainer);

    const keyboard = new Keyboard(keyboardContainer);

// Add chord type selector view
    const chordTypeContainer = document.createElement('div');
    chordTypeContainer.id = 'chord_type_frm';
    chordTypeContainer.classList.add("container");
    document.body.insertBefore(chordTypeContainer, document.body.firstChild);    // Insert as the first child
    new ChordTypeSelector(chordTypeContainer);
});
