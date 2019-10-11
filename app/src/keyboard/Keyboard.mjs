import {KeyboardElement} from "./Element.mjs";

class Keyboard {
    constructor(container){
        this._container = container;
        this.maxId = 0;

        // The piano keyboard interface
        this._keyboardInterface = new KeyboardElement(container, 48, 2);
        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();
        this._bindSound();
    };

    _resize(){
        const keyWidth = 24;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 2);
        octaves = Math.min(octaves, 7);
        let baseNote = 0;
        if (octaves > 5){
            baseNote -= (octaves - 5) * 12;
        }
        this.maxId = baseNote + octaves * 12 - 1;
        this._keyboardInterface.resize(baseNote, octaves);  // Populate keys
    }

    _bindSound(){
        // let samples = {};
        //
        // for (let i = 1; i < 8; i++){
        //     for (let j = 0; j < 3; j ++){
        //         const octave = i.toString();
        //         const note = String.fromCharCode('A'.charCodeAt(0) + j);
        //         const pitch = `${note}${octave}`.toString();
        //         samples[pitch] = `${pitch}.mp3`;
        //     }
        // }
        // bind each key to trigger corresponding sound
        const sampler = new Tone.Sampler({
            "A0" : "A0.[mp3|ogg]",
            "C1" : "C1.[mp3|ogg]",
            "D#1" : "Ds1.[mp3|ogg]",
            "F#1" : "Fs1.[mp3|ogg]",
            "A1" : "A1.[mp3|ogg]",
            "C2" : "C2.[mp3|ogg]",
            "D#2" : "Ds2.[mp3|ogg]",
            "F#2" : "Fs2.[mp3|ogg]",
            "A2" : "A2.[mp3|ogg]",
            "C3" : "C3.[mp3|ogg]",
            "D#3" : "Ds3.[mp3|ogg]",
            "F#3" : "Fs3.[mp3|ogg]",
            "A3" : "A3.[mp3|ogg]",
            "C4" : "C4.[mp3|ogg]",
            "D#4" : "Ds4.[mp3|ogg]",
            "F#4" : "Fs4.[mp3|ogg]",
            "A4" : "A4.[mp3|ogg]",
            "C5" : "C5.[mp3|ogg]",
            "D#5" : "Ds5.[mp3|ogg]",
            "F#5" : "Fs5.[mp3|ogg]",
            "A5" : "A5.[mp3|ogg]",
            "C6" : "C6.[mp3|ogg]",
            "D#6" : "Ds6.[mp3|ogg]",
            "F#6" : "Fs6.[mp3|ogg]",
            "A6" : "A6.[mp3|ogg]",
            "C7" : "C7.[mp3|ogg]",
            "D#7" : "Ds7.[mp3|ogg]",
            "F#7" : "Fs7.[mp3|ogg]",
            "A7" : "A7.[mp3|ogg]",
            "C8" : "C8.[mp3|ogg]"
        }, {
            "release" : 1,
            "baseUrl" : "./app/audio/",
            "onload": function() {
                document.addEventListener('keydown', e => {
                    // Press a key on keyboard to trigger the corresponding sound
                    const noteId = "1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".indexOf(e.key);  // Get the note id bind by the key
                    let note = noteId % 12;
                    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                    note = chromatic[note];
                    const octave = Math.floor(noteId / 12) + 2;
                    console.log(`${note}${octave}`);
                    sampler.triggerAttackRelease(`${note}${octave}`, "4n");
                });

                for(let i = 0; i < 59; i++){
                    const key = document.getElementById(i.toString());
                    key.addEventListener('pointerup', e=>{
                        //TODO: pressing the last key does not trigger a sound
                        let note = i % 12;
                        const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                        note = chromatic[note];
                        const octave = Math.floor(i / 12) + 2;

                        sampler.triggerAttackRelease(`${note}${octave}`, "4n");

                    })
                }
            }
        }).toMaster();
    }
}

export {Keyboard}
