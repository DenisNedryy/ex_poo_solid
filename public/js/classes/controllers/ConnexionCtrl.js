export class ConnexionCtrl {

    constructor(view, seoManager, eventBinder) {
        this.view = view;
        this.seoManager = seoManager;
        this.eventBinder = eventBinder;
    }

    init() {
        this.eventBinder.dailyPlanningModel.init();
    }

    show() {
        this.view.render();
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Choix Avatar');
        this.eventBinder.addEventListeners();
    }
}