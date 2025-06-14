export class DailyPlanningEventBinder {
    constructor(dailyPlanningModel, view) {
        this.dailyPlanningModel = dailyPlanningModel;
        this.view = view;
        this.boundHandleClickTask = this.handleClickTask.bind(this); //Crée une nouvelle fonction dont le contexte (this) est explicitement lié à l’instance actuelle de la classe.
        // sinon instancie un nouveau
        // le dernier this fait ref à l'instance de la classe
    }

    addEventListeners() {

            document.removeEventListener('click', this.boundHandleClickTask);
            document.addEventListener('click', this.boundHandleClickTask);
        
    }

    handleClickTask(e) {
        console.log(e.target);
        if (e.target.classList.contains("tache__isDone") || e.target.classList.contains("fa-solid") || e.target.classList.contains("check")) {

            const task = e.target.closest(".tache__isDone");
            const index = task.getAttribute("data-index");
            console.log(task);
            this.dailyPlanningModel.toggleTask(index);
            this.view.render(this.dailyPlanningModel.planning);
        }
    }
}