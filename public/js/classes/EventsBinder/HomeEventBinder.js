export class HomeEventBinder {
    constructor(agendaModel, homeView, agendaView) {
        this.agendaModel = agendaModel;
        this.agendaView = agendaView;
        this.homeView = homeView;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
    }

    handleClickTask(e) {
        if (e.target.classList.contains("agendaTurnLeft")) {
            const dateYYYYMMDD = this.agendaModel.agendaWeekTurnLeft();
            const calendarData = this.agendaModel.getAgendaPerWeek(dateYYYYMMDD);
            this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("agendaTurnRight")) {
            const dateYYYYMMDD = this.agendaModel.agendaWeekTurnRight();
            const calendarData = this.agendaModel.getAgendaPerWeek(dateYYYYMMDD);
            this.agendaView.renderCalendarWeek(calendarData);
        }
    }
}