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
    static chordsList: Array<string> = [];
    chordNameClicked: any;

    constructor(container: HTMLElement) {
        this._renderView(container);
        this.chordNameClicked = function(){};

        this.addButtonLogic()
    }

    addButtonLogic() {
        $("#addBtn").on("click", e=> { // adds the logic for clicking.
            console.log("Add a new chord to progression");
            if (Chord.type == "Single"){
                console.warn("Single note, cannot be added to progression")
            } else {
                this.addChord();
            }
        })

        $("#playBtn").on("click", e=> {  // Play button logic
            console.log("Play progression");
            this.playChord();

        });

        $("#resetBtn").on("click", e=> {  // Play button logic
            console.log("Play progression");
            this.resetChord();
        });
    }

    _renderView(container: HTMLElement) {
        // Created chordListHolder out of the class so I can edit it everywhere.
        chordListHolder.classList.add("chord-list-holder");

        container.append(chordListHolder);
    }

    /**
     * Adds chord to chord list
     * @param chord
     */
    addChord() {
        let currentChordRepresentation = this.getRepresentation(Chord.rootNoteName as string, Chord.type, Chord.inversionNum, Chord.notes);
        if (ChordProgression.chordsList.length === 6) {
            alert("Progression List can not have length longer than six.")
        }
        else {
            ChordProgression.chordsList.push(Chord.type);
            chordListHolder.appendChild(currentChordRepresentation); // attaches the div element to the chords holder.
            // this.updateText();
        }
    }

    /**
     * Clears the list of chords
     */
    resetChord() {
        ChordProgression.chordsList = [];
        chordListHolder.innerHTML = ""
    }


    /**
     * Plays through the chords using sequencers.
     */
    playChord() {
        alert(ChordProgression.chordsList);
    }

    getRepresentation(rootNote: string, type: string, inversion: number, notes: Array<T>) { // Returns a div element that is put into the progression holder
        const chordRepresentation = document.createElement("div");
        chordRepresentation.classList.add("col-2", "chord-column");
        chordRepresentation.innerText = rootNote + " " + chordSymbols[type];
        chordRepresentation.dataset.type = type; // Sets info attached to div. These aren't  used at all.
        chordRepresentation.dataset.rootNote = rootNote;
        chordRepresentation.dataset.inversion = inversion.toString();
        chordRepresentation.dataset.notes = notes.toString();
        chordRepresentation.id = "chord-representation";
        chordRepresentation.addEventListener("pointerdown", e=>{ // adds the playable functionality whenever its clicked
            this.chordNameClicked(rootNote, type, inversion, notes); // Re add this once we get this fixed!!!
        });
        return chordRepresentation;

    }
}

const chordListHolder = document.createElement("div"); // Creates global variables to be accessed throughout.
chordListHolder.classList.add("row");
ChordProgression.chordsList = [];

export {ChordProgression}