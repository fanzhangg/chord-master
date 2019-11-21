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
 * Holds the chord information for each chord in the inversion.
 */
class InversionChord {
    rootNote: string
    type: string
    inversion: number
    
    constructor(rootNote: string, type: string, inversion: number) {
        this.rootNote = rootNote; // Holds the root note of the chord
        this.type = type; // Holds the type of chord
        this.inversion = inversion; // Holds the inversion of the piano keys to be played
    }

    getRepresentation() {  // Returns a div element that is put into the progression holder
        const chordRepresentation = document.createElement("div");
        chordRepresentation.classList.add("col-2", "chord-column");
        chordRepresentation.innerText = this.rootNote + " " + chordSymbols[this.type];
        chordRepresentation.dataset.type = this.type; // Sets notes attached to representation to be played later
        chordRepresentation.id = "chord-representation";
        // chordRepresentation.addEventListener("click", alert(this.type)); // Fix this!

        return chordRepresentation;
    }
}


/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    static chordsList: Array<Array<string>> = [];
    constructor(container: HTMLElement) {
        this._renderView(container);
        this._keyDown();
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
    static addChord() {
        let currentChord = new InversionChord(Chord.rootNoteName as string, Chord.type, Chord.inversionNum);  //  Update chord.mjs variables
        if (ChordProgression.chordsList.length === 6) {
            alert("Progression List can not have length longer than eight.")
        }
        else {
            if (Chord.notes === null){
                console.warn("Current notes not set. Can't add the chord to the progression");
                alert("Current notes not set. Can't add the chord to the progression");
            } else {
                ChordProgression.chordsList.push(Chord.notes as string[]);
                console.log(`ChordList: ${this.chordsList}`)
            chordListHolder.appendChild(currentChord.getRepresentation()); // attaches the div element to the chords holder.
            }
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

export {ChordProgression}