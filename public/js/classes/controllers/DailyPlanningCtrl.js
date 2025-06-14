export class DailyPlanningCtrl {

    constructor(view, seoManager, dailyPlanningEventBinder) {
        this.view = view;
        this.seoManager = seoManager;
        this.dailyPlanningEventBinder = dailyPlanningEventBinder;
        this.verifyIfPlanningModelStarted();
    }

    init() {
        this.dailyPlanningEventBinder.dailyPlanningModel.init();
    }

    verifyIfPlanningModelStarted() {
        if (this.dailyPlanningEventBinder.dailyPlanningModel.planning.length === 0) {
            this.init();
        }
    }

    show() {
        this.view.render(this.dailyPlanningEventBinder.dailyPlanningModel.planning);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Planning du soir');
        this.dailyPlanningEventBinder.addEventListeners();
    }
}