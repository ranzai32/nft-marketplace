---
sidebar_label: '_app.js'
title: '_app.js'
---

# App Component (`pages/_app.js`) Documentation

## Overview

The `_app.js` file in a Next.js project using the Pages Router is a special component that acts as the primary wrapper for your entire application. Next.js uses this `App` component to initialize pages. Any code here runs on every page load.

## Purpose in Artify

In the Artify NFT Marketplace project, `_app.js` serves several key purposes:

1.  **Global Styles:** It imports the `globals.css` file, ensuring that base styles, CSS variable definitions (including themes), and font imports are applied across the entire application.
2.  **Global Layout:** It renders the `NavBar` and `Footer` components outside the specific page `Component`. This creates a consistent layout where the navigation bar and footer are present on every page.
3.  **Context Providers:** It wraps the entire application (`Component` and layout elements) with necessary React Context providers:
    * **`ThemeProvider`:** Manages the light/dark theme state and applies the corresponding class to the document body. This makes the theme state and toggle function available to all components.
    * **`NFTMarketplaceProvider`:** Manages the core web3 logic, wallet connection state (`currentAccount`), interaction with the NFT marketplace smart contract, and IPFS uploads. It provides these functionalities to any component that needs them.

## File Structure

The component is located at `pages/_app.js`.

```javascript title="pages/_app.js"
import "../styles/globals.css"; // Import global styles

// Import shared layout components
import { NavBar, Footer } from "../components/componentsindex";
// Import Context Providers
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { ThemeProvider } from '../Context/ThemeContext';

// The main App component
const MyApp = ({ Component, pageProps }) => (
    // Wrapper div (optional, could be React.Fragment)
    <div>
        {/* ThemeProvider should ideally wrap NFTMarketplaceProvider if NFTMarketplaceProvider uses theme */}
        <ThemeProvider>
            <NFTMarketplaceProvider>
                {/* NavBar appears on all pages */}
                <NavBar />
                {/* Component represents the current page being rendered */}
                <Component {...pageProps} />
                {/* Footer appears on all pages */}
                <Footer />
            </NFTMarketplaceProvider>
        </ThemeProvider>
    </div>
);

export default MyApp;
```