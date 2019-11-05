/* global d3 */
import {d3} from "third_party/d3.js"
import {Tone} from "third_party/Tone.js"
import {} from "third_party/StartAudioContext.js"

class Loader {
    constructor(container){
        const loader = document.createElement("div");
        loader.id = "loader";
        container.appendChild(loader);

        StartAudioContext(Tone.context, loader);
        // StartAudioContext starts the Web Audio API's AudioContext on an explicit user action.

        this.loaded = false;

        Buffer.on("load", () => {
            this.loaded = true;
            document.getElementById("loader").remove();
            // TODO: add the piano interface when loading is done
        })
    }
}

export {Loader}
