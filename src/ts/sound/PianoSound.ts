import {PianoSampler} from "./PianoSampler";
import * as Tone from "tone/tone";

export class PianoSound {
    _lowest: number;
    _highest: number;
    _piano: PianoSampler;

    /**
     * A class to play the sound of the piano
     * @param lowest: the lowest keyNum
     * @param highest: the highest keyNum
     */
    constructor(lowest: number, highest: number){
        this._lowest = lowest;
        this._highest = highest;
        // make the samples loaded a range of audios
        this._piano = new PianoSampler("./audio/", this._lowest, this._highest);
    }

    /**
     * Load the piano audio
     * @return {Promise<[]>}
     */
    load(){
        // return promise after resolving loading the sampler
        return Promise.all([this._piano.load()]);
    }

    /**
     * Play a chord
     * @param notes Notes in the chord
     */
    keyDown(notes: Array<string>){
        this._piano.keyDown(notes);
    }

    /**
     * Stop plyaing a chord
     * @param notes Notes in the chord
     * @param time The lag between releasing the key and stopping playing the chord
     */
    keyUp(notes: Array<string>, time=Tone.now()){
        time += .5;
        this._piano.keyUp(notes, time);
    }

    /**
     * Play a chord and stop
     * @param notes 
     */
    keyDownUp(notes: Array<string>, duration: string = "4n"){
        this._piano.keyDownUp(notes, duration);
    }
}
