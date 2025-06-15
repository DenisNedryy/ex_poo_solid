export class ConnexionEventBinder {
    constructor(view, utilsView) {
        this.view = view;
        this.utilsView = utilsView;
        this.boundHandleClickTask = this.handleClickTask.bind(this); //Crée une nouvelle fonction dont le contexte (this) est explicitement lié à l’instance actuelle de la classe.
        // sinon instancie un nouveau
        // le dernier this fait ref à l'instance de la classe
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
    }

    handleClickTask(e) {
        if (e.target.classList.contains("linkImg") || e.target.classList.contains("avatar")) {
            const link = e.target.closest(".linkImg");
            const avatar = link.children[0];
            const name = avatar.getAttribute("data-name");
            this.utilsView.changeAvatar(name);
        }
    }
}