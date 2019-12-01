export class InversionBtn{
    static readonly inversionTypes: any = { // Assigns inversionIDs to strings.
        0: "None",
        1: "First",
        2: "Second",
        3: "Third",
        4: "Fourth",
        5: "Fifth",
        6: "Sixth"
    };

    constructor() {
        this.setInversionMenu(2); // renders the inversion dropdown
    }

    /**
     * Populate the items in the inversion menu from none to maxInversion
     * @param maxInversion
     */
    setInversionMenu(maxInversion: number) {
        const menu = document.getElementById("chordInversionDropdownMenu")!;
        menu.innerHTML = ""; // Remove all items
        for (let i = 0; i <= maxInversion; i++){
            const item = document.createElement("a");
            item.classList.add("dropdown-item");
            item.dataset.inversion = i.toString();
            item.innerText = InversionBtn.inversionTypes[i];
            item.addEventListener("pointerup", e=> {
                const btn = e.target as HTMLElement;
                const inversion = btn.innerText;
                this.setInversion(inversion);
            });

            menu.appendChild(item);
        }
    }

    /**
     * Set the text in the inversion button
     * @param inversionName
     */
    public setInversion(inversionName: string){
        const btn = document.getElementById("chordInversionBtn")!;
        btn.innerText = inversionName;
    }
}

