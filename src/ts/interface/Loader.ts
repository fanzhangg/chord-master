import {Buffer} from "tone/tone";

class Loader {
    loaded: boolean;

    constructor(){
        // Add the loader to the screen
        const loader = document.createElement("div");
        loader.id = "loader";
        document.body.appendChild(loader);

        const mask = document.querySelector("#mask") as HTMLElement;   // Mask to hide all other elements

        const progText = document.querySelector("#progressText") as HTMLElement;

        this.loaded = false;

        //@ts-ignore
        Buffer.on("load", () => {
            this.loaded = true;
            // const loader = document.querySelector("#loader") as HTMLElement;
            loader.remove();
            // const mask = document.querySelector("#mask") as HTMLElement;
            mask.remove();
            progText.remove();
        });

        //@ts-ignore
        Buffer.on("progress", (prog) => {
            progText.innerText = `${(prog * 100).toFixed(2)}%`;
        })
    }
}

export {Loader}
