import "./third_party/jquery-3.4.1.js";
import {Chord} from "./Chord.mjs";
import {KeyboardElement} from "./keyboard/Element.mjs";

// import {Keyboard} from "/app/src/keyboard/Keyboard.mjs"

const chordSymbols = { // Holds the symbols for each chord name.
    "Major": "",
    "Minor Triad": "m",
    "Augmented": "Aug",
    "Diminished" : "Dim"
};

/**
 * Holds the chord information for each chord in the inversion.
 */
class InversionChord {
    constructor(rootNote, type, notes) {
        this.rootNote = rootNote; // Holds the root note of the chord
        this.type = type; // Holds the type of chord
        this.notes = notes; // Holds the ID of the piano keys to be played
    }

    getRepresentation() {  // Returns a div element that is put into the progression holder
        const chordRepresentation = document.createElement("div");
        chordRepresentation.classList.add("col-2", "chord-column");
        chordRepresentation.innerText = this.rootNote + " " + chordSymbols[this.type];
        chordRepresentation.dataset.notes = this.notes; // Sets notes attached to representation to be played later
        chordRepresentation.id = "chord-representation";
        chordRepresentation.addEventListener("click", function(){alert(type)}); // Fix this!

        return chordRepresentation;
    }
}


/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    constructor(container) {
        this._renderView(container);
        this._keyDown();
    }

    _renderView(container) {
        // Created chordListHolder out of the class so I can edit it everywhere.
        chordListHolder.classList.add("chord-list-holder");

        container.append(chordListHolder);
    }

    /**
     * Adds chord to chord list
     * @param chord
     */
    static addChord() {
        let chord = new InversionChord("A2", "Minor Triad", [5,14,7]);  //  Update chord.mjs variables

        if (ChordProgression.chordsList.length === 6) {
            alert("Progression List can not have length longer than eight.")
        }
        else {
            ChordProgression.chordsList.push(chord.notes);
            chordListHolder.appendChild(chord.getRepresentation()); // attaches the div element to the chords holder.
            // this.updateText();
        }
    }

    /**
     * Clears the list of chords
     */
    static resetChord() {
        const group = this;
        group.chordsList = [];
        chordListHolder.innerHTML = ""
    }


    /**
     * Plays through the chords using sequencers.
     */
    static playChord() {
        alert(ChordProgression.chordsList);
    }

    alertHello(){
        alert("hello");
    }

    _keyDown() {
        $(".chord-representation").click(function() {
            alert("hello")
        });
    }

}

const chordListHolder = document.createElement("div"); // Creates global variables to be accessed throughout.
chordListHolder.classList.add("row");
ChordProgression.chordsList = [];

export {ChordProgression}