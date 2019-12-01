import {Chord} from "./music-theory/Chord";
import $ from "jquery";

/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    chordNameClicked: any;
    chordsList: Array<Chord>;
    curIndex: number;
    curChord: null | Chord;
    curBtn: null | HTMLElement;

    constructor() {
        this.chordsList = [];   // An array to store each chord in the progression as an array of notes
        this.curIndex = -1;
        this.curChord = null;
        this.curBtn = null;

        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
    }

    /**
     * Append an add button to the progression container
     * @private
     */
    private _appendAddBtn(){
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-chord");

        const btn = document.createElement("div");
        btn.classList.add("button-chord-name", "add", "shadow");

        const icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerText = "add";
        btn.appendChild(icon);

        btn.addEventListener("pointerup", ()=> {
            const chord = new Chord(48);
            this._appendChord(chord, btnContainer);
        });

        btnContainer.appendChild(btn);

        const progressionContainer = document.getElementById("progressionChordsContainer")!;
        progressionContainer.appendChild(btnContainer);
    }

    /**
     * Insert a chord in front of the add button
     * @param chord
     * @param addBtn
     * @private
     */
    private _appendChord(chord: Chord, addBtn: HTMLElement | null){
        if (this.curBtn !== null){
            this.curBtn.classList.remove("active"); // Deactivate the current button
        }

        this.chordsList.push(chord);
        this.curChord = chord;
        this.curIndex = this.chordsList.length - 1;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-chord", "active");

        this._appendChordNameBtn(btnContainer);
        this._appendDeleteBtn(btnContainer);

        const progressionContainer = document.getElementById("progressionChordsContainer")!;
        progressionContainer.insertBefore(btnContainer, addBtn);    // Insert the new chord btn before add btn

        this.curBtn = btnContainer;

        console.log(`Add chord ${chord}`);
        console.log(`curIndex: ${this.curIndex}`);
    }

    /**
     * Append a delete button in the container
     * @param container
     * @private
     */
    private _appendDeleteBtn(container: HTMLElement){
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn-chord-delete", "shadow-sm");

        const icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerText = "clear";
        deleteBtn.appendChild(icon);
        container.appendChild(deleteBtn);
    }

    /**
     * Append a chord name button to the container
     * @param container
     * @private
     */
    private _appendChordNameBtn(container: HTMLElement){
        const btn = document.createElement("div");
        btn.classList.add("button-chord-name", "shadow");
        btn.dataset.index = this.curIndex.toString();

        const text = document.createElement("div");
        if (this.curChord == null){
            throw new Error("curChord is null");
        }
        text.innerText = this.curChord.getChordName();
        btn.appendChild(text);
        container.appendChild(btn);
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
        chordRepresentation.dataset.rootKeyNum = rootNote;
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
