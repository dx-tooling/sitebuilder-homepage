import { Application } from "@hotwired/stimulus";

import ThemeController from "../controllers/theme_controller";
import HeroEffectsController from "../controllers/hero_effects_controller";
import ModalController from "../controllers/modal_controller";

const application = Application.start();
application.debug = false;

// Expose for debugging (optional, matches global.d.ts)
window.Stimulus = application;

application.register("theme", ThemeController);
application.register("hero-effects", HeroEffectsController);
application.register("modal", ModalController);
