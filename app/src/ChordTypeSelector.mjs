import {Note} from "./Note.mjs"

class ChordTypeSelector{
    constructor(container){
        this._renderView(container);
    }

    _renderView(container){
        const col = document.createElement("div");
        col.classList.add("col-md-12", "text-center");

        // nest dropdown in the button group
        // ref: https://getbootstrap.com/docs/4.3/components/button-group/
        const btnGroup = document.createElement("div"); // Button group
        btnGroup.classList.add("btn-group");
        btnGroup.setAttribute("role", "group");

        for (let type in Note.chords){  // Add each type as a drop down button
            console.log(`Create button for ${type}`);
            const button = document.createElement("button");    // button to trigger dropdown
            button.setAttribute("type", "button");
            button.classList.add("btn", "btn-secondary", "dropdown-toggle");
            button.setAttribute("data-toggle", "dropdown");
            button.id = type;
            button.innerText = type;

            const dropdown = document.createElement("div"); // dropdown menu
            dropdown.classList.add("dropdown-menu");

            for (let name in Note.chords[type]){    // Add each name to the type button
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

        col.appendChild(btnGroup);
        container.appendChild(col);
    }
}

export {ChordTypeSelector}
