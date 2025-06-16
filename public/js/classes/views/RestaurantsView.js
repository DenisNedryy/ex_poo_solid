import { liste_restaurants } from "/public/js/data/restaurants.js";

export class RestaurantsView {
    constructor() {
        this.restaurants = this.majRestaurants(liste_restaurants);
        this.jour = "";
    }

    majRestaurants(restaurants) {
        const now = new Date();
        this.jour = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
        const heure = now.getHours();
        const minutes = now.getMinutes();

        return restaurants.map((resto) => {

            const thing = {};
            thing.name = resto.name;
            thing.img_url = resto.imgName;
            thing.phone = resto.phone;

            thing.isOpenned = resto.horaires[this.jour].isOpened;
            if (thing.isOpenned) {
                thing.horaires = resto.horaires[this.jour].horaires;
                const horaires = resto.horaires[this.jour].horairesData;
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
    }

    displayAvailableRestaurantsInPriority(restaurants) {
        const openResto = [];
        const closedResto = [];
        restaurants.forEach((resto) => {
            if (resto.isOpenned) {
                openResto.push(resto);
            } else {
                closedResto.push(resto);
            }
        })
        return openResto.concat(closedResto);
    }

    render() {
        const classedRestaurants = this.displayAvailableRestaurantsInPriority(this.restaurants)
        const el = document.getElementById('root');
        if (el) {

            let sum = `
            <div class="restaurants"> 
               <div class="restaurants__header bg_head">
                    <h2>Restaurants</h2>
                </div>
                <div class="restaurants__content bg_main">
            `;
            classedRestaurants.forEach((resto) => {
                sum += `
                <div class="restaurants__fiche ${resto.isOpenned ? '' : 'resto-close'}">
                   <img src="/public/assets/pictures/restaurants/${resto.img_url}" />
                   <div class="restaurants__fiche__text">
                   <div class="restaurants__fiche--name">
                        <div class="${resto.isOpenned ? "ball green" : "ball red"}"></div>
                         <p class="restaurants__fiche__name--titre">${resto.name}</p>
                   </div>
                    <p class="restaurants__fiche__name--horaires">${resto.horaires ? resto.horaires : "fermé"}</p>
                    <div class="restaurants__fiche__name--jour"><p>${this.jour}</p></div>
                    <p>${this.getPhoneFormat(resto.phone)}</p>
                    </div>
                </div>
`
            });
            sum += `</div></div>`;
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

