---
title: "Internationalization: SiteBuilder Now Speaks Your Language"
description: "Full i18n support with English and German locales, locale-prefixed routing, and a language switcher throughout the application."
author: "Manuel Kießling"
published_time: "2026-01-29T10:00:00+00:00"
tags: [SiteBuilder, Features, i18n, Localization]
readTime: "3 min read"
---

SiteBuilder is now fully internationalized with support for English and German. Every button, label, message, and notification has been translated, giving teams a native-language experience.

![SiteBuilder Content editor with EN/DE language switcher and prompt suggestions](https://dx-tooling.org/sitebuilder-assets/webapp-screenshots/web-versions/SiteBuilder-content-editor-with-remote-assets-sidebar-and-prompt-suggestions-1600x1292.png)

# What Changed

The entire application is now available in two languages:

- **English (en)** — The default language
- **German (de)** — Full translation of all UI elements

This isn't a partial translation. We've gone through all 14 templates and identified ~160 translation keys covering:

- Navigation and menus
- Form labels and validation messages
- Button text and action labels
- Status badges and indicators
- Error messages and notifications
- Help text and descriptions

# Locale-Prefixed Routing

URLs now include a locale prefix for clean, shareable links:

```
/en/projects           → English projects list
/de/projects           → German projects list
/en/conversation/123   → English conversation view
/de/conversation/123   → German conversation view
```

The routing handles locale detection automatically:

1. If you visit a URL without a locale prefix, you're redirected to your preferred language
2. Links within the application maintain your current locale
3. Direct links to a specific locale always work, regardless of your preference

This means you can share a link with a colleague, and they'll see the page in the language you intended.

# Language Switcher

A language switcher is available throughout the application. Click it to toggle between English and German. Your preference is remembered across sessions.

The switcher appears in the navigation area, making it accessible from any page without interrupting your workflow.

# Why This Matters

For teams operating in German-speaking regions, a native-language interface removes friction:

- **Onboarding** — New users understand the interface immediately
- **Support** — Error messages and help text are clearer in your native language
- **Adoption** — Lower barrier for non-technical team members

Even if you're comfortable with English, working in your native language reduces cognitive load during focused work.

# Technical Notes

The implementation uses Symfony's translation component with ICU message format for complex pluralization and formatting. Translations are stored in YAML files organized by domain:

```
translations/
├── messages.en.yaml
├── messages.de.yaml
├── validators.en.yaml
└── validators.de.yaml
```

Adding a new language requires:

1. Creating translation files for the new locale
2. Adding the locale to the supported locales configuration
3. Updating the language switcher component

The architecture is extensible — additional languages can be added without code changes to templates.

# What's Next

We're considering additional languages based on user demand:

- French
- Spanish
- Dutch

If your team needs a specific language, let us know through a [GitHub issue](https://github.com/dx-tooling/sitebuilder-webapp/issues).
