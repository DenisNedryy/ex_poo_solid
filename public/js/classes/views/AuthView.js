
export class AuthView {

    constructor() {
        this.isConnection = true;
    }

    render() {
        const el = document.getElementById("root");
        if (el) {
            const page = document.createElement("div");
            page.className = "auth";

            // header
            const header = document.createElement("div");
            header.className = "auth__header";
            const logo = document.createElement("img");
            logo.src = "/public/assets/pictures/logos/logo_white.png";
            header.appendChild(logo);


            // div form
            const formContainer = document.createElement("div");
            formContainer.className = "auth__body";
            const switchAuth = document.createElement("div");
            formContainer.appendChild(switchAuth);

            // footer
            const footer = document.createElement("p");
            footer.className = "auth__footer";
            footer.textContent = `${this.isConnection ? "Besoin d'un compte?" : "Se connecter directement"} ${this.isConnection ? "Inscrit toi !" : "Connecte toi !"}`;

            page.appendChild(header);
            page.appendChild(formContainer);
            page.appendChild(footer);
            el.appendChild(page);

            this.isConnection ? this.renderConnection(switchAuth) : this.renderInscription(switchAuth);
        }


    }

    renderConnection(el) {
        const form = document.createElement("form");

        const title = document.createElement("h2");
        title.className = "auth__header__title";
        title.textContent = this.isConnection ? "Connexion" : "Inscription";
        form.appendChild(title);

        const nameContainer = document.createElement("div");
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Nom:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameInput);

        const passwordContainer = document.createElement("div");
        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Password:";
        const passwordInput = document.createElement("input");
        passwordInput.name = "password";
        passwordInput.type = "password";
        passwordContainer.appendChild(passwordLabel);
        passwordContainer.appendChild(passwordInput)

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.textContent = "Se connecter";

        form.appendChild(nameContainer);
        form.appendChild(passwordContainer);
        form.appendChild(btn);

        el.appendChild(form);
    }

    renderInscription(el) {
        const form = document.createElement("form");

        const title = document.createElement("h2");
        title.className = "auth__header__title";
        title.textContent = this.isConnection ? "Connexion" : "Inscription";
        form.appendChild(title);

        const nameContainer = document.createElement("div");
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Nom:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameInput);

        const passwordContainer = document.createElement("div");
        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Password:";
        const passwordInput = document.createElement("input");
        passwordInput.name = "password";
        passwordInput.type = "password";
        passwordContainer.appendChild(passwordLabel);
        passwordContainer.appendChild(passwordInput)

        const secretKeyContainer = document.createElement("div");
        const secretKeyLabel = document.createElement("label");
        passwordLabel.textContent = "Secret key:";
        const secretKeyInput = document.createElement("input");
        secretKeyInput.name = "secretKey";
        secretKeyInput.type = "password";
        secretKeyContainer.appendChild(secretKeyLabel);
        secretKeyContainer.appendChild(secretKeyInput)

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.textContent = "Se connecter";

        form.appendChild(nameContainer);
        form.appendChild(passwordContainer);
        form.appendChild(btn);

        el.appendChild(form);
    }

} 