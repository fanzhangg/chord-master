import "../third_party/jquery-3.4.1.js";
import {Chord} from "../Chord.mjs";

class InversionTypeBtnGroup{
    constructor(container) {
        this.inversionTypes = {
            0: "None",
            1: "First",
            2: "Second",
            3: "Third",
            4: "Fourth",
            5: "Fifth"
        };

        this._renderView(container);
        this._keyDown();
    }

    _renderView(container) {
        const dropdown = document.createElement("div"); // Inversion button group
        dropdown.classList.add("dropdown");
        dropdown.id = "inversionTypeDropdown";

        const button = document.createElement("button");
        button.classList.add("btn", "btn-secondary", "dropdown-toggle");
        button.setAttribute("data-toggle", "dropdown");
        button.id = "inversionDropdownBtn";
        button.innerText = "None";

        dropdown.appendChild(button);

        this._renderDropdownMenu(dropdown);

        container.appendChild(dropdown);
    }

    _renderDropdownMenu(dropdown){
        const dropdownMenu = document.createElement("div");
        dropdownMenu.classList.add("dropdown-menu");
        dropdownMenu.classList.add("aria-labelledby", "dropdownMenuButton");
        dropdownMenu.id = "inversionDropdownMenu";

        for (let i = 0; i < 4; i++) { // Adds each button to the inversion dropdown.
            const dropdownItem = document.createElement("a");   // Dropdown items for inversion. Subject to change.
            dropdownItem.classList.add("dropdown-item");
            dropdownItem.innerText = this.inversionTypes[i];
            dropdownItem.id = i.toString();
            dropdownMenu.appendChild(dropdownItem);
        }

        dropdown.appendChild(dropdownMenu);
    }

    _keyDown(){
        let inversionID = 0;
        $("#inversionDropdownMenu").click(function(){
            inversionID = parseInt($(this).attr("id"), 10);   // Set the id of the inversion
            Chord.setInversionID(inversionID);
            $("#inversion_selector").text((this).innerText);
            $("#inversion_selector").addClass("active")
        })
    }
}

export {InversionTypeBtnGroup}

