import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers";

// Import global styles
import "./styles/main.css";

// Initialize Stimulus
const application = Application.start();
const context = require.context("./controllers", true, /_controller\.ts$/);
application.load(definitionsFromContext(context));

// Attach Stimulus application to window for global access (if needed)
declare global {
    interface Window {
        Stimulus: Application;
    }
}
window.Stimulus = application;

// Small global helpers
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
