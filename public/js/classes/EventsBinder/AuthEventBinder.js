import { inscription, connection } from "../../services/Auth.js";

export class AuthEventBinder {
    constructor(view, utilsView) {
        this.view = view;
        this.utilsView = utilsView;
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
        const form = e.target.closest("form");
        if (!form || !form.classList.contains("form-auth")) return;

        if (isConnection) {
            this.submitConnection(form);
        } else {
            this.submitInscription(form);
        }
        e.target.reset();
    }

    async submitConnection(form) {
        const name = form.elements['name'].value;
        const password = form.elements['password'].value;
        const data = {
            name: name,
            password: password
        }
        const res = await connection(data);
        console.log(res);
        // modification avatar
        this.utilsView.changeAvatar();
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
        const res = await inscription(data);
        console.log(res);
    }
}