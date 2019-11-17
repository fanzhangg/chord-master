import {Chord} from "../Chord";

class ChordTypeBtnGroup{
    chordFamilies: any;

    constructor(container: HTMLElement){
        this.chordFamilies = {
            "Triads": {  // chord with 3 notes
                "Major Triad": [0, 4, 7],
                "Minor Triad": [0, 3, 7],
                "Augmented Triad": [0, 4, 8],
                "Diminished Triad": [0, 3, 6]
            },
            "Sevenths": {   // triads with a 7th added on
                "Dominant Seventh": [0, 4, 7, 10],
                "Major Seventh": [0, 4, 7, 11], // C E G B
                "Minor Seventh": [0, 3, 7, 10],
                "Diminished Seventh": [0, 3, 6, 9], // C E♭ G♭ B♭♭
                "Half Diminished Seventh": [0, 3, 6, 10],
                "Augmented Seventh": [0, 4, 8, 10], // C E G♯ B♭
                "Augmented Major Seventh": [0, 4, 8, 11] // C E G♯ B
            },
            "Extended": {
                "Dominant Ninth": [0, 4, 7, 10, 14],    // C E G B♭ D
                "Dominant Seventh": [0, 4, 7, 10, 14, 16],  // C E G B♭ D F WRONG FIX!
                "Dominant Thirteenth": [0, 4, 7, 10, 14, 16, 20] // C E G B♭ D F A
            },
            "Altered": {
                "Seventh Augmented Fifth": [0, 4, 8, 10],   // C E G♯ B♭
                "Seventh Minor Ninth": [0, 4, 7, 10, 13],   // C E G B♭ D♭
                "Seventh Sharp Ninth": [0, 4, 7, 10, 15],  // C E G B♭ D♯
                "Seventh Augmented Eleventh": [0, 4, 7, 10, 14, 17],   // C E G B♭ D F♯
            }
        };
        this._renderView(container);
        this._keydown();
    }

    /**
     * Render the btn-group view in the container
     * @param container
     * @private
     */
    _renderView(container: HTMLElement){
        // nest dropdown in the button group
        // ref: https://getbootstrap.com/docs/4.3/components/button-group/
        const btnGroup = document.createElement("div"); // Button group
        btnGroup.classList.add("btn-group");
        btnGroup.setAttribute("role", "group");
        btnGroup.id = "chordTypeBtnGroup";

        this._renderLabel(container);
        this._renderSingleNoteBtn(btnGroup);
        this._renderBtns(btnGroup);

        container.appendChild(btnGroup);
    }

    _renderLabel(btnGroup: HTMLElement){
        const label = document.createElement("span");
        label.innerText = "Type:";
        label.classList.add("text-muted", "btn");
        label.setAttribute("disabled", "true");
        btnGroup.appendChild(label);
    }

    /**
     * Adds single note button to the group to play one note at a time.
     * @param btnGroup
     * @private
     */
    _renderSingleNoteBtn(btnGroup: HTMLElement){
        const singleNoteBtn = document.createElement("button");
        btnGroup.appendChild(singleNoteBtn);
        singleNoteBtn.setAttribute("type", "button");
        singleNoteBtn.classList.add("btn", "btn-secondary", "single-btn", "active", "chord-type-button"); // automatically sets as active for bootstrap
        singleNoteBtn.id = "singleNoteBtn";
        singleNoteBtn.dataset.chordFamily = "Single Note";
        singleNoteBtn.innerText = "Single Note";
    }

    /**
     * Add each chord family as a drop down button, chord types as item in the drop down menu of its family
     * @param btnGroup
     * @private
     */
    _renderBtns(btnGroup: HTMLElement){
        console.log("Render buttons");
        for (let family in this.chordFamilies){  // Add each type as a drop down button
            const button = document.createElement("button");    // button to trigger dropdown
            button.setAttribute("type", "button");
            button.classList.add("btn", "btn-secondary", "dropdown-toggle");
            button.setAttribute("data-toggle", "dropdown");
            button.dataset.chordFamily = family;
            button.innerText = family;

            const dropdown = document.createElement("div"); // dropdown menu
            dropdown.classList.add("dropdown-menu");

            for (let type in this.chordFamilies[family]){    // Adds each chord name to the type button
                const dropdownItem = document.createElement("a");   // dropdown item
                dropdownItem.classList.add("dropdown-item");
                dropdownItem.href = "#";
                dropdownItem.innerText = type;
                dropdownItem.dataset.chordType = type;

                dropdown.appendChild(dropdownItem); // adds this chord name button to the type dropdown.
            }

            const dropdownGroup = document.createElement("btn-div");
            dropdownGroup.classList.add("btn-group");
            dropdownGroup.setAttribute("role", "button");
            dropdownGroup.appendChild(button); //adds the dropdown button to the group
            dropdownGroup.appendChild(dropdown); //adds the actual dropdown to the group (bootstrap takes care of connecting the two)
            btnGroup.appendChild(dropdownGroup) // adds the dropdown to the chord type group.
        }
    }

    /**
     * Handle events when the user clicks on a dropdown menu item
     * @private
     */
    _keydown() {
        const group = this;
        $("#chordTypeBtnGroup a").click(function () {
            group._resetBtnsText();  // Reset button's text to its id

            const inversionBtn = $("#inversionDropdownBtn");
            $(inversionBtn).attr("data-toggle", "dropdown");    // Enable dropdown
            $(inversionBtn).removeClass("disabled");    // Enable the button
            //TODO: change the dropdown items based on the chord family

            let button = $(this).parent().parent().find(".btn").first();    // Get the button the menu belongs to
            const chordFamily = $(button).attr("data-chord-family"); // Get the chord family from data attribute
            const chordType = $(this).attr("data-chord-type");  // Get the chord type from data attribute

            $(button).html(chordType as string);    // Change the button's text to the selected chord type
            $(button).addClass("active");   // Active the selected button

            Chord.type = chordType as string;
            Chord.family = chordFamily as string;
            Chord.setHalfSteps();   // Set the half steps of the chord

            const inversionMenu = $("#inversionDropdownMenu");
            inversionMenu.empty();

            $("#chordTypeBtnGroup a").on("click", function () {
                $("#inversionDropdownBtn").text("None"); // Changes text.
                Chord.inversionNum = 0;
                Chord.setHalfSteps();
            });

            group._changeInversionDropdownItems(inversionMenu);
            console.log(`Chord.type: ${Chord.type}, curSteps: ${Chord.halfSteps}, family: ${Chord.family}`);
        });

        this._keyDownOnSingleNoteBtn();
    }

    _changeInversionDropdownItems(dropdownMenu: JQuery<HTMLElement>){
        const inversionTypes : any = { // Assigns inversionIDs to strings.
            0: "None",
            1: "First",
            2: "Second",
            3: "Third",
            4: "Fourth",
            5: "Fifth",
            6: "Sixth"
        };
        let totalInversionNum = Chord.getHalfSteps().length;

        for (let i = 0; i < totalInversionNum; i++) { // Adds each button to the inversion dropdown.
            const dropdownItem = document.createElement("a");   // Dropdown items for inversion. Subject to change.
            dropdownItem.classList.add("dropdown-item");
            dropdownItem.href = "#";
            if (i <= 6){
                dropdownItem.innerText = inversionTypes[i]; // Changes text to string from dictionary above
            }
            
            dropdownItem.dataset.inversionNum = i.toString();   // Store the inversion number
            dropdownMenu.append(dropdownItem);
        }
    }

    /**
     * Handle the event when the user clicks on the Single Note Btn
     * @private
     */
    _keyDownOnSingleNoteBtn(){
        const group = this;
        $("#singleNoteBtn").click( function () {
            group._resetBtnsText();

            const inversionBtn = $("#inversionDropdownBtn");
            $(inversionBtn).attr("data-toggle", "");    // Disable dropdown
            $(inversionBtn).addClass("disabled");   // Disable the button

            $(this).addClass("active"); // activate the button

            Chord.halfSteps = [0];   // Update the curStep to a single note
            Chord.type = "Single";
            Chord.family = null;
            Chord.inversionNum = 0;
            console.log(`Chord.type: ${Chord.type}, curSteps: ${Chord.halfSteps}, family: ${Chord.family}, inversionNum: ${Chord.inversionNum}`);

            $("#inversionDropdownBtn").text("None"); // Changes text.

            }
        )
    }

    /**
     * Reset button's text to its id
     * @private
     */
    _resetBtnsText(){
        $("#chordTypeBtnGroup").find(".btn").each(function(){
            const chordType = $(this).attr("data-chord-family");  // Get the chord type from data attribute
            $(this).text(chordType as string);    // Change the text back to the chord type
            $(this).removeClass("active");  // Deactivate the button
        });
    }
}

export {ChordTypeBtnGroup}
