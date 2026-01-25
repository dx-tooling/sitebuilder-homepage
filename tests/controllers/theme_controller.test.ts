import { Application } from "@hotwired/stimulus";
import ThemeController from "../../src/controllers/theme_controller";

// Mock matchMedia used by the controller
const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: matches,
            media: query,
            onchange: null as ((this: MediaQueryList, ev: MediaQueryListEvent) => never) | null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
};

// Helper to set up the DOM and start Stimulus (now async)
const setupDOM = async (themeInStorage: string | null = null): Promise<Application> => {
    // Set localStorage *before* setting up the DOM
    if (themeInStorage !== null) {
        localStorage.setItem("theme", themeInStorage);
    } else {
        localStorage.removeItem("theme");
    }

    document.body.innerHTML = `
    <div data-controller="theme">
      <button data-theme-target="toggleButton" data-action="click->theme#toggle" aria-label="Toggle theme">
        <svg data-theme-target="sunIcon" class="w-5 h-5 hidden" data-testid="sun-icon"></svg>
        <svg data-theme-target="moonIcon" class="w-5 h-5 hidden" data-testid="moon-icon"></svg>
      </button>
    </div>
  `;

    const application = Application.start();
    application.register("theme", ThemeController);

    // Wait for Stimulus connect to potentially run
    await new Promise((resolve) => setTimeout(resolve, 0));

    return application;
};

describe("ThemeController", () => {
    let application: Application;

    beforeEach(() => {
        // Clear mocks and localStorage before each test
        vi.clearAllMocks();
        localStorage.clear();
        // Default to OS light mode unless overridden
        mockMatchMedia(false);
    });

    afterEach(() => {
        application?.stop();
        document.body.innerHTML = ""; // Clean up DOM
    });

    it("should apply dark theme if set in localStorage", async () => {
        application = await setupDOM("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        // Sun icon visible in dark mode (to switch to light)
        expect(sunIcon.classList.contains("hidden")).toBe(false);
        expect(moonIcon.classList.contains("hidden")).toBe(true);
    });

    it("should apply light theme if set in localStorage", async () => {
        application = await setupDOM("light");
        expect(document.documentElement.classList.contains("dark")).toBe(false);
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        // Moon icon visible in light mode (to switch to dark)
        expect(sunIcon.classList.contains("hidden")).toBe(true);
        expect(moonIcon.classList.contains("hidden")).toBe(false);
    });

    it("should apply dark theme if OS preference is dark and no localStorage theme", async () => {
        mockMatchMedia(true); // Simulate OS dark mode
        application = await setupDOM(null);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        expect(sunIcon.classList.contains("hidden")).toBe(false);
        expect(moonIcon.classList.contains("hidden")).toBe(true);
    });

    it("should apply light theme if OS preference is light and no localStorage theme", async () => {
        mockMatchMedia(false); // Simulate OS light mode
        application = await setupDOM(null);
        expect(document.documentElement.classList.contains("dark")).toBe(false);
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        expect(sunIcon.classList.contains("hidden")).toBe(true);
        expect(moonIcon.classList.contains("hidden")).toBe(false);
    });

    it("should toggle from light to dark on click", async () => {
        application = await setupDOM("light");
        const button = document.querySelector('[data-action="click->theme#toggle"]') as HTMLButtonElement;

        button.click();
        // Wait for potential DOM updates after click
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(localStorage.getItem("theme")).toBe("dark");
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        expect(sunIcon.classList.contains("hidden")).toBe(false);
        expect(moonIcon.classList.contains("hidden")).toBe(true);
    });

    it("should toggle from dark to light on click", async () => {
        application = await setupDOM("dark");
        const button = document.querySelector('[data-action="click->theme#toggle"]') as HTMLButtonElement;

        button.click();
        // Wait for potential DOM updates after click
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(document.documentElement.classList.contains("dark")).toBe(false);
        expect(localStorage.getItem("theme")).toBe("light");
        const sunIcon = document.querySelector('[data-testid="sun-icon"]') as SVGElement;
        const moonIcon = document.querySelector('[data-testid="moon-icon"]') as SVGElement;
        expect(sunIcon.classList.contains("hidden")).toBe(true);
        expect(moonIcon.classList.contains("hidden")).toBe(false);
    });

    // Add test for OS preference change listener if needed (more complex mocking)
});
