import { tasks } from "../../data/tasks.js";

export class Agenda_model {
    constructor() {
        this.stateDateMs = null;
        this.stateYear = null;
        this.fetes = true;
    }

    getDaysInFebruary(year = this.year) {
        if (year === null) throw new Error("Year not set");
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    agendaYearTurnLeft() {
        this.stateYear--;
        return this.stateYear;
    }

    agendaYearTurnRight() {
        this.stateYear++;
        return this.stateYear;
    }

    agendaWeekTurnLeft() {
        this.stateDateMs = this.stateDateMs - (60 * 60 * 24 * 7 * 1000);
        const date = new Date(this.stateDateMs);
        const year = date.getFullYear();
        const month = this.getFormatForNumbersWidhtZeroBefore(date.getMonth());
        const day = this.getFormatForNumbersWidhtZeroBefore(date.getDate());
        return `${year}-${month}-${day}`;
    }

    agendaWeekTurnRight() {
        this.stateDateMs = this.stateDateMs + (60 * 60 * 24 * 7 * 1000);
        const date = new Date(this.stateDateMs);
        const year = date.getFullYear();
        const month = this.getFormatForNumbersWidhtZeroBefore(date.getMonth());
        const day = this.getFormatForNumbersWidhtZeroBefore(date.getDate());
        return `${year}-${month}-${day}`;
    }

    calculerPaques(annee) {
        const a = annee % 19;
        const b = Math.floor(annee / 100);
        const c = annee % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mois = Math.floor((h + l - 7 * m + 114) / 31); // 3 = mars, 4 = avril
        const jour = ((h + l - 7 * m + 114) % 31) + 1;

        return new Date(annee, mois - 1, jour); // mois - 1 car en JS, janvier = 0
    }

    ajouterJours(date, nbJours) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(date.getDate() + nbJours);
        return nouvelleDate;
    }

    getAgendaPerWeek(date = false) {
        if (date === false) {
            return this.init();
        }
        const dateArray = date.split('-').map(Number);
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];
        const dateSelected = new Date(year, month, day);

        // Calcul du lundi de la semaine
        let dayOfWeek = dateSelected.getDay(); // 0=dimanche, 1=lundi, ...
        dayOfWeek = (dayOfWeek === 0) ? 7 : dayOfWeek; // dimanche devient 7
        const lundiMs = dateSelected.getTime() - ((dayOfWeek - 1) * 24 * 60 * 60 * 1000);

        const weekDayTasks = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        // calcul des fetes:
        const paques = this.calculerPaques(year);
        const lundiPaques = this.ajouterJours(paques, 1);
        const ascension = this.ajouterJours(paques, 39);
        const pentecote = this.ajouterJours(paques, 50);

        const nouvelAn = new Date(year+1, 0, 1);         // 1er janvier
        const feteTravail = new Date(year, 4, 1);      // 1er mai
        const victoire1945 = new Date(year, 4, 8);     // 8 mai
        const feteNationale = new Date(year, 6, 14);   // 14 juillet
        const assomption = new Date(year, 7, 15);      // 15 août
        const toussaint = new Date(year, 10, 1);       // 1er novembre
        const armistice = new Date(year, 10, 11);      // 11 novembre
        const noel = new Date(year, 11, 25);           // 25 décembre

        const joursFeries = [
            { type: 'jours férié', name: 'Jour de l’an', date: nouvelAn, bg: 'bgRed' },
            { type: 'jours férié', name: 'Lundi de Pâques', date: lundiPaques, bg: 'bgRed' },
            { type: 'jours férié', name: 'Fête du Travail', date: feteTravail, bg: 'bgRed' },
            { type: 'jours férié', name: 'Victoire 1945', date: victoire1945, bg: 'bgRed' },
            { type: 'jours férié', name: 'Ascension', date: ascension, bg: 'bgRed' },
            { type: 'jours férié', name: 'Pentecôte', date: pentecote, bg: 'bgRed' },
            { type: 'jours férié', name: 'Fête Nationale', date: feteNationale, bg: 'bgRed' },
            { type: 'jours férié', name: 'Assomption', date: assomption, bg: 'bgRed' },
            { type: 'jours férié', name: 'Toussaint', date: toussaint, bg: 'bgRed' },
            { type: 'jours férié', name: 'Armistice', date: armistice, bg: 'bgRed' },
            { type: 'jours férié', name: 'Noël', date: noel, bg: 'bgRed' },
            { type: 'jours férié', name: 'Pâques', date: paques, bg: 'bgRed' } // facultatif : dimanche de Pâques
        ]; 

        for (let i = 0; i < 7; i++) {
            const dayDateMs = lundiMs + (i * 24 * 60 * 60 * 1000);
            const dayDate = new Date(dayDateMs);
            const dayYear = dayDate.getFullYear();
            const dayMonth = dayDate.getMonth();
            const dayDateNum = dayDate.getDate();

            const tasksByDay = [];

            const dayDay = dayDate.getDay();
            if (dayDay === 2) tasksByDay.push({
                bg: "bgJaune",
                color: 'colorBlack',
                type: 'tasks',
                name: 'Poubelles plastiques/cartons',
                date: date,
                year: dayYear,
                month: this.getFormatForNumbersWidhtZeroBefore(dayMonth + 1),
                dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum),
                dayLetter: dayDate.getDay()
            });
            if (dayDay === 5) tasksByDay.push({
                bg: "bgBlack",
                color: 'colorWhite',
                type: 'tasks',
                name: 'Poubelles ménagères',
                date: date,
                year: dayYear,
                month: this.getFormatForNumbersWidhtZeroBefore(dayMonth + 1),
                dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum),
                dayLetter: dayDate.getDay()
            });

            // ajout des fetes si state actif
            if (this.fetes) {
                // ajout des jours feriés
                for (let jf = 0; jf < joursFeries.length; jf++) {
                    if (dayDate.getTime() === joursFeries[jf].date.getTime()) {
                        tasksByDay.push(joursFeries[jf]);
                    }
                }
            }

            const weekDays = { year: dayYear, month: dayMonth + 1, dayDateNum: dayDateNum, isFetes: this.fetes };
            weekDays.isCurrentDay = (currentYear === dayYear && currentMonth === dayMonth && currentDay === dayDateNum);

            for (let j = 0; j < tasks.length; j++) {
                const taskDateArray = tasks[j].date.split('-').map(Number);
                if (
                    dayYear === taskDateArray[0] &&
                    dayMonth + 1 === taskDateArray[1] &&
                    dayDateNum === taskDateArray[2]
                ) {
                    tasksByDay.push({
                        type: tasks[j].type,
                        name: tasks[j].name,
                        date: date,
                        year: dayYear,
                        month: this.getFormatForNumbersWidhtZeroBefore(dayMonth + 1),
                        dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum),
                        dayLetter: dayDate.getDay()
                    });
                }
            }

            weekDayTasks.push({ tasksByDay, weekDays });
        }
        return {
            dateSelected: { year: year, month: month + 1, dateDate: day },
            weekDays: weekDayTasks
        }
    }

    getAgendaPerYear(year = false) {
        if (year === false) year = new Date().getFullYear();
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        this.stateDateMs = currentDate;

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return daysPerMonths.map((myMonth, index) => {
            return {
                year: year,
                month: index + 1,
                days: Array.from({ length: myMonth }, (_, i) => i + 1).map((day) => {
                    return {
                        isCurrentDay: (year === currentYear && index + 1 === currentMonth && day === currentDay) ? true : false,
                        day: day,
                        task: this.checkIfTask(tasks, year, index + 1, day) || null
                    };
                })
            };
        });
    }

    checkIfTask(tasks, year, month, day) {
        const matchedTasks = tasks.filter((task) => {
            const [taskYear, taskMonth, taskDay] = task.date.split("-").map(Number);
            return (
                Number(taskYear) === Number(year) &&
                Number(taskMonth) === Number(month) &&
                Number(taskDay) === Number(day)
            );
        });
        return matchedTasks.length > 0 ? matchedTasks : null;
    }

    init() {
        const year = new Date().getFullYear();
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        this.stateDateMs = currentDate.getTime();
        this.stateYear = new Date().getFullYear();
        return this.getAgendaPerWeek(date);
    }
}
