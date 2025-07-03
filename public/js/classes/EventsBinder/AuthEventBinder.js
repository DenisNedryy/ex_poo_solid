import { inscription, connection } from "../../services/Auth.js";

export class AuthEventBinder {
    constructor(view) {
        this.view = view;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleSubmit = this.handleSubmit.bind(this);
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
        document.removeEventListener("submit", this.boundHandleSubmit);
        document.addEventListener("submit", this.boundHandleSubmit);
    }

    handleClickTask(e) {
        if (e.target.classList.contains("switchAuth")) {
            this.view.isConnection = !this.view.isConnection;
            this.view.render();
        }
    }

    handleSubmit(e) {
        const isConnection = this.view.isConnection;
        e.preventDefault();
        const form = document.querySelector("form");
        if (isConnection) {
            this.submitConnection(form);
        } else {
            this.submitInscription(form);
        }
        e.target.reset();
    }

    submitConnection(form) {
        const name = form.elements['name'].value;
        const password = form.elements['password'].value;
    }

    async submitInscription(form) {
        const name = form.elements['name'].value;
        const password = form.elements['password'].value;
        const magicWord = form.elements['magicWord'].value;
        const data = {
            name: name,
            password: password,
            magicWord: magicWord
        }
        console.log(data);
        const res = await inscription(data);
        console.log(res);
    }
}