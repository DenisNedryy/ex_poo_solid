
import { getUsers, getMyProfil, getOneUser } from "../../services/Auth.js";
import { readOneTask, deleteTask, updateTask } from "../../services/tasks.js";
import { HOST } from "../../host.js";

export class AgendaView {
    constructor() {
        this.modal = false;
        this.modeView = "Semaine";
        this.users = [];
        this.authUser = null;
        this.userSelected = null;
        this.myUser = "";
        this.currentDate = "";
        this.yearMonth = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];
        this.daysLetters = [
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche"
        ];
    }

    async getUsersArray() {
        const res = await getUsers();
        return res.data.users;
    }

    getCurrentDayLetter(num) {
        return num === 0 ? this.daysLetters[6] : this.daysLetters[num - 1];
    }
    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    async getMyUser() {
        const res = await getMyProfil();
        return res.data.user;
    }

    showUpdateTaskForm() {
        const updateDiv = document.querySelector(".updateDiv");
        updateDiv.innerHTML = "";
        const form = document.createElement("form");
        // update-name
        const divName = document.createElement("div");
        const labelName = document.createElement("label");
        labelName.textContent = "Name";
        const inputName = document.createElement("input");
        inputName.type = "text";
        inputName.name = "name";
        divName.appendChild(labelName);
        divName.appendChild(inputName);
        // update-description
        const divDescription = document.createElement("div");
        const labelDescription = document.createElement("label");
        labelDescription.textContent = "Description";
        const inputDescription = document.createElement("input");
        inputDescription.type = "text";
        inputDescription.name = "description";
        divDescription.appendChild(labelDescription);
        divDescription.appendChild(inputDescription);
        // update-submit
        const btn = document.createElement("button");
        btn.className = "btn-submit-updateTask";
        const i = document.createElement("i");
        i.className = "fa-solid fa-floppy-disk";
        const para = document.createElement("p");
        para.textContent = "Sauvegarder";
        para.className = "para-submitTask"
        btn.appendChild(i);
        btn.appendChild(para);


        form.appendChild(divName);
        form.appendChild(divDescription);
        form.appendChild(btn);
        updateDiv.appendChild(form);
    }

    async updateMyTask(e, btn) {
        e.preventDefault();
        const form = btn.closest("form");
        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        form.reset();
        const data = { name: name || null, description: description || null };
        const id = form.closest(".updateDiv").getAttribute("data-id");
        const res = await updateTask(data, id);
    }

    focusModal(el) {

        // modal focus li
        const modalLiContainer = document.createElement("div");
        modalLiContainer.className = "modalLiContainer hidden";

        const modalLi = document.createElement("div");
        modalLi.className = "modalLi";
        // header
        const header = document.createElement("div");
        header.className = "modalLi__header";
        // update
        const updateTask = document.createElement("i");
        updateTask.className = "fa-solid fa-pen updateTask";
        // delete
        const deleteTask = document.createElement("i");
        deleteTask.className = "fa-solid fa-trash-can deleteTask";
        // close task
        const closeTask = document.createElement("i");
        closeTask.className = "fa-solid fa-xmark closeTask";

        header.appendChild(updateTask);
        header.appendChild(deleteTask);
        header.appendChild(closeTask);

        // mettre modif delete fermer

        // taskName + date
        const bodyContainer = document.createElement("div");
        bodyContainer.className = "modalFocus__body"
        const bodyName = document.createElement("p");
        bodyName.className = "modalFocus-name";
        const bodyDate = document.createElement("p");
        bodyDate.className = "modalFocus-date";

        // task.description
        const description = document.createElement("p");
        description.className = "modalFocus-description";

        // updateDiv
        const updateDiv = document.createElement("div");
        updateDiv.className = "updateDiv";

        bodyContainer.appendChild(bodyName);
        bodyContainer.appendChild(bodyDate);
        bodyContainer.appendChild(description);
        bodyContainer.appendChild(updateDiv);

        modalLi.appendChild(header);
        modalLi.appendChild(bodyContainer);
        modalLiContainer.appendChild(modalLi);
        el.appendChild(modalLiContainer);

    }

    async renderWeekView(data, el) {
        await this.renderAgendaConsole();

        this.modeView = "Semaine";
        const agendaEl = document.createElement("div");
        agendaEl.className = "agendaWeek";
        const dateSelected = data.dateSelected;
        const year = dateSelected.year;
        const month = dateSelected.month;
        const dateDate = dateSelected.dateDate;

        this.focusModal(el);

        // MODAL
        const modal = document.createElement("div");
        modal.className = "modal hidden";
        const modalContent = document.createElement("div");
        modalContent.className = "modalContent";
        const header = document.createElement("div");
        header.className = "modal__content__header";
        const title = document.createElement("h3");
        title.textContent = "Nouvelle tâche";
        header.appendChild(title);
        const quit = document.createElement("i");
        quit.className = "fa-solid fa-square-xmark leaveModal";
        header.appendChild(quit);
        modalContent.appendChild(header);
        const form = document.createElement("form");
        form.className = "formTask-add";

        // name modal
        const nameDiv = document.createElement("div");
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameInput);
        // description modal
        const descriptionDiv = document.createElement("div");
        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description";
        const descriptionInput = document.createElement("textarea");
        descriptionInput.name = "description";
        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionInput);
        // type modal
        const typeDiv = document.createElement("div");
        const typeLabel = document.createElement("label");
        typeLabel.textContent = "Type";
        typeLabel.setAttribute("for", "typeSelect");
        const select = document.createElement("select");
        select
        select.setAttribute("id", "typeSelect");
        select.setAttribute("name", "type");
        const enumValues = ['tasks', 'courses', 'rdvs', 'events', 'projets'];
        enumValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value.charAt(0).toUpperCase() + value.slice(1); // Capitalise la première lettre
            select.appendChild(option);
        });

        typeDiv.appendChild(typeLabel);
        typeDiv.appendChild(select);

        form.appendChild(nameDiv);
        form.appendChild(descriptionDiv);
        form.appendChild(typeDiv);

        const btn = document.createElement("button");
        btn.textContent = "Enregistrer";
        btn.type = "submit";
        btn.className = "btn-submit-addTask"
        form.appendChild(btn);
        modalContent.appendChild(form);
        modal.appendChild(modalContent);

        // console
        const agendaWeekConsole = document.createElement("div");
        agendaWeekConsole.className = "agendaWeek__console";
        const today = document.createElement("p");
        today.className = "agendaWeek__console__today";
        today.textContent = "Today";
        agendaWeekConsole.appendChild(today);

        const directions = document.createElement("div");
        directions.className = "agendaWeek__console__directions";
        const iLeft = document.createElement("i");
        iLeft.className = "fa-solid fa-angle-left agendaTurnLeft";
        const iRight = document.createElement("i");
        iRight.className = "fa-solid fa-angle-right agendaTurnRight";
        directions.appendChild(iLeft);
        directions.appendChild(iRight);
        agendaWeekConsole.appendChild(directions);

        const dateText = document.createElement("p");
        dateText.textContent = `${this.yearMonth[Number(month - 1)]} ${year}`;
        agendaWeekConsole.appendChild(dateText);

        const viewMode = document.createElement("div");
        viewMode.className = "viewMode";
        const viewModePara = document.createElement("p");
        viewModePara.className = "viewModePara";
        viewModePara.textContent = this.modeView;
        viewMode.appendChild(viewModePara);

        const modList = document.createElement("ul");
        const weekView = document.createElement("li");
        weekView.className = "weekViewLi"
        weekView.textContent = "Semaine";
        modList.appendChild(weekView);
        const yearView = document.createElement("li");
        yearView.className = "yearViewLi";
        yearView.textContent = "Année";
        modList.appendChild(yearView);
        const planningView = document.createElement("li");
        planningView.className = "planningViewLi";
        planningView.textContent = "Planning";
        modList.appendChild(planningView);

        viewMode.appendChild(modList);
        agendaWeekConsole.appendChild(viewMode);
        agendaEl.appendChild(agendaWeekConsole);

        const choiceTasks = document.createElement("div");
        choiceTasks.className = "choiceTasks";
        const joursFeries = document.createElement("div");
        const joursFeriesbox = document.createElement("div");
        joursFeriesbox.className = `${data.weekDays[0].weekDays.isFetes ? 'joursFeries open' : 'joursFeries close'}`;
        if (data.weekDays[0].weekDays.isFetes) {
            const check = document.createElement("i");
            check.className = "fa-solid fa-check checkFetes";
            joursFeriesbox.appendChild(check);
        }

        const choiceTasksPara = document.createElement("p");
        choiceTasksPara.textContent = "jours fériés";

        choiceTasks.appendChild(joursFeries);
        choiceTasks.appendChild(joursFeriesbox);
        choiceTasks.appendChild(choiceTasksPara);
        agendaEl.appendChild(choiceTasks);

        const agendaWeekBox = document.createElement("div");
        agendaWeekBox.className = "agendaWeek__box";
        const weekDays = data.weekDays;

        for (let i = 0; i < weekDays.length; i++) {
            const dayFiche = document.createElement("div");
            dayFiche.className = 'dayFiche';
            // weekDays[i].isCurrentDay? 
            const dayFiche__header = document.createElement("div");
            dayFiche__header.className = weekDays[i].weekDays.isCurrentDay ? "dayFiche__header weekCurrentDayHeader" : "dayFiche__header";
            const day = document.createElement("p");
            day.textContent = `${this.daysLetters[i]}`;
            const num = document.createElement("p");
            num.className = weekDays[i].weekDays.isCurrentDay ? "dayFiche__header__para weekCurrentDay" : "dayFiche__header__para";
            num.textContent = weekDays[i].weekDays.dayDateNum;
            dayFiche__header.appendChild(day);
            dayFiche__header.appendChild(num);

            dayFiche.appendChild(dayFiche__header);
            const tasksEl = document.createElement("div");
            tasksEl.className = "dayFiche__body";
            const ul = document.createElement("ul");
            tasksEl.appendChild(ul);

            // add Btn
            const addBtn = document.createElement("li");
            addBtn.textContent = "Ajouter une tâche";
            addBtn.className = "addTask";
            addBtn.setAttribute("data-date", `${weekDays[i].weekDays.year}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.month - 1)}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.dayDateNum)}`);
            this.currentDate = `${weekDays[i].weekDays.year}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.month - 1)}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.dayDateNum)}`;
            ul.appendChild(addBtn);

            for (let j = 0; j < weekDays[i].tasksByDay.length; j++) {

                const li = document.createElement("li");
                const liAvatar = document.createElement("img");
                const author_id = weekDays[i].tasksByDay[j].author_id || null;

                if (author_id) {
                    const res = await getOneUser(author_id);
                    const avatar = res.data.user.img_url;
                    liAvatar.setAttribute("src", `${HOST}/api/images/avatars/${avatar}`);
                    li.appendChild(liAvatar);
                }

                const liPara = document.createElement("p");
                li.appendChild(liPara);
                // console.log(weekDays[i].tasksByDay[j]);
                liPara.textContent = weekDays[i].tasksByDay[j].name;
                li.className = weekDays[i].weekDays.isCurrentDay ? "currentWeekLi normalWeekLi" : "normalWeekLi";
                li.setAttribute("data-id", weekDays[i].tasksByDay[j].id);
                if (weekDays[i].tasksByDay[j].bg) {
                    li.classList.add(weekDays[i].tasksByDay[j].bg);
                }
                if (weekDays[i].tasksByDay[j].color) {
                    li.classList.add(weekDays[i].tasksByDay[j].color);
                }

                ul.appendChild(li);
            }

            tasksEl.appendChild(ul);
            dayFiche.appendChild(tasksEl);

            agendaWeekBox.appendChild(dayFiche);
        }
        agendaEl.appendChild(agendaWeekBox);
        el.appendChild(agendaEl);
        el.appendChild(modal);
    }

    async toggleOpenCloseTask(e) {

        const modal = document.querySelector(".modalLiContainer ");

        // récup info pour le modal
        const task = e.target;
        const task_id = task.getAttribute("data-id");
        const res = await readOneTask(task_id);
        const task_data = res.data.tasks;

        // ajout id pour le modal
        modal.setAttribute("data-id", task_id);

        // convertion DATE en string
        const newDate = new Date(task_data.date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const day = newDate.getDate();
        const stringDate = `${year}-${month}-${day}`;

        // injection dynamique
        const updateDiv = document.querySelector(".updateDiv");
        updateDiv.setAttribute("data-id", task_data.id);
        const nameEl = document.querySelector(".modalFocus-name");
        const dateEl = document.querySelector(".modalFocus-date");
        const descriptionEl = document.querySelector(".modalFocus-description");
        nameEl.textContent = task_data.name;

        dateEl.textContent = this.convertDateForPlanning(stringDate);
        descriptionEl.textContent = task_data.description;

        if (modal.classList.contains("hidden")) {
            this.openTask();
        } else {
            this.closeTask();
        }
    }

    openTask() {
        const modal = document.querySelector(".modalLiContainer ");
        modal.classList.remove("hidden");
    }

    closeTask() {
        const modal = document.querySelector(".modalLiContainer ");
        modal.classList.add("hidden");
        // reset updateDiv part
        const areset = document.querySelector(".updateDiv");
        areset.innerHTML = "";
    }

    async deleteMyTask(e) {
        const modal = document.querySelector(".modalLiContainer");
        const task_id = modal.getAttribute("data-id");
        const res = await deleteTask(task_id);
    }



    renderViewMod(el) {
        // viewMod (semaine, mois, planning)
        const viewMode = document.createElement("div");
        viewMode.className = "viewMode";
        const viewModePara = document.createElement("p");
        viewModePara.className = "viewModePara";
        viewModePara.textContent = this.modeView;
        viewMode.appendChild(viewModePara);

        const modList = document.createElement("ul");
        const weekView = document.createElement("li");
        weekView.className = "weekViewLi"
        weekView.textContent = "Semaine";
        modList.appendChild(weekView);
        const yearView = document.createElement("li");
        yearView.className = "yearViewLi";
        yearView.textContent = "Année";
        modList.appendChild(yearView);

        const planningView = document.createElement("li");
        planningView.className = "listViewLi";
        planningView.textContent = "Planning";
        modList.appendChild(planningView);

        viewMode.appendChild(modList);
        el.appendChild(viewMode);
    }

    renderPlanning(data) {
        const el = document.querySelector("#agenda");
        if (el) {
            el.innerHTML = "";
            this.renderViewMod(el);

            const planningDiv = document.createElement("div");
            planningDiv.className = "planning";
            for (let i = 0; i < data.length; i++) {
                const task = document.createElement("div");
                task.className = "planning__task";
                const task_date = document.createElement("div");
                task_date.className = "panning__task__date";
                const date = this.convertDateForPlanning(data[i].date);

                const task_date_para = document.createElement("p");
                task_date_para.textContent = date;
                task_date.appendChild(task_date_para);

                const task_textContent = document.createElement("div");
                const task_textContent_para = document.createElement("p");
                task_textContent_para.textContent = data[i].name;
                task_textContent.appendChild(task_textContent_para);

                task.appendChild(task_date);
                task.appendChild(task_textContent);
                planningDiv.appendChild(task);
            }

            el.appendChild(planningDiv);
        }
    }

    convertDateForPlanning(val) {
        const valArray = val.split("-");
        return `${valArray[2]} ${this.yearMonth[Number(valArray[1] - 1)]} ${valArray[0]}`;
    }



    toggleModal() {
        this.modal = !this.modal;
        this.modal ? this.displayModal() : this.hideModal();
    }

    displayModal() {
        const modal = document.querySelector(".modal");
        if (modal) {
            modal.classList.remove("hidden");
            this.modal = true;
        }
    }

    hideModal() {
        const modal = document.querySelector(".modal");
        if (modal) {
            modal.classList.add("hidden");
            this.modal = false;
        }
    }


    async renderAgendaConsole() {
        const el = document.getElementById("agenda-console");
        if (el) {
            el.innerHTML = "";
            // choix du user
            this.users = await this.getUsersArray();
            if (this.userSelected === null) this.userSelected = await this.getMyUser();
            if (this.authUser === null) this.authUser = await this.getMyUser();
            this.myUser = await this.getMyUser();
            const selectUsers = document.createElement("select");
            const usersDiv = document.createElement("div");
            usersDiv.className = "usersChoiceContainer";

            selectUsers.setAttribute("id", "usersSelect");
            selectUsers.setAttribute("name", "type");
            this.users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.name; // ou user.name selon tes besoins
                option.setAttribute("data-id", user.id);
                // option.innerHTML = `<img src='${HOST}/api/images/avatars/${user.img_url}'/> <p>${user.name}</p>`;
                option.textContent = user.name.charAt(0).toUpperCase() + user.name.slice(1);
                if (user.id === this.userSelected.id) {
                    option.selected = true;
                } else option.selected = false;
                selectUsers.appendChild(option);
            });
            const imgUser = document.createElement("img");
            imgUser.src = `${HOST}/api/images/avatars/${this.userSelected.img_url}`;


            usersDiv.appendChild(selectUsers);
            usersDiv.appendChild(imgUser);
            el.appendChild(usersDiv);
        }
    }


    renderYearView(data, el) {
        this.modeView = "Année";

        const agendaYearConsole = document.createElement("div");
        agendaYearConsole.className = "agendaWeek__console";
        const today = document.createElement("p");
        today.className = "agendYear__console__today";
        today.textContent = "Today";
        agendaYearConsole.appendChild(today);

        const directions = document.createElement("div");
        directions.className = "agendaWeek__console__directions";
        const iLeft = document.createElement("i");
        iLeft.className = "fa-solid fa-angle-left agendaYearTurnLeft";
        const iRight = document.createElement("i");
        iRight.className = "fa-solid fa-angle-right agendaYearTurnRight";
        directions.appendChild(iLeft);
        directions.appendChild(iRight);
        agendaYearConsole.appendChild(directions);

        const dateText = document.createElement("p");
        dateText.textContent = data[0].year;
        agendaYearConsole.appendChild(dateText);

        const viewMode = document.createElement("div");
        viewMode.className = "viewMode";
        const viewModePara = document.createElement("p");
        viewModePara.className = "viewModePara";
        viewModePara.textContent = this.modeView;
        viewMode.appendChild(viewModePara);

        const modList = document.createElement("ul");
        const weekView = document.createElement("li");
        weekView.className = "weekViewLi"
        weekView.textContent = "Semaine";
        modList.appendChild(weekView);
        const yearView = document.createElement("li");
        yearView.className = "yearViewLi";
        yearView.textContent = "Année";
        modList.appendChild(yearView);

        const planningView = document.createElement("li");
        planningView.className = "listViewLi";
        planningView.textContent = "Planning";
        modList.appendChild(planningView);

        viewMode.appendChild(modList);
        agendaYearConsole.appendChild(viewMode);
        el.appendChild(agendaYearConsole);

        const agendaEl = document.createElement("div");
        agendaEl.className = "agendaYear";
        const year = data[0].year;
        data.forEach((month, index) => {
            const myMonth = this.yearMonth[index];
            const monthBox = document.createElement("div");
            monthBox.className = "agendaYear__monthBox";
            // header
            const monthBoxHeader = document.createElement("div");
            monthBoxHeader.classList = "agendaYear__monthBox__header";
            const monthBoxHeaderContent = document.createElement("p");
            monthBoxHeaderContent.textContent = this.yearMonth[index];
            monthBoxHeader.appendChild(monthBoxHeaderContent);
            monthBox.appendChild(monthBoxHeader);

            // table
            const table = document.createElement('table');
            // theader
            const thead = document.createElement('thead');
            const theadTr = document.createElement('tr');

            const lundi = document.createElement('th');
            lundi.setAttribute("data-letters", 'lundi');
            lundi.textContent = "L";
            const mardi = document.createElement('th');
            mardi.setAttribute("data-letters", 'mardi');
            mardi.textContent = "M";
            const mercredi = document.createElement('th');
            mercredi.setAttribute("data-letters", 'mercredi');
            mercredi.textContent = "M";
            const jeudi = document.createElement('th');
            jeudi.setAttribute("data-letters", 'jeudi');
            jeudi.textContent = "J";
            const vendredi = document.createElement('th');
            vendredi.setAttribute("data-letters", 'vendredi');
            vendredi.textContent = "V";
            const samedi = document.createElement('th');
            samedi.setAttribute("data-letters", 'samedi');
            samedi.textContent = "S";
            const dimanche = document.createElement('th');
            dimanche.setAttribute("data-letters", 'dimanche');
            dimanche.textContent = "D";

            theadTr.appendChild(lundi);
            theadTr.appendChild(mardi);
            theadTr.appendChild(mercredi);
            theadTr.appendChild(jeudi);
            theadTr.appendChild(vendredi);
            theadTr.appendChild(samedi);
            theadTr.appendChild(dimanche);
            thead.appendChild(theadTr);
            table.appendChild(thead);

            // tbody
            const tbody = document.createElement('tbody');
            // Obtenir le mois numérique (index + 1 car JS commence à 0 pour les mois)
            const monthIndex = index;
            const firstDay = new Date(year, monthIndex, 1);
            const lastDay = new Date(year, monthIndex + 1, 0); // hack, day=0 => le dernier jour du mois précédent.
            const firstWeekday = (firstDay.getDay() + 6) % 7; // pour commencer lundi = 0 (on décale les colonnes)
            const totalDays = lastDay.getDate();

            let currentDay = 1;
            let weekRow = document.createElement('tr');

            // Remplir les cellules vides au début (si le mois ne commence pas un lundi)
            for (let i = 0; i < firstWeekday; i++) {
                const emptyCell = document.createElement('td');
                weekRow.appendChild(emptyCell);
            }

            // Remplir les jours du mois
            for (let day = 1; day <= totalDays; day++) {
                const cell = document.createElement('td');
                cell.textContent = day;
                const today = new Date();
                const isToday = today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day;
                cell.className = isToday ? 'numero yearCurrentDay' : 'numero';
                cell.setAttribute('data-date', `${year}-${this.getFormatForNumbersWidhtZeroBefore(monthIndex)}-${this.getFormatForNumbersWidhtZeroBefore(day)}`);
                weekRow.appendChild(cell);

                // Si on arrive à dimanche (7 colonnes), on termine la ligne
                if ((firstWeekday + day) % 7 === 0) {
                    tbody.appendChild(weekRow);
                    weekRow = document.createElement('tr');
                }
            }

            // Compléter la dernière ligne si incomplète
            if (weekRow.children.length > 0) {
                while (weekRow.children.length < 7) {
                    const emptyCell = document.createElement('td');
                    weekRow.appendChild(emptyCell);
                }
                tbody.appendChild(weekRow);
            }

            table.appendChild(tbody);

            monthBox.appendChild(table);

            // fin
            agendaEl.appendChild(monthBox);
        });
        el.appendChild(agendaEl);
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    async renderCalendarWeek(calendarData) {
        const el = document.querySelector("#agenda");
        if (el) {
            el.innerHTML = "";
            await this.renderWeekView(calendarData, el);
        }
    }

    renderCalendarYear(calendarData) {
        const el = document.querySelector("#agenda");
        if (el) {
            el.innerHTML = "";
            this.renderYearView(calendarData, el);
        }
    }
}