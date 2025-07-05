
export class AuthView {

    constructor() {
        this.isConnection = true;
    }

    render() {
        const el = document.getElementById("root");
        el.innerHTML = "";
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
            const footer = document.createElement("div");
            footer.className = "auth__footer";
            const para1 = document.createElement("p");
            para1.textContent = `${this.isConnection ? "Besoin d'un compte?" : "Se connecter directement"}`;

            const para2 = document.createElement("p");
            para2.className = "switchAuth";
            para2.textContent = `${this.isConnection ? "Inscrit toi !" : "Connecte toi !"}`;
            footer.appendChild(para1);
            footer.appendChild(para2);

            formContainer.appendChild(footer);
            page.appendChild(header);
            page.appendChild(formContainer);
            el.appendChild(page);

            this.isConnection ? this.renderConnection(switchAuth) : this.renderInscription(switchAuth);
        }
      
    }

    renderConnection(el) {
        const form = document.createElement("form");
        form.className="form-auth";

        const title = document.createElement("h2");
        title.className = "auth__header__title";
        title.textContent = this.isConnection ? "Connexion" : "Inscription";
        form.appendChild(title);

        const nameContainer = document.createElement("div");
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Nom";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameInput);

        const passwordContainer = document.createElement("div");
        const passwordLabel = document.createElement("label");
        passwordLabel.textContent = "Mot de passe";
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
        form.className = "form-auth";

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
        secretKeyLabel.textContent = "Mot magique";
        const secretKeyInput = document.createElement("input");
        secretKeyInput.name = "magicWord";
        secretKeyInput.type = "text";
        secretKeyContainer.appendChild(secretKeyLabel);
        secretKeyContainer.appendChild(secretKeyInput)

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.textContent = "S'inscrire";

        form.appendChild(nameContainer);
        form.appendChild(passwordContainer);
        form.appendChild(secretKeyContainer);
        form.appendChild(btn);

        el.appendChild(form);
    }

} 