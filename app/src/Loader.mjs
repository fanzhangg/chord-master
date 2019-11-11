/* global d3 */
/* global Tone */
import {} from "./third_party/d3.js"
import "./third_party/Tone.js"
// import "./third_party/StartAudioContext.js"

class Loader {
    constructor(){
        const loader = document.createElement("div");
        loader.id = "loader";
        document.body.appendChild(loader);

        const mask = document.createElement("div");
        mask.id = "mask";
        document.body.appendChild(mask);

        // StartAudioContext(Tone.context, loader);
        // StartAudioContext starts the Web Audio API's AudioContext on an explicit user action.

        this.loaded = false;

        Tone.Buffer.on("load", () => {
            this.loaded = true;
            document.getElementById("loader").remove();
            mask.remove();
            // TODO: add the piano interface when loading is done
        });

        Tone.Buffer.on("progress", (prog) => {
            // progress.innerText = `${(prog * 100).toFixed(2)}%`
        })
    }
}

export {Loader}
