/* global Tone */
import "../third_party/Tone.js"

class Sampler {
    constructor(baseUrl = "", lowest=21, highest=108){
        this._lowest = lowest;
        this._highest = highest;
        this._baseUrl = baseUrl;

        this._player = null;

        this._loaded = false;   // If audio files are loaded
        // Call the load function to load audio
        Tone.Buffer.on("load", () => {  // Callback when all buffers are loaded
            console.log("loaded = True");
            this._loaded=true
        });

        this._urls = {"A0" : "A0.[mp3|ogg]",
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
            "C8" : "C8.[mp3|ogg]"};
    }

    _setUrls(){
        const urls = {};
        // A list of frequencies of every 3rd note on the piano from lower (always include) to higher
        const frequenciesLen = Math.floor((this._highest - this._lowest) / 3);
        const frequencies = [...Array(frequenciesLen).keys()].map(x => x * 3 + this._lowest);


        frequencies.forEach(frequency => {
            for (const i of [frequency-1, frequency, frequency+1]) { // Use same note to sample 3 adjacent notes
                let note = Tone.Frequency(frequency, "midi").toNote();    // convert frequency to note
                note = note.replace("#", "s");  // Replace # with s
                urls[i] = `${this._baseUrl}${note}.mp3` // Push the file's url to urls
            }
        });
        return urls;
    }

    load(){
        console.log("Loading the sound");
        return new Promise( done => {
            this._player = new Tone.Sampler(this._urls, {"baseUrl" : "./app/audio/",
                "onload": done}).toMaster();
            this._player.fadeOut = 0.2;
        })
    }

    keyDown(note, time){
        console.log(`${this._loaded}`);
        if (this._loaded){
            console.log(`Sampler plays ${note}`);
            this._player.triggerAttack(note);
            // let pitch = this._midiToFrequencyPitch(note);
            // const duration = this._player.buffer.get(note).duration * 0.95;
            // this._player.start(note, time, 0, duration - this._player.fadeOut, pitch);
        }
    }

    keyUp(note, time){
        if (this._loaded){
            this._player.triggerRelease(note);
        }
    }

     _midiToFrequencyPitch(midi){
        let mod = midi % 3;
        if (mod === 1){
            return 1
        } else if (mod === 2){
            return -1
        } else {
            return 0
        }
    }
}

export {Sampler}

