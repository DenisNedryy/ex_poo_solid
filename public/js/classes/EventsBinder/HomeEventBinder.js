import { createTask } from "../../services/tasks.js";
import { getOneUser } from "../../services/Auth.js";

export class HomeEventBinder {
    constructor(agendaModel, homeView, agendaView) {
        this.clickedDate = null;
        this.agendaModel = agendaModel;
        this.agendaView = agendaView;
        this.homeView = homeView;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleChange = this.handleChangeTask.bind(this);
        this.init();
    }

    async init() {
        const auth = await this.agendaView.getMyUser();
        this.agendaView.userSelected = auth;
        this.agendaModel.userIdSelected = auth.id;
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
            this.agendaModel.userIdSelected = res.data.user.id;
            const dataCalendar = await this.agendaModel.init();
            await this.agendaView.renderCalendarWeek(dataCalendar);
        }
    }

    async handleClickTask(e) {

        if (e.target.classList.contains("agendaTurnLeft")) {
            const dateYYYYMMDD = this.agendaModel.agendaWeekTurnLeft();
            const calendarData = await this.agendaModel.getAgendaPerWeek(dateYYYYMMDD);
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("agendaTurnRight")) {
            const dateYYYYMMDD = this.agendaModel.agendaWeekTurnRight();
            const calendarData = await this.agendaModel.getAgendaPerWeek(dateYYYYMMDD);
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("agendaWeek__console__today")) {
            // maj de stateDateMs
            const calendarData = await this.agendaModel.getAgendaPerWeek();
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("planningViewLi")) {
            const calendarData = await this.agendaModel.getPlanning();
            this.agendaView.renderPlanning(this.agendaModel.sortTasksByDate(calendarData));
        } else if (e.target.classList.contains("listViewLi")) {
            const calendarData = this.agendaModel.getPlanning();
            this.agendaView.renderPlanning(calendarData);
        } else if (e.target.classList.contains("yearViewLi")) {
            const calendarData = this.agendaModel.getAgendaPerYear();
            this.agendaView.renderCalendarYear(calendarData);
        } else if (e.target.classList.contains("weekViewLi")) {
            const calendarData = await this.agendaModel.getAgendaPerWeek();
            await this.agendaView.renderCalendarWeek(calendarData);
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
            const calendarData = await this.agendaModel.getAgendaPerWeek();
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("addTask") || e.target.classList.contains("btnTaskP") || e.target.classList.contains("btnTaskI")) {
            const btn = e.target.closest(".addTask");
            this.agendaView.toggleModal();
            this.clickedDate = btn.getAttribute("data-date");
        } else if (e.target.classList.contains("leaveModal")) {
            console.log(this.agendaView.modal);
            this.agendaView.hideModal();
        } else if (e.target.classList.contains("btn-submit-addTask")) {
            const form = e.target.closest("form");
            this.addTask(form);
        } else if (e.target.classList.contains("normalWeekLi") || e.target.classList.contains("normalWeekLiPara")) {
            this.agendaView.toggleOpenCloseTask(e);
        } else if (e.target.classList.contains("closeTask")) {
            this.agendaView.toggleOpenCloseTask(e);
        } else if (e.target.classList.contains("deleteTask")) {
            await this.agendaView.deleteMyTask(e);
            const date = new Date(this.agendaModel.stateDateMs);
            const calendarData = await this.agendaModel.getAgendaPerWeek(date);
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("numero")) {
            const numero = e.target;
            const dataDate = numero.getAttribute("data-date");
            const dataDateArray = dataDate.split("-");
            const year = dataDateArray[0];
            const month = dataDateArray[1];
            const day = dataDateArray[2];
            const newDate = new Date(year, month, day);
            this.agendaModel.stateDateMs = newDate.getTime();
            const calendarData = await this.agendaModel.getAgendaPerWeek(newDate);
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("updateTask")) {
            this.agendaView.showUpdateTaskForm(e);
        } else if (e.target.classList.contains("btn-submit-updateTask") || e.target.classList.contains("fa-floppy-disk") || e.target.classList.contains("para-submitTask")) {
            const btn = e.target.closest(".btn-submit-updateTask");
            this.agendaView.updateMyTask(e, btn);
            const date = new Date(this.agendaModel.stateDateMs);
            const calendarData = await this.agendaModel.getAgendaPerWeek(date);
            await this.agendaView.renderCalendarWeek(calendarData);
        } else if (e.target.classList.contains("planning__switchContainer--all")) {
            const calendarData = await this.agendaModel.getPlanning();
            this.agendaView.renderPlanning(calendarData);
        } else if (e.target.classList.contains("planning__switchContainer--task")) {
            const calendarData = await this.agendaModel.getPlanningTasks();
            this.agendaView.renderPlanning(calendarData);
        }
        else if (e.target.classList.contains("planning__switchContainer--courses")) {
            const calendarData = await this.agendaModel.getPlanningCourses();
            this.agendaView.renderPlanning(calendarData);
        }
        else if (e.target.classList.contains("planning__switchContainer--rdv")) {
            const calendarData = await this.agendaModel.getPlanningRdvs();
            this.agendaView.renderPlanning(calendarData);
        }
        else if (e.target.classList.contains("planning__switchContainer--events")) {
            const calendarData = await this.agendaModel.getPlanningEvents();
            this.agendaView.renderPlanning(calendarData);
        }
        else if (e.target.classList.contains("planning__switchContainer--projets")) {
            const calendarData = await this.agendaModel.getPlanningProjets();
            this.agendaView.renderPlanning(calendarData);
        }
    }

    async addTask(form) {
        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        const type = form.elements['type'].value;
        const date = this.clickedDate;
        const data = {
            name: name,
            description: description,
            type: type,
            date: date,
            owner_id: this.agendaModel.userIdSelected
        }

        // check if auth!==current 
        const auth = this.agendaView.authUser;
        const currentUser = this.agendaView.userSelected;
        if (auth.id !== currentUser.id) data.author_id = auth.id;
        // il faut rajouter le author id 
        const res = await createTask(data);
        const calendarData = await this.agendaModel.getAgendaPerWeek(date);
        await this.agendaView.renderCalendarWeek(calendarData);
    }
}