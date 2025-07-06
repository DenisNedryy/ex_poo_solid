import { createTask } from "../../services/tasks.js";
import { getOneUser } from "../../services/Auth.js";

export class HomeEventBinder {
    constructor(agendaModel, homeView, agendaView) {
        this.agendaModel = agendaModel;
        this.agendaView = agendaView;
        this.homeView = homeView;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleChange = this.handleChangeTask.bind(this);
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
        document.removeEventListener("change", this.boundHandleChange);
        document.addEventListener('change', this.boundHandleChange);
    }

    async handleChangeTask(e) {
        if (e.target.id === "usersSelect") {
            const name = e.target.value;
            const select = e.target;
            const selectedOption = select.options[select.selectedIndex];
            const dataId = selectedOption.getAttribute('data-id');
            const res = await getOneUser(dataId);
            this.agendaView.userSelected = res.data.user;
            const dataCalendar = this.agendaModel.init();
            this.agendaView.renderCalendarWeek(dataCalendar);
        }
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
        } else if (e.target.classList.contains("agendaWeek__console__today")) {
            const calendarData = this.agendaModel.getAgendaPerWeek();
            this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("yearViewLi")) {
            const calendarData = this.agendaModel.getAgendaPerYear();
            this.agendaView.renderCalendarYear(calendarData);
        } else if (e.target.classList.contains("weekViewLi")) {
            const calendarData = this.agendaModel.getAgendaPerWeek();
            this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("agendaYearTurnLeft")) {
            const year = this.agendaModel.agendaYearTurnLeft();
            const calendarData = this.agendaModel.getAgendaPerYear(year);
            this.agendaView.renderCalendarYear(calendarData);
        } else if (e.target.classList.contains("agendaYearTurnRight")) {
            const year = this.agendaModel.agendaYearTurnRight();
            const calendarData = this.agendaModel.getAgendaPerYear(year);
            this.agendaView.renderCalendarYear(calendarData);
        } else if (e.target.classList.contains("agendYear__console__today")) {
            const calendarData = this.agendaModel.getAgendaPerYear();
            this.agendaView.renderCalendarYear(calendarData);
        } else if (e.target.classList.contains("joursFeries") || e.target.classList.contains("checkFetes")) {
            this.agendaModel.fetes = !this.agendaModel.fetes;
            const calendarData = this.agendaModel.getAgendaPerWeek();
            this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("addTask")) {
            this.agendaView.toggleModal();
        } else if (e.target.classList.contains("leaveModal")) {
            console.log(this.agendaView.modal);
            this.agendaView.hideModal();
        } else if (e.target.classList.contains("btn-submit-addTask")) {
            const form = e.target.closest("form");
            this.addTask(form);
        }
    }

    async addTask(form) {
        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        const type = form.elements['type'].value;
        const date = this.agendaView.currentDate;
        const data = {
            name: name,
            description: description,
            type: type,
            date: date
        }

        // il faut rajouter le author id 
        const res = await createTask(data);
        console.log(res);
    }
}