import "../third_party/jquery-3.4.1.js";
import {ChordProgression} from "../ChordProgression.mjs";

// import {Keyboard} from "/app/src/keyboard/Keyboard.mjs"


class ProgressionButtons {
    constructor(container) {
        this._renderView(container);
        this._keyDown();
    }

    _renderView(container){

        const btnGroup = document.createElement("div"); // Button group for the buttons.
        btnGroup.classList.add("btn-group");
        btnGroup.setAttribute("role", "group");
        btnGroup.id = "progressionBtnGroup";

        const labelBtnGroup = document.createElement("div"); // Button group for the label
        btnGroup.classList.add("btn-group");
        btnGroup.setAttribute("role", "group");
        btnGroup.id = "progressionLabelBtnGroup";

        this._renderLabel(labelBtnGroup);

        const addButton = document.createElement("button");
        addButton.classList.add("btn", "btn-secondary");
        addButton.id = "addBtn";
        addButton.innerText = "Add";
        btnGroup.appendChild(addButton);

        const playButton = document.createElement("button");
        playButton.classList.add("btn", "btn-secondary");
        playButton.id = "playBtn";
        playButton.innerText = "Play";
        btnGroup.appendChild(playButton);

        const resetButton = document.createElement("button");
        resetButton.classList.add("btn", "btn-secondary");
        resetButton.id = "resetBtn";
        resetButton.innerText = "Reset" ;
        btnGroup.appendChild(resetButton);

        container.appendChild(labelBtnGroup);
        container.appendChild(btnGroup);

    }

    _renderLabel(btnGroup){
        const label = document.createElement("span");
        label.innerText = "Progression";
        label.classList.add("text-muted", "btn");
        label.setAttribute("disabled", "true");
        btnGroup.appendChild(label);
    }

    _keyDown(){
        $("#addBtn").on("click", function () { // Add button logic
            console.log("Add Chord");
            ChordProgression.addChord()
        });

        $("#playBtn").on("click", function () {  // Play button logic
            console.log("Play progression");
            ChordProgression.playChord();

        });

        $("#resetBtn").on("click", function () {  // Play button logic
            console.log("Play progression");
            ChordProgression.resetChord();
        });
    }

}

export {ProgressionButtons}