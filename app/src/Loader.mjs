/* global d3 */
/* global Tone */
import "./third_party/d3.js"
import "./third_party/Tone.js"

class Loader {
    constructor(){
        const loader = document.createElement("div");
        loader.id = "loader";
        document.body.appendChild(loader);

        const mask = document.querySelector("#mask");

        // StartAudioContext(Tone.context, loader);
        // StartAudioContext starts the Web Audio API's AudioContext on an explicit user action.


        this.loaded = false;

        Tone.Buffer.on("load", () => {
            this.loaded = true;
            document.getElementById("loader").remove();
            mask.remove();
        });
    }
}

export {Loader}
