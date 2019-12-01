import {Chord} from "./music-theory/Chord";

/**
 * Holds information for sequence of chords.
 */
export class ChordProgression {
    chordsList: Array<Chord>;
    curIndex: number;
    curChord: null | Chord;
    curBtn: null | HTMLElement;
    chordNameBtns: Array<HTMLElement>;
    onActivate: Function;

    constructor() {
        this.chordsList = [];   // An array to store each chord in the progression as an array of notes
        this.curIndex = -1;
        this.curChord = null;
        this.curBtn = null;
        this.chordNameBtns = [];

        // Callback events
        this.onActivate = function () {};

        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
        this._addEventListeners();
    }

    /**
     * Add event listeners to the elements
     * @private
     */
    private _addEventListeners(){
        const playBtn = document.getElementById("resetBtn")!;
        playBtn.addEventListener("pointerup", ()=> {
            this._reset();
        })
    }

    /**
     * Append an add button to the progression container
     * @private
     */
    private _appendAddBtn() {
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-chord");

        const btn = document.createElement("div");
        btn.classList.add("button-chord-name", "add", "shadow");

        const icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerText = "add";
        btn.appendChild(icon);

        btn.addEventListener("pointerup", () => {
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
    private _appendChord(chord: Chord, addBtn: HTMLElement | null) {
        if (this.curBtn !== null) {
            this.curBtn.parentElement!.classList.remove("active"); // Deactivate the current button
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

        console.log(`Append a new chord ${this.curChord} at ${this.curIndex}`);
    }

    /**
     * Append a delete button in the container
     * @param container
     * @private
     */
    private _appendDeleteBtn(container: HTMLElement) {
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn-chord-delete", "shadow-sm");

        const icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerText = "clear";
        deleteBtn.appendChild(icon);
        deleteBtn.addEventListener("pointerup", ()=>{
            this._delete(deleteBtn);
        });
        container.appendChild(deleteBtn);
    }

    /**
     * Append a chord name button to the container
     * @param container
     * @private
     */
    private _appendChordNameBtn(container: HTMLElement) {
        const btn = document.createElement("div");
        btn.classList.add("button-chord-name", "shadow");

        const text = document.createElement("div");
        this.curChord = new Chord();    // Initialize the current chord to a C4 major chord
        text.innerText = this.curChord.getChordName();  // Set the text to the name of the current chord
        btn.appendChild(text);

        btn.addEventListener("pointerup", ()=>{
            this._activate(btn);
        });
        container.appendChild(btn);
        this.chordNameBtns.push(btn);
        this.curBtn = btn;

        this.onActivate(this.curChord);
    }

    /**
     * Activate the chord name button. and setChord the current index, btn, and chord
     * @param chordNameBtn
     * @private
     */
    private _activate(chordNameBtn: HTMLElement){
        if (this.curBtn !== null) {
            this.curBtn.parentElement!.classList.remove("active"); // Deactivate the current button
        }
        this.curIndex = this.chordNameBtns.indexOf(chordNameBtn);
        this.curChord = this.chordsList[this.curIndex];
        chordNameBtn.parentElement!.classList.add("active");
        this.curBtn = chordNameBtn;
        console.log(`Activate chord ${this.curChord} at ${this.curIndex}`);

        this.onActivate(this.curChord);
    }

    /**
     * Delete the chord button that the delete button is in, and activate the adjacent chord if the current chord is activated
     * @param deleteBtn
     * @private
     */
    private _delete(deleteBtn: HTMLElement){
        const chordNameBtn = deleteBtn.previousSibling as HTMLElement;
        const index = this.chordNameBtns.indexOf(chordNameBtn);

        this.chordsList.splice(index, 1); // Remove the chord at index
        this.chordNameBtns.splice(index, 1);

        if (this.curIndex > index){ // Delete a button before current button
            this.curIndex -= 1; // Since an chord before has been removed, the current index decreased by 1
        } else if (this.curIndex == 0 && this.chordsList.length >= 1){  // Delete an active button at index 0
            this.curIndex = 0;
            this.curChord = this.chordsList[0];
            const newChordNameBtn = this.chordNameBtns[0];
            this._activate(newChordNameBtn);    // Activate the new button at index 0
        } else if (this.curIndex == index){ // Delete the last button
            this.curIndex -= 1; // Shift to previous item
            this.curChord = this.chordsList[this.curIndex]; // Update current chord
            if (this.curIndex >= 0){    // Activate the previous node if it exists
                const newChordNameBtn =  this.chordNameBtns[this.curIndex];
                this._activate(newChordNameBtn);
            }
        }
        console.log(`Delete chord at index ${index}. Change the chord to ${this.curChord} at ${this.curIndex}`);
        deleteBtn.parentElement!.remove(); // Remove the chord button that the delete btn is in
    }

    /**
     * Update the current chord, the chord list and the text of the current button
     * @param chord
     */
    public setChord(chord: Chord){
        this.curChord = chord;
        this.chordsList[this.curIndex] = chord;

        this._setChordName()
    }

    private _setChordName(){
        this.curBtn!.innerHTML = "";    // Reset text
        const text = document.createElement("div");
        if (this.curChord == null){
            throw new Error("curChord is null");
        }
        text.innerText = this.curChord.getChordName();  // Set the text to the name of the current chord
        this.curBtn!.appendChild(text);
    }

    public setChordType(family: string, type: string){
        if (this.curChord == null){
            throw new Error("curChord is null");
        }
        this.curChord.type = type;
        this.curChord.family = family;
        this.chordsList[this.curIndex] = this.curChord;

        this._setChordName();
    }

    public setInversion(inversion: number){
        if (inversion < 0){
            throw new Error("Invalid inversion, inversion < 0");
        }
        if (this.curChord == null){
            throw new Error("curChord is null");
        }
        this.curChord.inversionNum = inversion;
        this.chordsList[this.curIndex] = this.curChord;

        this._setChordName();
    }

    /**
     * Reset the chord progression, and initialize with a C chord
     * @private
     */
    private _reset(){
        // Clear data
        this.chordsList = [];
        this.curChord = null;
        this.curIndex = -1;
        this.curBtn = null;
        this.chordNameBtns = [];

        // Clear html
        const container = document.getElementById("progressionChordsContainer")!;
        container.innerHTML = ""; // Clear the progression
        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
    }
}
