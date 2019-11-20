import {Chord} from "./chord";

export class ChordProgression{
    chords: Array<Array<string>>;
    curIndex: number;
    _container: HTMLElement;
    maxLen: 10;
    onChordDown: any;

    constructor(container: HTMLElement){
        this.chords = [];
        this.curIndex = 0;
        this.maxLen = 10;
        this._container = container;
        this._renderView(container);
        this.onChordDown = function(){};
    }

    _renderView(container: HTMLElement){
        const chordProgressionDiv = document.createElement("div");
        for (let i = 0; i < this.maxLen; i++){
            const chordDiv = document.createElement("div");
            chordDiv.dataset.index = i.toString();
            chordDiv.classList.add("chordName");
            chordDiv.innerText = "None";
            this._bindChordEvents(chordDiv);
            chordProgressionDiv.appendChild(chordDiv);
        }
        container.appendChild(chordProgressionDiv);
    }

    _bindChordEvents(chordDiv: HTMLDivElement){
        chordDiv.addEventListener("pointerdown", (e) => {
            this.onChordDown();

        })
    }

    public chordDown(chordName: string){
        console.log(`chordName: ${chordName}`);
    }

    appendChord(chordName: string){
        if (this.curIndex >= this.maxLen){
            console.warn("Input extends the max length");
            alert(`You can only input at most ${this.maxLen} chords!`);
        }
        const chordDiv = this._container.querySelectorAll(`.chordName[data-index="${this.curIndex}"]`)[0] as HTMLElement;
        chordDiv.innerText = chordName;
        chordDiv.dataset.chordName = chordName;
        this.curIndex += 1;
    }
}