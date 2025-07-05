import { tasks } from "../../data/tasks.js";

export class AgendaView {
    constructor() {
        this.modal = false;
        this.modeView = "Semaine";
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

    getCurrentDayLetter(num) {
        return num === 0 ? this.daysLetters[6] : this.daysLetters[num - 1];
    }
    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    renderWeekView(data, el) {
        this.modeView = "Semaine";
        const agendaEl = document.createElement("div");
        agendaEl.className = "agendaWeek";
        const dateSelected = data.dateSelected;
        const year = dateSelected.year;
        const month = dateSelected.month;
        const dateDate = dateSelected.dateDate;

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
        form.className="formTask-add";

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
        btn.className="btn-submit-addTask"
        form.appendChild(btn);
        modalContent.appendChild(form);
        modal.appendChild(modalContent);

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
            console.log(weekDays[i]);
            this.currentDate = `${weekDays[i].weekDays.year}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.month-1)}-${this.getFormatForNumbersWidhtZeroBefore(weekDays[i].weekDays.dayDateNum)}`;
            ul.appendChild(addBtn);

            for (let j = 0; j < weekDays[i].tasksByDay.length; j++) {

                const li = document.createElement("li");
                li.textContent = weekDays[i].tasksByDay[j].name;
                li.className = weekDays[i].weekDays.isCurrentDay ? "currentWeekLi" : "";
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

    createTask(date) {

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

    renderCalendarWeek(calendarData) {
        const el = document.querySelector("#agenda");
        if (el) {
            el.innerHTML = "";
            this.renderWeekView(calendarData, el);
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