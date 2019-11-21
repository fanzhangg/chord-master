import $ from "jquery";
import {Chord} from "../Chord";

class InversionTypeBtnGroup{
    constructor(container: HTMLElement) {
        this._renderView(container); // renders the inversion dropdown
        this._keyDown(); // adds dropdown logic
    }

    _renderView(container: HTMLElement) {

        const dropdown = document.createElement("div"); // Inversion button group
        dropdown.classList.add("dropdown", "ml-3");
        dropdown.id = "inversionTypeDropdown";

        const button = document.createElement("button");
        button.classList.add("btn", "btn-secondary", "dropdown-toggle", "disabled");    // Initially set disabled
        button.setAttribute("data-toggle", "dropdown");
        button.id = "inversionDropdownBtn";
        button.innerText = "None";

        this._renderLabel(dropdown);

        dropdown.appendChild(button);

        const dropdownMenu = document.createElement("div");
        dropdownMenu.classList.add("dropdown-menu");
        dropdownMenu.classList.add("aria-labelledby", "dropdownMenuButton");
        dropdownMenu.id = "inversionDropdownMenu";

        dropdown.appendChild(dropdownMenu);

        container.appendChild(dropdown);
    }

    _renderLabel(container: HTMLElement){
        const label = document.createElement("span");
        label.innerText = "Inversion:";
        label.classList.add("text-muted", "btn");
        label.setAttribute("disabled", "true");
        container.appendChild(label);
    }

    _keyDown(){
        $("#inversionDropdownMenu").on("click",e => {
            console.log("Item is clicked");
            const item = $(e.target);
            if (!item.is('a')){ // If the user clicks on the edge of the dropdown menu
                return false;
            }
            const inversionNum = parseInt($(item).attr("data-inversion-num") as string, 10);   // Get the number of the inversion
            Chord.inversionNum = inversionNum;  // Assign inversion num
            Chord.setHalfSteps();
            console.log(`Chord.inversionNum: ${Chord.inversionNum}`);
            const button = $("#inversionDropdownBtn");
            $(button).text(item.text());
            if (inversionNum === 0){    // Click on the None item
                $(button.removeClass("active"));    // Deactivate the button
            } else {
                $(button).addClass("active");   // Activate the button
            }

        })
    }
}

export {InversionTypeBtnGroup}

