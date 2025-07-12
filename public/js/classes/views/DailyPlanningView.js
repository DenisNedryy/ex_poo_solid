import { gifs } from "../../data/gifs.js";

export class DailyPlanningView {

    render(tachesSoir) {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = "";
            let sum =
                `
                  <div class="dailyPlanning">
                <div class="dailyPlanning__header bg_head"> 
                    <h2>Planning du soir</h2>
                </div>
                <div class="dailyPlanning__content bg_main"> 
                <div class="dailyPlanning__content__fiches">
            `;
            sum += "<div class='dailyPlanning__content__fiches_1'>";

            console.log(Math.floor(tachesSoir.length / 2));
            tachesSoir.forEach((tache, index) => {
                if (index+1 <= Math.floor(tachesSoir.length / 2)) {
                    sum += `
                    <div class="tache">
                        <p class="${tache.isDone ? 'rayé' : ''} tache__name">${tache.name}</p>
                        <div class="${tache.isDone ? 'bg_green' : ''} tache__isDone" data-index=${index}>
                         ${tache.isDone ? "<i class='fa-solid fa-check check'></i>" : ""}
                         </div>
                    </div>
                `;
                }
            });

            sum += "</div><div class='dailyPlanning__content__fiches_2'>";

            tachesSoir.forEach((tache, index) => {
                if (index+1 > Math.floor(tachesSoir.length / 2)) {
                    sum += `
                    <div class="tache">
                        <p class="${tache.isDone ? 'rayé' : ''} tache__name">${tache.name}</p>
                        <div class="${tache.isDone ? 'bg_green' : ''} tache__isDone" data-index=${index}>
                         ${tache.isDone ? "<i class='fa-solid fa-check check dailyPlaningTask'></i>" : ""}
                         </div>
                    </div>
                `;
                }
            });


            sum += `</div></div><div class='dailyPlanning__gif'></div></div></div>`;

            el.innerHTML = sum;
        }
    }

    displayGif() {
        const el = document.querySelector(".dailyPlanning__gif");
        if (el) {
            const img = document.createElement("img");
            const randomNumber = Math.floor(Math.random() * 6);
            img.src = `/public/assets/pictures/gifs/${gifs[randomNumber]}.gif`;

            setTimeout(() => {
                el.removeChild(img);
            }, [5000]);
            el.appendChild(img);
        }
    }

} 
