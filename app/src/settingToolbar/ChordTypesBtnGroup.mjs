import {Chord} from "../Chord.mjs";

class ChordTypeBtnGroup{
    constructor(container){
        this._renderView(container);
    }

    _renderView(container){
        // nest dropdown in the button group
        // ref: https://getbootstrap.com/docs/4.3/components/button-group/
        const btnGroup = document.createElement("div"); // Button group
        btnGroup.classList.add("btn-group", "separated-group", "chord-name-group");
        btnGroup.setAttribute("role", "group");

        this._renderSingleNoteBtn(btnGroup);
        this._renderBtns(btnGroup);

        container.appendChild(btnGroup);
    }

    /**
     * Adds single note button to the group
     * @param btnGroup
     * @private
     */
    _renderSingleNoteBtn(btnGroup){
        const singleNoteBtn = document.createElement("button");
        btnGroup.appendChild(singleNoteBtn);
        singleNoteBtn.setAttribute("type", "button");
        singleNoteBtn.classList.add("btn", "btn-secondary", "single-btn", "active", "chord-type-button"); // automatically sets as active for bootstrap
        singleNoteBtn.id = "Single Note";
        singleNoteBtn.innerText = "Single Note";
        singleNoteBtn.href = "#";
    }

    /**
     * Add each chord family as a drop down button, chord types as item in the drop down menu of its family
     * @param btnGroup
     * @private
     */
    _renderBtns(btnGroup){
        for (let type in Chord.chords){  // Add each type as a drop down button
            const button = document.createElement("button");    // button to trigger dropdown
            button.setAttribute("type", "button");
            button.classList.add("btn", "btn-secondary", "dropdown-toggle", "chord-type-button");
            button.setAttribute("data-toggle", "dropdown");
            button.id = type;
            button.innerText = type;

            const dropdown = document.createElement("div"); // dropdown menu
            dropdown.classList.add("dropdown-menu");

            for (let name in Chord.chords[type]){    // Add each name to the type button
                const dropdownItem = document.createElement("a");   // dropdown item
                dropdownItem.classList.add("dropdown-item");
                dropdownItem.href = "#";
                dropdownItem.innerText = name;

                dropdown.appendChild(dropdownItem);
            }

            const dropdownGroup = document.createElement("btn-div");
            dropdownGroup.classList.add("btn-group");
            dropdownGroup.setAttribute("role", "button");
            dropdownGroup.appendChild(button);
            dropdownGroup.appendChild(dropdown);
            btnGroup.appendChild(dropdownGroup)
        }
    }

    _keydown(){

    }
}

export {ChordTypeBtnGroup}
