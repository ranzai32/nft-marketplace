---

sidebar_label: 'connectWallet.js'
title: 'connectWallet.js'
---

# connectWallet Component Documentation

## Overview

The `connectWallet` component renders a user interface for connecting a cryptocurrency wallet using multiple provider options. It displays a heading, descriptive text, and interactive provider buttons (MetaMask, WalletConnect, Formatic) with dynamic active-state styling.

## Purpose

* Allow users to select and connect their wallet via one of the supported wallet providers.
* Visually indicate the currently selected provider option.
* Trigger the `connectWallet` function from the `NFTMarketplaceContext` to initiate the wallet connection flow.

## File Structure

* **Location:** `connectWallet.js` in the components directory.
* **Styling:** Imports CSS module `connectWallet.module.css` for layout and active state styles.
* **Assets:** Imports wallet provider icons from `../img`.
* **Context:** Uses `NFTMarketplaceContext` to access `currentAccount` and `connectWallet` function.

## Dependencies

| Dependency                 | Purpose                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `react`                    | Core library and hooks (`useState`, `useContext`).            |
| `next/image`               | Optimized image rendering.                                    |
| `NFTMarketplaceContext`    | Provides `currentAccount` state and `connectWallet` function. |
| `connectWallet.module.css` | Component-specific styles.                                    |
| `../img`                   | Icon assets for wallet providers.                             |

## State & Context

| Name             | Type       | Description                                                              |
| ---------------- | ---------- | ------------------------------------------------------------------------ |
| `activeBtn`      | `number`   | Index of the currently selected wallet provider (1-based).               |
| `currentAccount` | `string`   | Address of the connected wallet (from context; not directly used in UI). |
| `connectWallet`  | `function` | Context callback to initiate wallet connection.                          |

## Rendering Logic

1. **Header Section**: Renders `<h1>Connect your wallet</h1>` and descriptive `<p>` text.
2. **Provider Buttons**: Iterates over `providerArray`:

   * Wraps each provider in a clickable `<div>` that:

     * Applies `Style.active` when `activeBtn` matches the provider index.
     * Calls `setActiveBtn` to update the selected index and invokes `connectWallet()` on click.
   * Displays the provider icon (`<Image>`) and provider name.

## Usage Example

```jsx
import connectWallet from './connectWallet';

function App() {
  return (
    <div>
      <connectWallet />
    </div>
  );
}
```

---
