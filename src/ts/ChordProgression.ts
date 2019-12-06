import {Chord} from "./music-theory/Chord";
import {Transport} from "tone";

/**
 * Holds information for sequence of chords in the progression
 */
export class ChordProgression {
    chordsList: Array<Chord>;
    curIndex: number;
    curChord: null | Chord;
    curChordNameBtn: null | HTMLElement;
    chordNameBtns: Array<HTMLElement>;
    onActivate: Function;
    onPlay: Function;
    _playButton: HTMLElement;
    onSwitch: Function;
    onStop: Function;

    constructor() {
        this.chordsList = [];   // An array to store each chord in the progression as an array of notes
        this.curIndex = -1; // The current index of the chord in the list
        this.curChord = null; // The current chord
        this.curChordNameBtn = null; // The current chord name button
        this.chordNameBtns = [];    // An array of chord name buttons

        this._playButton = document.getElementById("playBtn")!; // The button to play the chord progression

        // Callback events
        this.onActivate = function () {};
        this.onPlay = function () {};
        this.onSwitch = function () {};
        this.onStop = function() {};

        // Initialize the progression with an add button and a C chord
        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
        this._addEventListeners();
    }

    /**
     * Add event listeners to the elements
     * @private
     */
    private _addEventListeners() {
        const resetBtn = document.getElementById("resetBtn")!;
        resetBtn.addEventListener("pointerup", () => {
            if (!resetBtn.classList.contains("disabled")){
                this._reset();
            }

        });

        this._playButton.addEventListener("pointerup", () => {
            this._toggleProgression();
        });

        const copyBtn = document.getElementById("copyBtn")!;
        copyBtn.addEventListener("pointerup", () => {
            if (!copyBtn.classList.contains("disabled")){
                this._insertChord(this.curChord!, this.curIndex+1);
            }

        });
    }

    /**
     * Remove the add btn from the container
     * @private
     */
    private _removeAddBtn() {
        const addButton = document.getElementById("addBtn");
        if (addButton == null){
            throw new Error("addBtn does not exist. Cannot delete")
        }
        addButton.remove();
    }

    /**
     * Append an add button to the progression container
     * @private
     */
    private _appendAddBtn() {
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-chord");
        btnContainer.id = "addBtn";

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
        if (this.curChordNameBtn !== null) {
            this.curChordNameBtn.parentElement!.classList.remove("active"); // Deactivate the current button
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

        this._disableDeleteFirstChord();
    }

    private _insertChord(chord: Chord, index: number) {
        if (this.curChordNameBtn !== null) {
            this.curChordNameBtn.parentElement!.classList.remove("active"); // Deactivate the current button
        }

        this.chordsList.splice(index, 0, chord);
        this.curChord = chord;
        this.curIndex = index;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-chord", "active");

        this._insertChordNameBtn(btnContainer, index);
        this._appendDeleteBtn(btnContainer);

        const prevButton = this.chordNameBtns[index-1];

        const progressionContainer = document.getElementById("progressionChordsContainer")!;
        progressionContainer.insertBefore(btnContainer, prevButton.parentElement!.nextSibling);    // Insert the new chord btn before add btn

        console.log(`Insert a new chord ${this.curChord} at ${this.curIndex}`);

        this._disableDeleteFirstChord();
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
        deleteBtn.addEventListener("pointerup", () => {
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
        text.innerHTML = this.curChord.getChordName();  // Set the text to the name of the current chord
        btn.appendChild(text);

        btn.addEventListener("pointerup", () => {
            this._activate(btn);
        });
        container.appendChild(btn);
        this.chordNameBtns.push(btn);
        this.curChordNameBtn = btn;

        this.onActivate(this.curChord);
    }

    /**
     * Append a chord name button to the container
     * @param container
     * @private
     */
    private _insertChordNameBtn(container: HTMLElement, index: number) {
        const btn = document.createElement("div");
        btn.classList.add("button-chord-name", "shadow");

        const text = document.createElement("div");
        this.curChord = new Chord();    // Initialize the current chord to a C4 major chord
        text.innerHTML = this.curChord.getChordName();  // Set the text to the name of the current chord
        btn.appendChild(text);

        btn.addEventListener("pointerup", () => {
            this._activate(btn);
        });
        container.appendChild(btn);
        this.chordNameBtns.splice(index, 0, btn);
        this.curChordNameBtn = btn;

        this.onActivate(this.curChord);
    }

    public switch(){
        let btnIndex = 0;
        if (this.curIndex >= this.chordsList.length - 1){
            btnIndex = 0;
        } else {
            btnIndex = this.curIndex + 1;
        }
        const newBtn = this.chordNameBtns[btnIndex];
        this._activate(newBtn);
        this.onSwitch();
    }

    /**
     * Activate the chord name button. and setChord the current index, btn, and chord
     * @param chordNameBtn
     * @private
     */
    private _activate(chordNameBtn: HTMLElement) {
        if (this.curChordNameBtn !== null) {    // Current Chord name button exists
            this.curChordNameBtn.parentElement!.classList.remove("active"); // Deactivate the current button
        }
        this.curIndex = this.chordNameBtns.indexOf(chordNameBtn);
        this.curChord = this.chordsList[this.curIndex];
        chordNameBtn.parentElement!.classList.add("active");    // Active the button
        this.curChordNameBtn = chordNameBtn;
        console.log(`Activate chord ${this.curChord} at ${this.curIndex}`);

        this.onActivate(this.curChord);
    }

    /**
     * Disable deleting the chord at index by deleting the delete button in the chord button
     * @param index
     * @private
     * @return true if it deletes, else false
     */
    private _disableDelete(index: number): boolean{
        const button = this.chordNameBtns[index];
        if (button == null){
            throw new Error("Button does not exist. Cannot disable deleting");
        }

        const deleteButton = button.nextElementSibling;
        if (deleteButton == null){
            console.warn("The chord button does not have a delete button. Cannot disable deleting");
            return false;
        }
        deleteButton.remove();
        return true;
    }

    /**
     * Disable deleting on all chords
     * @private
     */
    private _disableDeleteAll(){
        for (let i = 0; i < this.chordNameBtns.length; i++){
            this._disableDelete(i);
        }
    }

    /**
     * Enable deleting on all chords
     * @private
     */
    private _enableDeleteAll(){
        for (let chordNameBtn of this.chordNameBtns){
            const container = chordNameBtn.parentElement;
            if (container == null){
                throw new Error("The chord name button does not have a container. Cannot enable deleting");
            }
            this._appendDeleteBtn(container);
        }
    }

    /**
     * Disable deleting the first chord if the chord's length <= 1
     * @private
     */
    private _disableDeleteFirstChord(){
        if (this.chordsList.length <= 1){
            const button = this.chordNameBtns[0];
            const deleteButton = button.nextElementSibling!;
            deleteButton.remove();
            console.log("The first delete button is deleted")
        } else {
            const button = this.chordNameBtns[0];
            if (button.nextElementSibling !== null){    // The button has a delete button
                return; // Not add a new delete button
            }
            // Add a delete button
            const container = button.parentElement!;
            this._appendDeleteBtn(container);
            console.log("The first delete button is added")
        }
    };

    /**
     * Delete the chord button that the delete button is in, and _activate the adjacent chord if the current chord is activated
     * @param deleteBtn
     * @private
     */
    private _delete(deleteBtn: HTMLElement) {
        const chordNameBtn = deleteBtn.previousSibling as HTMLElement;
        const index = this.chordNameBtns.indexOf(chordNameBtn);

        this.chordsList.splice(index, 1); // Remove the chord at index
        this.chordNameBtns.splice(index, 1);

        if (this.curIndex > index) { // Delete a button before current button
            this.curIndex -= 1; // Since an chord before has been removed, the current index decreased by 1
        } else if (this.curIndex == 0 && this.chordsList.length >= 1) {  // Delete an active button at index 0
            this.curIndex = 0;
            this.curChord = this.chordsList[0];
            const newChordNameBtn = this.chordNameBtns[0];
            this._activate(newChordNameBtn);    // Activate the new button at index 0
        } else if (this.curIndex == index) { // Delete the last button
            this.curIndex -= 1; // Shift to previous item
            this.curChord = this.chordsList[this.curIndex]; // Update current chord
            if (this.curIndex >= 0) {    // Activate the previous node if it exists
                const newChordNameBtn = this.chordNameBtns[this.curIndex];
                this._activate(newChordNameBtn);
            }
        }
        console.log(`Delete chord at index ${index}. Change the chord to ${this.curChord} at ${this.curIndex}`);
        deleteBtn.parentElement!.remove(); // Remove the chord button that the delete btn is in

        this._disableDeleteFirstChord();
    }

    /**
     * Update the current chord, the chord list and the text of the current button
     * @param chord
     */
    public setChord(chord: Chord) {
        this.curChord = chord;
        this.chordsList[this.curIndex] = chord;

        this._setChordName()
    }

    /**
     * Set the name of the current chord
     * @private
     */
    private _setChordName() {
        this.curChordNameBtn!.innerHTML = "";    // Reset text
        const text = document.createElement("div");
        if (this.curChord == null) {
            throw new Error("curChord is null");
        }
        text.innerHTML = this.curChord.getChordName();  // Set the text to the name of the current chord
        this.curChordNameBtn!.appendChild(text);
    }

    /**
     * Set the type and family of the current chord
     * @param family
     * @param type
     */
    public setChordType(family: string, type: string) {
        if (this.curChord == null) {
            throw new Error("curChord is null");
        }
        this.curChord.type = type;
        this.curChord.family = family;
        this.chordsList[this.curIndex] = this.curChord;

        this._setChordName();
    }

    /**
     * Set the inversion of the current chord
     * @param inversion
     */
    public setInversion(inversion: number) {
        if (inversion < 0) {
            throw new Error("Invalid inversion, inversion < 0");
        }
        if (this.curChord == null) {
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
    private _reset() {
        // Clear data
        this.chordsList = [];
        this.curChord = null;
        this.curIndex = -1;
        this.curChordNameBtn = null;
        this.chordNameBtns = [];

        // Clear html
        const container = document.getElementById("progressionChordsContainer")!;
        container.innerHTML = ""; // Clear the progression
        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
    }

    /**
     * Return an array of an array of notes in the chord
     * @private
     */
    private _getNotesList() {
        const notesList = [];
        for (let chord of this.chordsList) {
            const notes = chord.getNotes();
            notesList.push(notes);
        }
        return notesList;
    }

    /**
     * Play the progression if it is not played, otherwise stop it
     * @private
     */
    private _toggleProgression() {
        if (Transport.state === 'started') {
            this._playButton.innerHTML = "<i class=\"fas fa-play\"></i>";
            this._playButton.classList.remove("active");
            Transport.stop();
            this._appendAddBtn();
            this._enableDeleteAll();
            this._enableReset();
            this._enableCopy();
            this.onStop();
        } else {
            this._playButton.innerHTML = "<i class=\"fas fa-pause\"></i>";
            this._playButton.classList.add("active");
            Transport.start('+0.1');
            const notesList = this._getNotesList();
            this._removeAddBtn();
            this._disableDeleteAll();
            this._disableReset();
            this._disableCopy();
            this.onPlay(notesList);
        }
    }

    /**
     * Disable the reset button
     * @private
     */
    private _disableReset(){
        const resetBtn = document.getElementById("resetBtn")!;
        resetBtn.classList.add("disabled");
    }

    /**
     * Enable the reset button
     * @private
     */
    private _enableReset(){
        const resetBtn = document.getElementById("resetBtn")!;
        resetBtn.classList.remove("disabled");
    }

    /**
     * Disable the reset button
     * @private
     */
    private _disableCopy(){
        const copyBtn = document.getElementById("copyBtn")!;
        copyBtn.classList.add("disabled");
    }

    /**
     * Enable the reset button
     * @private
     */
    private _enableCopy(){
        const copyBtn = document.getElementById("copyBtn")!;
        copyBtn.classList.remove("disabled");
    }
}
