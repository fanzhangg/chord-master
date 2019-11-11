/* global Tone */

import "../third_party/Tone.js"
import {Sampler} from "./Sampler.mjs";

class Sound {
    constructor(){
        this._range = {
            lowest: 24,
            highest: 108
        };
        // make the samples loaded a range of audios
        this._piano = new Sampler("./app/audio/", this._range.lowest, this._range.highest);
    }

    /**
     * Load the piano audio
     * @return {Promise<[]>}
     */
    load(){
        // return promise after resolving loading the sampler
        return Promise.all([this._piano.load()]);
    }

    keyDown(note, time=Tone.now()){
        if (note >= this._range.lowest && note <= this._range.highest){
            // The note is in the range of audios
            console.log(` Piano plays ${note}`);
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
