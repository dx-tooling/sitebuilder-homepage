import { Controller } from "@hotwired/stimulus";

export default class HeroEffectsController extends Controller {
    private observer: IntersectionObserver | null = null;
    private rafId: number | null = null;
    private boundOnPointerMove: ((e: PointerEvent) => void) | null = null;
    private boundOnPointerLeave: (() => void) | null = null;

    private targetRotateX = 0;
    private targetRotateY = 0;
    private targetTranslateX = 0;
    private targetTranslateY = 0;

    private currentRotateX = 0;
    private currentRotateY = 0;
    private currentTranslateX = 0;
    private currentTranslateY = 0;

    private prefersReducedMotion = false;

    static intersectionOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
    };
    static activeClass = "effects-active";

    connect() {
        this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Check if already activated (e.g., by previous navigation)
        if (this.element.classList.contains(HeroEffectsController.activeClass)) {
            return; // Don't re-initialize if already active
        }

        this.observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.activate();
                    if (!this.prefersReducedMotion) {
                        this.enableParallaxTilt();
                    }
                    // Stop observing once activated to prevent redundant calls
                    observerInstance.unobserve(entry.target);
                }
            });
        }, HeroEffectsController.intersectionOptions);

        // Observe the element immediately. The callback will fire
        // quickly if it's already intersecting.
        this.observer.observe(this.element);
    }

    disconnect() {
        // Stop observing
        if (this.observer) {
            // Unobserve might have already happened in the callback, but calling it again is safe
            this.observer.unobserve(this.element);
            this.observer.disconnect();
            this.observer = null;
        }

        this.disableParallaxTilt();
    }

    activate() {
        // Add class if not already present
        if (!this.element.classList.contains(HeroEffectsController.activeClass)) {
            this.element.classList.add(HeroEffectsController.activeClass);
        }
    }

    private enableParallaxTilt() {
        const containerEl = this.element as HTMLElement;

        // In the styleguide, the "fold" is the whole card (the direct child with transform-style:preserve-3d)
        // and many internal layers use translateZ. We therefore apply the pointer-tilt on that whole card.
        // If we can't find it, we fall back to the container.
        const tiltEl =
            (containerEl.querySelector("[style*='transform-style: preserve-3d']") as HTMLElement | null) ?? containerEl;

        // Smoothly animate back to neutral on leave
        this.boundOnPointerLeave = () => {
            this.targetRotateX = 0;
            this.targetRotateY = 0;
            this.targetTranslateX = 0;
            this.targetTranslateY = 0;
        };

        this.boundOnPointerMove = (e: PointerEvent) => {
            const rect = containerEl.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width; // 0..1
            const py = (e.clientY - rect.top) / rect.height; // 0..1

            const x = (px - 0.5) * 2; // -1..1
            const y = (py - 0.5) * 2; // -1..1

            // Tilt: keep it mostly „card-like“.
            // We only tilt on Y here so we don't conflict with the CSS rotateX fold/unfold.
            const maxTilt = 10; // degrees
            this.targetRotateY = x * maxTilt;
            this.targetRotateX = 0;

            // Small parallax translation for depth
            const maxTranslate = 8; // px
            this.targetTranslateX = x * maxTranslate;
            this.targetTranslateY = y * maxTranslate;
        };

        tiltEl.style.willChange = "transform";
        containerEl.addEventListener("pointermove", this.boundOnPointerMove, { passive: true });
        containerEl.addEventListener("pointerleave", this.boundOnPointerLeave, { passive: true });

        // Kick off render loop
        this.startRaf(tiltEl);
    }

    private disableParallaxTilt() {
        const containerEl = this.element as HTMLElement;
        const tiltEl =
            (containerEl.querySelector("[style*='transform-style: preserve-3d']") as HTMLElement | null) ?? containerEl;
        if (this.boundOnPointerMove) {
            containerEl.removeEventListener("pointermove", this.boundOnPointerMove);
            this.boundOnPointerMove = null;
        }
        if (this.boundOnPointerLeave) {
            containerEl.removeEventListener("pointerleave", this.boundOnPointerLeave);
            this.boundOnPointerLeave = null;
        }
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        // Reset inline transform so CSS can fully control the fold/unfold state.
        tiltEl.style.transform = "";
    }

    private startRaf(tiltEl: HTMLElement) {
        if (this.rafId !== null) return;

        const tick = () => {
            // Ease toward target for a premium feel
            const ease = 0.08;
            this.currentRotateX += (this.targetRotateX - this.currentRotateX) * ease;
            this.currentRotateY += (this.targetRotateY - this.currentRotateY) * ease;
            this.currentTranslateX += (this.targetTranslateX - this.currentTranslateX) * ease;
            this.currentTranslateY += (this.targetTranslateY - this.currentTranslateY) * ease;

            // Apply transform in a way that plays nicely with the CSS „fold/unfold“ animation.
            // We only add a subtle translate + rotateY here.
            // rotateX is kept at 0 to avoid fighting with the CSS rotateX fold.
            // Important: we only apply rotateY + translate here. rotateX is left to CSS (.hero-fold)
            // so the full hero box can "fold" exactly like in the styleguide.
            tiltEl.style.transform = `translate3d(${this.currentTranslateX}px, ${this.currentTranslateY}px, 0) rotateY(${this.currentRotateY}deg)`;

            this.rafId = requestAnimationFrame(tick);
        };

        this.rafId = requestAnimationFrame(tick);
    }
}
