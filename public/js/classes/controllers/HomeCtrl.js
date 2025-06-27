export class HomeCtrl {

    constructor(homeView, agendaView, agendaModel, seoManager, homeEventBinder) {
        this.homeView = homeView;
        this.agendaView = agendaView;
        this.agendModel = agendaModel;
        this.seoManager = seoManager;
        this.homeEventBinder = homeEventBinder;
    }

    show() {
        this.homeView.render();
        const data = this.agendModel.init();
        this.agendaView.renderCalendarWeek(data);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Accueil');
        this.homeEventBinder.addEventListeners();
    }
}