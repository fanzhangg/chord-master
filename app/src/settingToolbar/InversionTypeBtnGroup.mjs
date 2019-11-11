import "../third_party/jquery-3.4.1.js";
import {Chord} from "../Chord.mjs";

class InversionTypeBtnGroup{
    constructor(container) {
        this.currentInversionID = 0;

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

        // const dropdownItem = document.createElement("a");   // Dropdown items for inversion. Subject to change.
        // dropdownItem.classList.add("dropdown-item");
        // dropdownItem.href = "#";
        // dropdownItem.innerText = "None";
        // dropdownItem.dataset.inversionNum = "0";   // Store the inversion number
        // dropdownMenu.appendChild(dropdownItem);

        // this._renderDropdownMenu(dropdown);

        container.appendChild(dropdown);
    }

    _renderLabel(container){
        const label = document.createElement("span");
        label.innerText = "Inversion:";
        label.classList.add("text-muted", "btn");
        label.setAttribute("disabled", "true");
        container.appendChild(label);
    }



    _renderDropdownMenu(dropdownMenu){
        // const dropdownMenu = document.createElement("div");
        // dropdownMenu.classList.add("dropdown-menu");
        // dropdownMenu.classList.add("aria-labelledby", "dropdownMenuButton");
        // dropdownMenu.id = "inversionDropdownMenu";

        let totalInversionNum = Chord.getHalfSteps().length;

        for (let i = 0; i < totalInversionNum; i++) { // Adds each button to the inversion dropdown.
            const dropdownItem = document.createElement("a");   // Dropdown items for inversion. Subject to change.
            dropdownItem.classList.add("dropdown-item");
            dropdownItem.href = "#";
            dropdownItem.innerText = this.inversionTypes[i];
            dropdownItem.dataset.inversionNum = i.toString();   // Store the inversion number
            dropdownMenu.appendChild(dropdownItem);
        }

        // dropdown.appendChild(dropdownMenu);
    }

    _keyDown(){
        // const inversionTypeBtnGroup = this;

        // $("#inversionDropdownBtn").click(function(){
        //    //  $("#inversionDropdownMenu").remove();
        //     const dropdown = document.getElementById("inversionTypeDropdown");
        //     const menu = $("#inversionDropdownMenu");
        //     menu.empty();
        //     inversionTypeBtnGroup._renderDropdownMenu(menu);
        // });
        // $("#inversionDropdownMenu").click(function () {
        //     console.log("Inversion dropdown menu is clicked");
        // });

        $("#inversionDropdownMenu").on("click",e=>{
            console.log("Item is clicked");
            const item = $(e.target);
            const inversionNum = parseInt($(item).attr("data-inversion-num"), 10);   // Get the number of the inversion
            Chord.inversionNum = inversionNum;  // Assign inversion num
            Chord.setHalfSteps(inversionNum);
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

