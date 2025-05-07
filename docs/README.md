# Artify NFT Marketplace - Documentation Site

This directory (`/docs`) contains the source files for the Artify NFT Marketplace documentation website. The site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Getting Started with the Documentation Site

Follow these instructions to set up and run the documentation site locally.

### Prerequisites

* Node.js (v18 or later recommended)
* npm (v8 or later recommended, comes with Node.js)
* Git

### Installation

If the `/docs` directory already contains a Docusaurus project (you see `docusaurus.config.js`, `package.json`, etc.), navigate into it and install the dependencies:

1.  **Navigate to the `docs` directory:**
    ```sh
    cd docs
    ```
2.  **Install Dependencies:**
    ```sh
    npm install
    ```

### Local Development

To start the Docusaurus development server:

1.  **Ensure you are in the `docs` directory.**
2.  **Run the start command:**
    ```sh
    npm start
    ```
    This command typically starts a local development server (usually on `http://localhost:3000` or the next available port) and opens it in your browser. Most changes you make to the documentation files (in Markdown, etc.) will be reflected live.

### Build

To generate a static, production-ready build of the documentation website:

1.  **Ensure you are in the `docs` directory.**
2.  **Run the build command:**
    ```sh
    npm run build
    ```
    *(This assumes you have a `build` script in your `docs/package.json` that executes `docusaurus build`)*.

    This command generates static HTML, CSS, and JavaScript files into the `build` directory (i.e., `docs/build`). These files can then be deployed to any static content hosting service.

