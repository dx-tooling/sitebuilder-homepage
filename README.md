# SiteBuilder Homepage

Marketing homepage for SiteBuilder - the AI-powered content editing platform for teams.

## About SiteBuilder

SiteBuilder lets non-technical teams edit web content through natural language chat while engineers maintain Git workflows, code reviews, and full control. It bridges the gap between ease of use and engineering best practices.

## Tech Stack

- HTML5 with Tailwind CSS v4
- TypeScript with Stimulus.js for interactivity
- Webpack 5 for building
- PostCSS for CSS processing

## Getting Started

1. **Set Up Node.js:** This project uses Node.js 22 (defined in `.nvmrc`):
    ```bash
    nvm install
    nvm use
    ```

2. **Install Dependencies:**
    ```bash
    npm install --no-save
    ```

3. **Build:**
    ```bash
    # Development build (with source maps)
    npm run build

    # Production build (optimized)
    npm run build:prod
    ```

4. **Output:** The built site is in the `dist/` directory, ready for static hosting.

## Available Scripts

- `npm run build` - Development build
- `npm run build:prod` - Production build (minified, content hashes)
- `npm run quality` - Run Prettier, ESLint, and TypeScript checks
- `npm test` - Run tests

## Project Structure

- `src/index.html` - Main homepage
- `src/controllers/` - Stimulus controllers (theme toggle, hero effects)
- `src/partials/` - Reusable HTML snippets
- `src/static/` - Static assets (images)
- `src/styles/` - CSS source files
- `src/styleguide/` - Component reference (for development)
- `dist/` - Build output

## License

MIT License
