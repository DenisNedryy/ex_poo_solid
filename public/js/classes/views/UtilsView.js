export class UtilsView {

    changeAvatar(name) {
        const el = document.querySelector(".avatar");
        if (el) {
            
            
            el.innerHTML = `<img src="/public/assets/pictures/photos/${name}.png" />`
        }
        const bgColors = ["purple_bg", "pink_bg", "red_bg", "blue_bg"];

        switch (name) {
            case "axelle":
                bgColors.forEach((color) => el.classList.remove(color));
                el.classList.add("purple_bg");
                break;

            case "caroline":
                bgColors.forEach((color) => el.classList.remove(color));
                el.classList.add("pink_bg");
                break;

            case "thibault":
                bgColors.forEach((color) => el.classList.remove(color));
                el.classList.add("red_bg");
                break;

            case "javier":
                bgColors.forEach((color) => el.classList.remove(color));
                el.classList.add("blue_bg");
                break;

            default: throw new Error("pas d'avatar");
        }
    }
}