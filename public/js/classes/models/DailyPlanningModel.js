import { tachesSoir } from "../../data/tachesSoir.js";

export class DailyPlanningModel {
    constructor() {
        this.isPlanningStarted = false;
        this.planning = [];
    }

    toggleTask(index) {
        this.planning[index].isDone = !this.planning[index].isDone;
    }


    init() {
        this.planning = tachesSoir;
    }


}