export class DailyPlanningEventBinder {
    constructor(dailyPlanningModel) {
        this.dailyPlanningModel = dailyPlanningModel;
    }

    addEventListeners() {
        document.addEventListener("click", (e) => this.handleClickTask(e));
    }

    handleClickTask(e) {
        if (e.target.classList === "tache__isDone") {
            const task = e.target.closest(".tache__isDone");
            const index = task.getAttribute("data-index");
            console.log(task);
            this.dailyPlanningModel.toggleTask(index);
        }
    }
}