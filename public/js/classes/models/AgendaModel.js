
import { readTasks } from "../../services/tasks.js"
import { getMyProfil } from "../../services/Auth.js";


export class Agenda_model {
    constructor() {
        this.tasks = [];
        this.stateDateMs = null;
        this.userIdSelected = null;
        this.auth = null;
        this.stateYear = null;
        this.fetes = true;
    }

    async getMyUser() {
        const res = await getMyProfil();
        return res.data.user;
    }

    async fetchTasksFromApi() {
        try {
            const response = await readTasks() // ← À modifier
            this.tasks = response.data.tasks;

            const auth = await this.getMyUser();

            this.tasks = this.tasks.filter((task) => task.user_id === (this.userIdSelected? this.userIdSelected : auth.id));
            this.tasks = this.tasks.map((task) => {

                const myDate = new Date(task.date);
                const year = myDate.getFullYear();
                const month = this.getFormatForNumbersWidhtZeroBefore(myDate.getMonth() + 2);
                const date = this.getFormatForNumbersWidhtZeroBefore(myDate.getDate());
                return {
                    ...task,
                    date: `${year}-${month}-${date}`
                }
            });

        } catch (error) {
            console.error("Erreur fetchTasksFromApi:", error);
            this.tasks = [];
        }
    }

    getDaysInFebruary(year = this.stateYear) {
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
        this.stateDateMs -= 60 * 60 * 24 * 7 * 1000;
        const date = new Date(this.stateDateMs);
        return `${date.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(date.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
    }

    agendaWeekTurnRight() {
        this.stateDateMs += 60 * 60 * 24 * 7 * 1000;
        const date = new Date(this.stateDateMs);
        return `${date.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(date.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
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
        const mois = Math.floor((h + l - 7 * m + 114) / 31);
        const jour = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(annee, mois - 1, jour);
    }

    ajouterJours(date, nbJours) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(date.getDate() + nbJours);
        return nouvelleDate;
    }

    async getAgendaPerWeek(date = false) {
        if (date === false) {
            const currentDate = new Date();
            date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        }
        await this.fetchTasksFromApi();

        const dateArray = date.split('-').map(Number);
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];
        const dateSelected = new Date(year, month, day);

        let dayOfWeek = dateSelected.getDay();
        dayOfWeek = (dayOfWeek === 0) ? 7 : dayOfWeek;
        const lundiMs = dateSelected.getTime() - ((dayOfWeek - 1) * 24 * 60 * 60 * 1000);

        const weekDayTasks = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        const paques = this.calculerPaques(year);
        const lundiPaques = this.ajouterJours(paques, 1);
        const ascension = this.ajouterJours(paques, 39);
        const pentecote = this.ajouterJours(paques, 50);

        const joursFeries = [
            { type: 'jours férié', name: 'Jour de l’an', date: new Date(year + 1, 0, 1), bg: 'bgRed' },
            { type: 'jours férié', name: 'Lundi de Pâques', date: lundiPaques, bg: 'bgRed' },
            { type: 'jours férié', name: 'Fête du Travail', date: new Date(year, 4, 1), bg: 'bgRed' },
            { type: 'jours férié', name: 'Victoire 1945', date: new Date(year, 4, 8), bg: 'bgRed' },
            { type: 'jours férié', name: 'Ascension', date: ascension, bg: 'bgRed' },
            { type: 'jours férié', name: 'Pentecôte', date: pentecote, bg: 'bgRed' },
            { type: 'jours férié', name: 'Fête Nationale', date: new Date(year, 6, 14), bg: 'bgRed' },
            { type: 'jours férié', name: 'Assomption', date: new Date(year, 7, 15), bg: 'bgRed' },
            { type: 'jours férié', name: 'Toussaint', date: new Date(year, 10, 1), bg: 'bgRed' },
            { type: 'jours férié', name: 'Armistice', date: new Date(year, 10, 11), bg: 'bgRed' },
            { type: 'jours férié', name: 'Noël', date: new Date(year, 11, 25), bg: 'bgRed' },
            { type: 'jours férié', name: 'Pâques', date: paques, bg: 'bgRed' }
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
                date,
                year: dayYear,
                month: this.getFormatForNumbersWidhtZeroBefore(dayMonth + 1),
                dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum),
                dayLetter: dayDay
            });

            if (dayDay === 5) tasksByDay.push({
                bg: "bgBlack",
                color: 'colorWhite',
                type: 'tasks',
                name: 'Poubelles ménagères',
                date,
                year: dayYear,
                month: this.getFormatForNumbersWidhtZeroBefore(dayMonth + 1),
                dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum),
                dayLetter: dayDay
            });

            if (this.fetes) {
                for (let jf of joursFeries) {
                    if (dayDate.getTime() === jf.date.getTime()) {
                        tasksByDay.push(jf);
                    }
                }
            }

            const weekDays = {
                year: dayYear,
                month: dayMonth + 1,
                dayDateNum,
                isFetes: this.fetes,
                isCurrentDay: (currentYear === dayYear && currentMonth === dayMonth && currentDay === dayDateNum)
            };

            for (let task of this.tasks) {
                const [taskYear, taskMonth, taskDay] = task.date.split('-').map(Number);
                if (
                    taskYear === dayYear &&
                    taskMonth === dayMonth + 1 &&
                    taskDay === dayDateNum
                ) {
                    tasksByDay.push({
                        type: task.type,
                        name: task.name,
                        date,
                        year: dayYear,
                        month: this.getFormatForNumbersWidhtZeroBefore(taskMonth),
                        dateNum: this.getFormatForNumbersWidhtZeroBefore(taskDay),
                        dayLetter: dayDay
                    });
                }
            }

            weekDayTasks.push({ tasksByDay, weekDays });
        }
        return {
            dateSelected: { year: year, month: month + 1, dateDate: day },
            weekDays: weekDayTasks
        };
    }

    getAgendaPerYear(year = false) {
        if (!year) year = new Date().getFullYear();
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        this.stateDateMs = currentDate;

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return daysPerMonths.map((days, index) => ({
            year,
            month: index + 1,
            days: Array.from({ length: days }, (_, i) => {
                const day = i + 1;
                return {
                    isCurrentDay: year === currentYear && index === currentMonth && day === currentDay,
                    day,
                    task: this.checkIfTask(year, index + 1, day)
                };
            })
        }));
    }

    checkIfTask(year, month, day) {
        const matchedTasks = this.tasks.filter(task => {
            const [taskYear, taskMonth, taskDay] = task.date.split("-").map(Number);
            return taskYear === year && taskMonth === month && taskDay === day;
        });
        return matchedTasks.length ? matchedTasks : null;
    }

    async init() {
        await this.fetchTasksFromApi();
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        this.stateDateMs = currentDate.getTime();
        this.stateYear = currentDate.getFullYear();
        return this.getAgendaPerWeek(date);
    }
}
