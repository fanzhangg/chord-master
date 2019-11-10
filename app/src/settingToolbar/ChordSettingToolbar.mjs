/* global d3 */
import {} from "../third_party/d3.js";
import {ChordTypeBtnGroup} from "./ChordTypesBtnGroup.mjs";
import {InversionTypeBtnGroup} from "./InversionTypeBtnGroup.mjs";

class ChordSettingToolbar{
    constructor(){
        const toolbar = d3.select("body").append("div") // Append container
            .attr("class", "container-fluid bg-dark")
                .append("div")  // Append row div
                    .attr("class", "row")
                        .append("div")
                            .attr("class", "p-2")
                                .append("div")  // Append btn-toolbar
                                    .attr("class", "btn-toolbar")
                                    .attr("id", "settingToolbar")
                                    .attr("role", "toolbar")
                                    .attr("aria-label", "Toolbar to set chord");

        const chordTypeBtnGroup = new ChordTypeBtnGroup(toolbar.node());
        const inversionTypeBtnGroup = new InversionTypeBtnGroup(toolbar.node());
    }
}

export {ChordSettingToolbar}
