import {Buffer} from "tone/tone";

class Loader {
    loaded: boolean;

    constructor() {

        const mask = document.querySelector("#mask") as HTMLElement;   // Mask to hide all other elements

        const progBar = document.querySelector("#progressBar") as HTMLElement;  // Progression bar
        const prog = document.querySelector("#progress") as HTMLElement;    // Progression container

        this.loaded = false;

        /**
         * Remove the progress bar, mask and enable scroll after loaded
         */
        //@ts-ignore
        Buffer.on("load", () => {
            this.loaded = true;
            mask.remove();
            prog.remove();
            document.body.classList.remove("no-scroll");
        });

        /**
         * Update the progress bar
         */
        //@ts-ignore
        Buffer.on("progress", (prog) => {
            progBar.style.width = `${(prog * 100).toFixed(2)}%`;
        })
    }
}

export {Loader}
