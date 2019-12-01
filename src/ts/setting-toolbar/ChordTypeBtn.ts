import {Chord} from "../music-theory/Chord";
import $ from "jquery";

export class ChordTypeBtnGroup{
    onSetChordType: Function;
    constructor(){
        const menuContainer = document.getElementById("chordTypeDropdownMenu")!;
        this._renderDropdownMenu(menuContainer);
        // @ts-ignore
        $('[data-submenu]').submenupicker();

        this.onSetChordType = function(){};
        // this._clickMenuItems();
    }

    /**
     * Render the btn-group view in the container
     * @param container
     * @private
     */
    private _renderDropdownMenu(container: HTMLElement){
        // nest dropdown in the button group
        // ref: https://getbootstrap.com/docs/4.3/components/button-group/
        for (let family in Chord.chordFamilies){
            const submenu = document.createElement("div");
            submenu.classList.add("dropdown", "dropright", "dropdown-submenu");

            const familyBtn = document.createElement("button");
            familyBtn.classList.add("dropdown-item", "dropdown-toggle");
            familyBtn.setAttribute("type", "button");
            familyBtn.setAttribute("data-toggle", "dropdown");
            familyBtn.dataset.family = family;
            familyBtn.innerText = family;
            submenu.appendChild(familyBtn);

            const typesMenu = document.createElement("div");
            typesMenu.classList.add("dropdown-menu");
            for (let type in Chord.chordFamilies[family]){
                const typeBtn = document.createElement("button");
                typeBtn.classList.add("dropdown-item");
                typeBtn.setAttribute("type", "button");
                typeBtn.innerText = type;
                typeBtn.dataset.family = family;
                typeBtn.dataset.type = type;
                typeBtn.addEventListener("pointerup", e=>{
                   const btn = e.target as HTMLElement;
                   const type = btn.dataset.type!;
                   this._setChordType(type);
                });
                typesMenu.appendChild(typeBtn);
            }
            submenu.appendChild(typesMenu);

            container.appendChild(submenu);
        }
    }

    private _setChordType(type: string){
        // Change the text of the chord type
        const btn = document.getElementById("chordTypeBtn")!;
        btn.innerText = type;
        this.onSetChordType(type);
    }
}
