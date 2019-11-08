/* global d3 */
import {} from "../third_party/d3.js";
import {ChordTypeBtnGroup} from "./ChordTypesBtnGroup.mjs";
import {InversionTypeBtnGroup} from "./InversionTypeBtnGroup.mjs";

class ChordSettingToolbar{
    constructor(container){
        const toolbar = d3.select(container).append("div")
            .attr("class", "btn-toolbar")
            .attr("role", "toolbar")
            .attr("aria-label", "Toolbar to set chord");

        const chordTypeBtnGroup = new ChordTypeBtnGroup(toolbar.node());
        const inversionTypeBtnGroup = new InversionTypeBtnGroup(toolbar.node());
    }
}

export {ChordSettingToolbar}
