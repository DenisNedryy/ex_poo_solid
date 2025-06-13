export class HomeView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `<h2>Accueil</h2>`;
        }
    }
} 