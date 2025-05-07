---
sidebar_label: 'Sidebar.jsx'
title: 'Sidebar.jsx'
---

# Sidebar Component Documentation

## Overview

The `Sidebar` component provides a collapsible side navigation menu for the application. It displays branding, social links, navigation sections (Discover and Help Center), and action buttons for creating content or connecting a wallet.

## Purpose

* Offer a slide-in menu to navigate between primary pages (Collection, Search, NFT Details, etc.) and help topics.
* Display social media links for community engagement.
* Provide quick access to user actions: Create and Connect Wallet.

## Props

| Prop              | Type     | Description                                                                 |
| ----------------- | -------- | --------------------------------------------------------------------------- |
| `setOpenSideMenu` | function | Callback to toggle visibility of the sidebar (e.g., close the menu).        |
| `currentAccount`  | string   | The connected wallet address, used to conditionally render account info.    |
| `connectWallet`   | function | Function to initiate a wallet connection when user clicks “Connect Wallet.” |

## State

| State          | Type    | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| `openDiscover` | boolean | Controls expansion of the “Discover” submenu.    |
| `openHelp`     | boolean | Controls expansion of the “Help Center” submenu. |

## Structure & Logic

1. **Branding & Close Button**

   * Renders the app logo and a short description.
   * A close icon (`GrClose`) calls `setOpenSideMenu(false)` to hide the sidebar.

2. **Social Links**

   * Icons for Facebook, LinkedIn, Twitter, YouTube, and Instagram.
   * Each wrapped in an `<a>` tag for external links.

3. **Navigation Sections**

   * **Discover** and **Help Center** menus use local state (`openDiscover`, `openHelp`) to toggle visibility.
   * Menu items are defined in arrays (`discover`, `helpCenter`) with `name` and `link`.
   * When expanded, each maps to a `<Link>` to the corresponding route.

4. **Action Buttons**

   * Two buttons (`Create` and `Connect Wallet`) rendered via a reusable `Button` component.
   * `Connect Wallet` invokes the `connectWallet` prop.

## File Structure

* **Location:** `components/Sidebar/Sidebar.jsx`
* **Styles:** Imports CSS module `Sidebar.module.css` for layout, spacing, and responsive design.
* **Dependencies:**

  * React hooks (`useState`)
  * `next/image` for optimized logo rendering
  * `next/link` for client-side navigation
  * Icons from `react-icons` (`GrClose`, `TiSocial*`, `TiArrowSortedDown`, `TiArrowSortedUp`)
  * A shared `Button` component for actions

## Usage Example

```jsx
import Sidebar from './Sidebar';

function AppLayout({ currentAccount, connectWallet }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <button onClick={() => setSidebarOpen(true)}>Open Menu</button>
      {isSidebarOpen && (
        <Sidebar
          setOpenSideMenu={setSidebarOpen}
          currentAccount={currentAccount}
          connectWallet={connectWallet}
        />
      )}
      {/* Main application content */}
    </>
  );
}
```

---
