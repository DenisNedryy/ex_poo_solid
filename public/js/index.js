// controllers
import { DailyPlanningCtrl } from "./classes/controllers/DailyPlanningCtrl.js";
import { HomeCtrl } from "/public/js/classes/controllers/HomeCtrl.js";
import { RestaurantsCtrl } from "/public/js/classes/controllers/RestaurantsCtrl.js";
import { ConnexionCtrl } from "/public/js/classes/controllers/ConnexionCtrl.js";

// views
import { DailyPlanningView } from "./classes/views/DailyPlanningView.js";
import { HomeView } from "./classes/views/HomeView.js";
import { RestaurantsView } from "./classes/views/RestaurantsView.js";
import { ConnexionView } from "/public/js/classes/views/ConnexionView.js";
import { UtilsView } from "./classes/views/UtilsView.js";

// eventBinders
import { DailyPlanningEventBinder } from "./classes/EventsBinder/DailyPlanningEventBinder.js";
import { ConnexionEventBinder } from "./classes/EventsBinder/ConnexionEventBinder.js";

// core
import { NavHighLighter } from "./classes/core/NavHighLighter.js";
import { NavigationManager } from "./classes/core/NavigationManager.js";
import { NavigationEventBinder } from "./classes/core/NavigationEventBinder.js";
import { SEOManager } from "./classes/core/SEOManager.js";

// models
import { DailyPlanningModel } from "./classes/models/dailyPlanningModel.js";

const seoManager = new SEOManager();

const dailyPlanningView = new DailyPlanningView();
const homeView = new HomeView();
const restaurantsView = new RestaurantsView();
const connexionView = new ConnexionView();
const utilsView = new UtilsView();

const dailyPlanningModel = new DailyPlanningModel();

const dailyPlanningEventBinder = new DailyPlanningEventBinder(dailyPlanningModel, dailyPlanningView);
const connexionEventBinder = new ConnexionEventBinder(connexionView, utilsView);

const dailyPlanningCtrl = new DailyPlanningCtrl(dailyPlanningView, seoManager, dailyPlanningEventBinder);
const homeCtrl = new HomeCtrl(homeView, seoManager);
const restaurantsctrl = new RestaurantsCtrl(restaurantsView, seoManager);
const connexionCtrl = new ConnexionCtrl(connexionView, seoManager, connexionEventBinder);

const routes = {
    "connexion": connexionCtrl,
    "home": homeCtrl,
    "daily-planning": dailyPlanningCtrl,
    "restaurants": restaurantsctrl
};

const navHighLighter = new NavHighLighter();
const navigationManager = new NavigationManager(routes, navHighLighter);
navigationManager.init();

const navigationEventBinder = new NavigationEventBinder(navigationManager);
navigationEventBinder.bindClickLinks();