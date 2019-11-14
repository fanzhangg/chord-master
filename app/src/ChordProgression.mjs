import "./third_party/jquery-3.4.1.js";
// import {Keyboard} from "/app/src/keyboard/Keyboard.mjs"

// To DO: put all this code in settings toolbar.
// Then make use this class to build the actual div.

/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    constructor(container) {
        this._renderView(container)
    }

    _renderView(container) {
        const chordListHolder = document.createElement("div");
        chordListHolder.classList.add("chordListHolder");

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
    static addChord(chord) {
        ChordProgression.chordsList.push(chord);
        this.updateText();
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