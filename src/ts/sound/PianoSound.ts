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

    keyDown(note: string){
        console.log(` Piano plays ${note}`);
        this._piano.keyDown(note);
    }

    keyUp(note: string, time=Tone.now()){
        time += .5;
        // @ts-ignore
        this._piano.keyUp(note, time);
    }

    keyDownUp(note: string){
        this._piano.keyDownUp(note);
    }
}
