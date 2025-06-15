import { avatars } from "../../data/avatars.js";

export class ConnexionView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            const page = document.createElement("div");
            page.className = "connexion";

            const pageContent = document.createElement("div");
            pageContent.className = "connexion__content bg_main";

            // header
            const header = document.createElement("p");
            header.className = "connexion__content__header";
            header.textContent = "Qui travail ?";

            // avatars
            const avatarsContainer = document.createElement("div");
            avatarsContainer.className = "avatarsContainer";

            avatars.forEach((avatar) => {
                const fiche = document.createElement("div");
                fiche.className = "avatarConnexion";

                const link = document.createElement("a");
                link.className="linkImg";
                link.href = "/home";
                link.setAttribute("data-link", "");

                const img = document.createElement("img");
                img.src = `/public/assets/pictures/photos/${avatar.img_url}`;
                img.className = `avatar ${avatar.color}`;
                img.setAttribute("data-name", avatar.name);

                link.appendChild(img);
                fiche.appendChild(link);
                avatarsContainer.appendChild(fiche);
            });

            pageContent.appendChild(header);
            pageContent.appendChild(avatarsContainer);
            page.appendChild(pageContent);
            el.appendChild(page);
        }
    }
} 