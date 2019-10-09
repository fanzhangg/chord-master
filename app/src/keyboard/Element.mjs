const offsets = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];

class KeyboardElement{
    constructor(container, lowest=36, octaves=4){
        this._container = document.createElement('div');
        this._container.id = 'keyboard';
        container.setAttribute('touch-action', 'none');
        container.appendChild(this._container);

        this._keys = {};
        this.resize(lowest, octaves);
    }

    resize(lowest, octaves){
        this._keys = {};
        // clear the previous ones
        this._container.innerHTML = '';
        const keyWidth = (1 / 7) / octaves;
        for (let i = lowest; i < lowest + octaves * 12; i++){
            let key = document.createElement('div');    // Add a div for a key
            key.classList.add('key');
            let isSharp = ([1, 3, 6, 8, 10].indexOf(i % 12) !== -1);    // A key is sharp if the note it represents is a sharp note
            if (isSharp){
                key.classList.add('black');
            } else {
                key.classList.add('white');
            }
            this._container.appendChild(key);   // Add each key as the child of 'keyboard' class

            let noteOctave = Math.floor(i / 12) - Math.floor(lowest / 12);
            let offset = offsets[i % 12] + noteOctave * 7;
            key.style.width = `${keyWidth * 100}%`;
            key.style.left = `${offset * keyWidth * 100}%`;
            key.id = i.toString();
            key.setAttribute('touch-action', 'none');

            const fill = document.createElement('div');
            fill.id = 'fill';
            key.appendChild(fill);

            this._keys[i] = key;    // Add key to the keys list
        }
    }
}

export {KeyboardElement};
