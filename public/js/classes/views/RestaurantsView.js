import { liste_restaurants } from "/public/js/data/restaurants.js";

export class RestaurantsView {

    render() {
        const el = document.getElementById('root');
        if (el) {

            const now = new Date();
            const jour = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
            const heure = now.getHours();
            const minutes = now.getMinutes();

            const listRestaus = liste_restaurants.map((resto) => {

                const thing = {};
                thing.name = resto.name;
                thing.img_url = resto.imgName;
                thing.phone = resto.phone;

                thing.isOpenned = resto.horaires[jour].isOpened;
                if (thing.isOpenned) {
                    thing.horaires = resto.horaires[jour].horaires;
                    const horaires = resto.horaires[jour].horairesData;
                    let horaireText = "";
                    if (horaires.length > 1) {
                        horaireText = horaires[1];
                    } else {
                        horaireText = horaires[0];
                    }

                    if (Number(horaireText.split("-")[1]) <= Number(`${heure}.${minutes}`)) thing.isOpenned = false;
                }
                return thing;

            });



            let sum = `<div class="restaurants">`;
            listRestaus.forEach((resto) => {
                sum += `
<div class="restaurants__fiche">
  <img src="/public/assets/pictures/restaurants/${resto.img_url}" />
  <div class="restaurants__fiche__name">
    <p class="restaurants__fiche__name--titre">${resto.name}</p>
 
    <p class="restaurants__fiche__name--horaires">${resto.horaires ? resto.horaires : "fermé"}</p>
    </div>
       <div class="restaurants__fiche__name--jour"><p>${jour}</p></div>
  <div class="${resto.isOpenned ? "ball green" : "ball red"}"></div>
  <div class="restaurants__fiche__name--phone">
  <p>${this.getPhoneFormat(resto.phone)}</p>
  </div>
</div>
`
            });
            sum+=`</div>`;
            el.innerHTML = sum;

        }
    }

    getPhoneFormat(val) {
        const cleanVal = val.split("").filter((cell) => cell !== " ").join("");
        const phoneArr = cleanVal.split("");
        let newPhoneArr = phoneArr.map((cell, i) => {
            if (i % 2 !== 0) {
                return i === phoneArr.length - 1 ? cell : `${cell}.`
            } else {
                return cell;
            }
        });

        return newPhoneArr.join("");
    }


}

