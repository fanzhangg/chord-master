import * as d3 from "d3";
import {ChordTypeBtnGroup} from "./ChordTypesBtnGroup";
import {InversionTypeBtnGroup} from "./InversionTypeBtnGroup";
import { ProgressionButtons } from "./ProgressionButtons";

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

        const toolbarEle = toolbar.node() as HTMLElement;
        new ChordTypeBtnGroup(toolbarEle);
        new InversionTypeBtnGroup(toolbarEle);
    }
}

export {ChordSettingToolbar}