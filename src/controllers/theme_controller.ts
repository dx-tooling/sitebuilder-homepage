import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["toggleButton"];

    declare readonly toggleButtonTarget: HTMLButtonElement;
    declare readonly hasToggleButtonTarget: boolean;

    connect() {
        this.applyTheme();
    }

    toggle() {
        // Determine the *new* theme based on the *current* visual state
        const isCurrentlyDark = document.documentElement.classList.contains("dark");
        const newTheme = isCurrentlyDark ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        this.applyTheme(newTheme);
    }

    applyTheme(theme: string | null = null) {
        const selectedTheme = theme ?? localStorage.getItem("theme");
        const osPreferenceDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const htmlElement = document.documentElement;

        let effectiveTheme: "dark" | "light";

        if (selectedTheme === "dark" || (selectedTheme === null && osPreferenceDark)) {
            htmlElement.classList.add("dark");
            effectiveTheme = "dark";
        } else {
            htmlElement.classList.remove("dark");
            effectiveTheme = "light";
        }

        // Update button UI
        if (this.hasToggleButtonTarget) {
            this.toggleButtonTarget.setAttribute(
                "aria-label",
                effectiveTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
            );

            // Keep a stable tooltip for mouse users
            this.toggleButtonTarget.title = effectiveTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

            // Icon-only button: show sun in dark mode (action -> light), moon in light mode (action -> dark)
            this.toggleButtonTarget.innerHTML =
                effectiveTheme === "dark"
                    ? `
<span aria-hidden="true" class="inline-flex items-center justify-center">
  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.19l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.81l1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
</span>
`
                    : `
<span aria-hidden="true" class="inline-flex items-center justify-center">
  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 16.5c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 12.75C3 18.135 7.365 22.5 12.75 22.5a9.753 9.753 0 0 0 9.002-7.498Z" />
  </svg>
</span>
`;
        }
    }
}
