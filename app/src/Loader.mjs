/* global d3 */
import {d3} from "third_party/d3.js"

class Loader {
    constructor(container){
        const loader = document.createElement("div");
        loader.id = "loader";
        container.appendChild(loader);


    }
}

export {Loader}
