import {Chord} from "./music-theory/Chord";
import $ from "jquery";

const chordSymbols: any = { // Holds the symbols for each chord name.
    //Triads
    "Single Note": "",
    "Major Triad": "",
    "Minor Triad": "m",
    "Augmented Triad": "aug",
    "Diminished Triad": "dim",
    //Sevenths
    "Dominant Seventh": "7",
    "Major Seventh": "maj7",
    "Minor Seventh": "min7",
    "Diminished Seventh": "dim7",
    "Half Diminished Seventh": "min7♭5",
    "Augmented Seventh": "aug7",
    "Augmented Major Seventh": "augM7",
    //Extended
    "Dominant Ninth": "9",
    "Dominant Thirtheenth": "13",
    //Altered
    "Seventh Minor Ninth": "7♭9",
    "Seventh Sharp Ninth": "7#9",
    "Seventh Augmented Eleventh": "7aug11"
};

/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    chordNameClicked: any;
    chordsList: Array<Array<string>>;
    onPlayChord: Function;

    constructor(container: HTMLElement) {
        this.chordsList = [];   // An array to store each chord in the progression as an array of notes

        this._renderView(container);
        this._bindEventListeners();

        // callback events
        this.chordNameClicked = function(){};

        this.onPlayChord = function(){};
    }

    _bindEventListeners() {
        $("#addBtn").on("click", () => { // adds the logic for clicking.
            if (Chord.type == "Single"){    // Does not add single chord to the progression
                console.warn("Single note, cannot be added to progression")
            } else {
                this.addChord();
            }
        });

        $("#playBtn").on("click", () => {  // Play button logic
            console.log("Play progression");
            this.playChord();

        });

        $("#resetBtn").on("click", () => {  // Play button logic
            console.log("Play progression");
            this.resetChordProgression();
        });
    }

    _renderView(container: HTMLElement) {
        // Created chordListHolder out of the class so I can edit it everywhere.
        chordListHolder.classList.add("chord-list-holder");

        container.append(chordListHolder);
    }

    /**
     * Adds chord to chord list
     */
    addChord() {
        if (this.chordsList.length >= 6) {
            console.warn(`chordList len (${this.chordsList.length}) exceeds the max len. Cannot add new chord`);
            alert("Progression List can not have length longer than six.")
        }
        else {
            if (Chord.notes === null){
                console.warn("Current notes not set. Can't add the chord to the progression");
                alert("Current notes not set. Can't add the chord to the progression");
            } else {
                const notes = [...Chord.notes]; // copy the notes
                this.chordsList.push(notes);    // Add the notes in the chord to the chordList
                console.log(`Add ${notes} to chordList`);
                const chordEle = this.getRepresentation(Chord.rootNoteName!, Chord.type, Chord.inversionNum, Chord.notes);
            chordListHolder.appendChild(chordEle); // attaches the div element to the chords holder.
            }
        }
    }

    /**
     * Reset the chord progression
     */
    resetChordProgression() {
        this.chordsList = [];   // Clear the chord list
        chordListHolder.innerHTML = "";  // Clear the note elements
        console.log("Chord list is reset")
    }


    /**
     * Plays through the chords using sequencers.
     */
    playChord() {
        this.onPlayChord(this.chordsList);
    }

    getRepresentation(rootNote: string, type: string, inversion: number, notes: Array<string>) { // Returns a div element that is put into the progression holder
        const chordRepresentation = document.createElement("div");
        chordRepresentation.classList.add("col-2", "chord-column");
        chordRepresentation.innerText = rootNote + " " + chordSymbols[type];
        chordRepresentation.dataset.type = type; // Sets info attached to div. These aren't  used at all.
        chordRepresentation.dataset.rootNote = rootNote;
        chordRepresentation.dataset.inversion = inversion.toString();
        chordRepresentation.dataset.notes = notes.toString();
        chordRepresentation.id = "chord-representation";
        chordRepresentation.addEventListener("pointerdown", () =>{ // adds the playable functionality whenever its clicked
            this.chordNameClicked(rootNote, type, inversion, notes); // Re add this once we get this fixed!!!
        });
        return chordRepresentation;

    }
}

const chordListHolder = document.createElement("div"); // Creates global variables to be accessed throughout.
chordListHolder.classList.add("row");

export {ChordProgression}
