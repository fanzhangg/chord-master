/* global Tone */
import {Tone} from "../third_party/Tone.js"

class Sampler {
    constructor(range={lower: 21, higher: 108}){
        this._player = null;

        this._loaded = false;   // If audio files are loaded
        // Call the load function to load audio
        AudioBuffer.on("load", () => {  // Callback when all buffers are loaded
            this._loaded=true
        });

        this._urls = this._setUrls();
    }

    _setUrls(){
        const urls = {};
        // A list of frequencies of every 3rd note on the piano from lower (always include) to higher
        const frequenciesLen = Math.floor((this.range.higher - range.lower) / 3);
        const frequencies = [...Array(frequenciesLen).keys()].map(x => x * 3 + range.lower);


        frequencies.forEach(frequency => {
            for (const i of [frequency-1, frequency, frequency+1]) { // Use same note to sample 3 adjacent notes
                const note = Tone.Frequency(frequency, "midi").toNote();    // convert frequency to note
                urls[i] = `${baseUrl}${note}.mp3` // Push the file's url to urls
            }
        });
        return urls;
    }

    load(){
        return new Promise( done => {
            this._player = new Tone.Player(this._urls, done).toMaster();
            this._player.fadeOut = 0.2;
        })
    }

    keyDown(note, time){
        if (this._loaded){
            let pitch = this._midiToFrequencyPitch(note);
            const duration = this._player.buffer.get(note).duration * 0.95;
            this._player.start(note, time, 0, duration - this._player.fadeOut, pitch);
        }
    }

    keyUp(note, time){
        if (this._loaded){
            this._player.stop(note, time);
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

