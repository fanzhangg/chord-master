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

    constructor() {
        this.chordsList = [];   // An array to store each chord in the progression as an array of notes
        this.curIndex = -1;
        this.curChord = null;
        this.curBtn = null;
        this.chordNameBtns = [];

        this._appendChord(new Chord(48), null);
        this._appendAddBtn();
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
        btn.dataset.index = this.curIndex.toString();

        const text = document.createElement("div");
        if (this.curChord == null) {
            throw new Error("curChord is null");
        }
        text.innerText = this.curChord.getChordName();  // Set the text to the name of the current chord
        btn.appendChild(text);

        btn.addEventListener("pointerup", ()=>{
            this._activate(btn);
        });
        container.appendChild(btn);
        this.chordNameBtns.push(btn);
        this.curBtn = btn;
    }

    /**
     * Activate the chord name button. and update the current index, btn, and chord
     * @param chordNameBtn
     * @private
     */
    _activate(chordNameBtn: HTMLElement){
        if (this.curBtn !== null) {
            this.curBtn.parentElement!.classList.remove("active"); // Deactivate the current button
        }
        this.curIndex = this.chordNameBtns.indexOf(chordNameBtn);
        this.curChord = this.chordsList[this.curIndex];
        chordNameBtn.parentElement!.classList.add("active");
        this.curBtn = chordNameBtn;
        console.log(`Activate chord ${this.curChord} at ${this.curIndex}`);
    }
}
