export class DailyPlanningCtrl {

    constructor(view, seoManager, eventBinder) {
        this.view = view;
        this.seoManager = seoManager;
        this.eventBinder = eventBinder;
    }

    init() {
        this.eventBinder.dailyPlanningModel.init();
    }

    verifyIfPlanningModelStarted() {
        if (this.eventBinder.dailyPlanningModel.planning.length === 0) {
            this.init();
        }
    }

    show() {
        this.verifyIfPlanningModelStarted();
        this.view.render(this.eventBinder.dailyPlanningModel.planning);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Planning du soir');
        this.eventBinder.addEventListeners();
    }
}