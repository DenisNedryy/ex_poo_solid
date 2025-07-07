import { getMyProfil } from "../../services/Auth.js";
import { HOST } from "../../host.js";

export class UtilsView {

    async changeAvatar() {
        const el = document.querySelector(".avatarMenu");
        if (el) {
            
            const res = await getMyProfil();
            const myProfil = res.data.user;
            console.log(myProfil);
            el.innerHTML = `<img src="${HOST}/api/images/avatars/${myProfil.img_url}"/>`
        }
        // const bgColors = ["purple_bg", "pink_bg", "red_bg", "blue_bg"];

        // switch (name) {
        //     case "axelle":
        //         bgColors.forEach((color) => el.classList.remove(color));
        //         el.classList.add("purple_bg");
        //         break;

        //     case "caroline":
        //         bgColors.forEach((color) => el.classList.remove(color));
        //         el.classList.add("pink_bg");
        //         break;

        //     case "thibault":
        //         bgColors.forEach((color) => el.classList.remove(color));
        //         el.classList.add("red_bg");
        //         break;

        //     case "javier":
        //         bgColors.forEach((color) => el.classList.remove(color));
        //         el.classList.add("blue_bg");
        //         break;

        //     default: throw new Error("pas d'avatar");
        // }
    }
}