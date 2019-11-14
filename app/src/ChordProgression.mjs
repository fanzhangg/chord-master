import "./third_party/jquery-3.4.1.js";
import {Chord} from "./Chord.mjs";
import {KeyboardElement} from "./keyboard/Element.mjs";

// import {Keyboard} from "/app/src/keyboard/Keyboard.mjs"

/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    constructor(container) {
        this._renderView(container)
    }

    _renderView(container) {
        const chordListHolder = document.createElement("div");
        chordListHolder.classList.add("chord-list-holder");

        const chords = document.createElement("a"); // Creates the string that will hold chord names
        chords.classList.add("progression-text");
        chords.innerText = "Add Chords Here";

        chordListHolder.appendChild(chords);
        container.append(chordListHolder);
    }

    /**
     * Adds chord to chord list
     * @param chord
     */
    static addChord() {
        let chord = Chord.getHalfSteps();  // This needs to be fixed. I am thinking about taking it from "KeyboardElement"
        if (ChordProgression.chordsList.length === 8) {
            alert("Progression List can not have length longer than eight.")
        }
        else {
            ChordProgression.chordsList.push(chord);
            this.updateText();
        }
    }

    /**
     * Clears the list of chords
     */
    static resetChord() {
        const group = this;
        group.chordsList = [];
        this.updateText();
    }


    /**
     * Plays through the chords using sequencers.
     */
    static playChord() {
        alert(ChordProgression.chordsList);
    }

    static updateText() {
        $(".progression-text").text(ChordProgression.chordsList)
    }

}

ChordProgression.chordsList = [];

export {ChordProgression}