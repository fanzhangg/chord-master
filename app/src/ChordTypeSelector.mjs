import {Chord} from "./Chord.mjs"

class ChordTypeSelector{
    constructor(container){
        this._renderView(container);
        this._onClick();
    }

    _renderView(container){
        const col = document.createElement("div");
        col.classList.add("col-md-12", "text-center");


        const invGroup = document.createElement("div"); // Inversion button group
        invGroup.classList.add("btn-group", "separated-group");
        invGroup.setAttribute("role", "group");


        const invDropdownButton = document.createElement("button"); // Creates inversion dropdown button

        invDropdownButton.setAttribute("type", "button");
        invDropdownButton.classList.add("btn", "btn-primary", "dropdown-toggle");
        invDropdownButton.setAttribute("data-toggle", "dropdown");
        invDropdownButton.id = "Inversion";
        invDropdownButton.innerText = "Inversion";
        invDropdownButton.href = "#";

        const invDropdown = document.createElement("div"); // dropdown menu
        invDropdown.classList.add("dropdown-menu", "dropdown-menu-for-inversions");

        const inversionNames = {
            0: "None",
            1: "First",
            2: "Second",
            3: "Third",
            4: "Fourth",
            5: "Fifth"
        };

        for (let i = 0; i < 4; i++) { // Adds each button to the inversion dropdown.
            const dropdownItem0 = document.createElement("a");   // Dropdown items for inversion. Subject to change.
            dropdownItem0.classList.add("dropdown-item");
            dropdownItem0.href = "#";
            dropdownItem0.innerText = inversionNames[i];
            dropdownItem0.id = i.toString();
            invDropdown.appendChild(dropdownItem0);
        }

        invGroup.appendChild(invDropdownButton);
        invGroup.appendChild(invDropdown);

        // nest dropdown in the button group
        // ref: https://getbootstrap.com/docs/4.3/components/button-group/
        const btnGroup = document.createElement("div"); // Button group
        btnGroup.classList.add("btn-group", "separated-group");
        btnGroup.setAttribute("role", "group");

        // Adds zero chord (single note)
        const zeroButton = document.createElement("button");
        btnGroup.appendChild(zeroButton);
        zeroButton.setAttribute("type", "button");
        zeroButton.classList.add("btn", "btn-primary", "single-btn", "active"); // automatically sets as active for bootstrap
        zeroButton.id = "Single Note";
        zeroButton.innerText = "Single Note";
        zeroButton.href = "#";

        for (let type in Chord.chords){  // Add each type as a drop down button
            console.log(`Create button for ${type}`);
            const button = document.createElement("button");    // button to trigger dropdown
            button.setAttribute("type", "button");
            button.classList.add("btn", "btn-primary", "dropdown-toggle");
            button.setAttribute("data-toggle", "dropdown");
            button.id = type;
            button.innerText = type;

            const dropdown = document.createElement("div"); // dropdown menu
            dropdown.classList.add("dropdown-menu", "dropdown-menu-for-chords");

            for (let name in Chord.chords[type]){    // Add each name to the type button
                const dropdownItem = document.createElement("a");   // dropdown item
                dropdownItem.classList.add("dropdown-item");
                dropdownItem.href = "#";
                dropdownItem.innerText = name;

                dropdown.appendChild(dropdownItem);
                console.log(`Create the dropdown item ${name}`)
            }

            const dropdownGroup = document.createElement("btn-div");
            dropdownGroup.classList.add("btn-group");
            dropdownGroup.setAttribute("role", "button");
            dropdownGroup.appendChild(button);
            dropdownGroup.appendChild(dropdown);
            btnGroup.appendChild(dropdownGroup)
        }

        col.appendChild(invGroup);
        col.appendChild(btnGroup);
        container.appendChild(col);
    }

    /**
     * Show select option in bootstrap dropdown menu
     * ref: https://jsfiddle.net/cmcculloh/xnpf1rr9/
     * @private
     */

    _onClick(){
        let inversionID = 0; // variable holds the number of inversion you are on
        $(".dropdown-menu a").filter(".dropdown-menu-for-inversions a").click(function(){ // Inversion drop-down
            inversionID = parseInt($(this).attr("id"), 10);   // Get the name of the chord type
            Chord.applyInversion(inversionID);
            // alert($(this).attr("id")); // this gets the id
        });
        // Selection for single button
        $(".single-btn").click(function(){
            $("#chord_type_frm").find(".btn").each(function () {  // Reset the text on the button to its id
                $(this).text((this).id);    // Change the text back to the chord type
                $(this).removeClass("active");  // Deactivate the button
            });
            $(".single-btn").addClass("active");
            Chord.setCurStepDirectly([0]);
        });
        // Selection for dropdown buttons
        $(".dropdown-menu a").filter(".dropdown-menu-for-chords a").click(function(){ //only selects the chord buttons
            let button = $(this).parent().parent().find(".btn").first(); // Get the button of the current dropdown menu
            let chordType = $(button).attr('id');   // Get the name of the chord type
            $("#chord_type_frm").find(".btn").each(function () {  // Reset the text on the button to its id
                $(this).text((this).id);    // Change the text back to the chord type
                $(this).removeClass("active");  // Deactivate the button
            });
            $(this).parent().parent().find('.btn').html($(this).text());    // Change the button's text to the selected one
            $(button).addClass("active");   // Active the selected button
            let chordName = $(this).text(); // Get the name of the chord
            Chord.setCurStep(chordType, chordName);
        });
    }
}

export {ChordTypeSelector}
