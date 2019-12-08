import {Chord} from "../music-theory/Chord";

export class InversionBtn {
    static readonly inversionTypes: any = { // Assigns inversionIDs to strings.
        0: "None",
        1: "First",
        2: "Second",
        3: "Third",
        4: "Fourth",
        5: "Fifth",
        6: "Sixth"
    };

    onSetInversion: Function;
    btn: HTMLElement;

    constructor() {
        this._setInversionMenu(2); // renders the inversion dropdown

        this.btn = document.getElementById("chordInversionBtn")!;

        this.onSetInversion = function () {};
    }

    /**
     * Reset inversion btn to None, and menu items based on the chord length
     */
    public reset(chordLen: number) {
        this._setInverionBtn("None");
        this._setInversionMenu(chordLen - 1);
    }

    /**
     * Populate the items in the inversion menu from none to maxInversion
     * @param maxInversion
     */
    private _setInversionMenu(maxInversion: number) {
        const menu = document.getElementById("chordInversionDropdownMenu")!;
        menu.innerHTML = ""; // Remove all items
        if (maxInversion >= 3) { // Limits inversion to third (7th as root)
            maxInversion = 3;
        }
        for (let i = 0; i <= maxInversion; i++) {
            const item = document.createElement("a");
            item.classList.add("dropdown-item");
            item.dataset.inversion = i.toString();
            item.innerText = InversionBtn.inversionTypes[i];
            item.addEventListener("pointerup", e => {
                const btn = e.target as HTMLElement;
                const inversionName = btn.innerText;
                const inversionNum = parseInt(btn.dataset.inversion!);
                this._setInversion(inversionName, inversionNum);
            });

            menu.appendChild(item);
        }
    }

    /**
     * Set the inversion, and call the callback event
     * @param inversionName
     * @param inversionNum
     * @private
     */
    private _setInversion(inversionName: string, inversionNum: number) {
        this._setInverionBtn(inversionName);
        this.onSetInversion(inversionNum);
    }

    /**
     * Set the text on the inversion button
     * @param chord
     */
    public setInversionText(chord: Chord) {
        const inversionName = InversionBtn.inversionTypes[chord.inversionNum];
        this._setInverionBtn(inversionName);
        const chordLen = Chord.getLen(chord.family, chord.type);
        this._setInversionMenu(chordLen - 1);
    }

    /**
     * Set the text in the inversion button
     * @param inversionName
     */
    private _setInverionBtn(inversionName: string) {
        this.btn.innerText = inversionName;
    }

    /**
     * Disable clicking the button
     */
    public disable(){
        this.btn.classList.add("disabled");
    }

    /**
     * Enable clicking the button
     */
    public enable(){
        this.btn.classList.remove("disabled");
    }
}

