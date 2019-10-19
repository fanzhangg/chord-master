import {Note} from "./Note.mjs"

class ChordTypeSelector{
    constructor(container){
        this._renderView(container);
    }

    _renderView(container){
        const col = document.createElement("div");
        col.classList.add("col-md-12", "text-center");

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group", "btn-group-toggle");
        btnGroup.setAttribute("data-toggle", "buttons");

        for (let name of Note.chordNames){
            let radio = document.createElement('input');
            let label = document.createElement('label');
            radio.type = 'radio';
            radio.name = "chordTypeButton";
            radio.value = name;
            radio.setAttribute("autocomplete", "off");
            if (Note.chordNames[0] === name){
                radio.checked = true;
                label.classList.add("active");
            }

            label.setAttribute("for", name);
            label.classList.add("btn", "btn-primary");
            label.innerHTML = name.toUpperCase()[0] + name.slice(1);

            label.appendChild(radio);
            btnGroup.appendChild(label);
        }

        col.appendChild(btnGroup);
        container.appendChild(col);
    }
}

export {ChordTypeSelector}
