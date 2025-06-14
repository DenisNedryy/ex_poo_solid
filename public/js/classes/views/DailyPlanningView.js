export class DailyPlanningView {

    render(tachesSoir) {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = "";
            let sum =
                `
                  <div class="dailyPlanning">
                <div class="dailyPlanning__header bg_head"> 
                    <h2>Daily-Planning</h2>
                </div>
                <div class="dailyPlanning__content bg_main"> 
            `;

            tachesSoir.forEach((tache, index) => {
                sum += `
                    <div class="tache">
                        <p class="${tache.isDone? 'rayé': '' } tache__name">${tache.name}</p>
                        <div class="${tache.isDone?'bg_green' : ''} tache__isDone" data-index=${index}>
                         ${tache.isDone? "<i class='fa-solid fa-check check'></i>" : ""}
                         </div>
                    </div>
                `;
            })
            sum += `</div></div>`;

            el.innerHTML = sum;
        }
    }
} 
