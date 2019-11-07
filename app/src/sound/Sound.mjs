import {Tone} from "../third_party/Tone.js"

class Sound {
    constructor(lowest, highest){
        this._range = {
            lowest: lowest,
            highest: highest
        };
        // make the samples loaded a range of audios
        this._piano = new Tone.Sampler("audio/", [lowest, highest]);
    }

    load(){
        // return promise after resolving loading the sampler
        return Promise.all([this._piano.load()]);
    }

    keyDown(note, time=Tone.now()){
        if (note >= this._range.lowest && note <= this._range.highest){
            // The note is in the range of audios
            this._piano.keyDown(note, time);
        }
    }

    keyUp(note, time=Tone.now()){
        if (note >= this._range.lowest && note <= this._range.highest){
            time += 0.05;
            this._piano.keyUp(note, time);
        }
    }
}

export {Sound}
