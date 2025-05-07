---

sidebar_label: 'NavBar.jsx'
title: 'NavBar.jsx'
---

# NavBar Component Documentation

## Overview

The `NavBar` component provides the main header navigation for the application. It includes the logo, search input, dropdown menus (Discover, Help Center), notification panel, create/connect button, profile menu, and a responsive sidebar toggle for mobile views.

## Purpose

* **Branding & Navigation**: Displays the logo that navigates to the home page.
* **Search**: Captures user queries with an input field and search icon.
* **Dropdown Menus**: Shows contextual menus for Discover and Help Center sections.
* **Notifications**: Renders a bell icon that toggles the `Notification` panel.
* **Action Button**: Displays “Connect” when no wallet is connected or “Create” to upload a new NFT.
* **Profile Menu**: Toggles the `Profile` dropdown with account actions.
* **Mobile Sidebar**: Provides a hamburger menu to toggle the `Sidebar` component on smaller screens.

## File Structure & Dependencies

* **Location:** `components/NavBar.jsx`
* **Imports:**

  * React hooks: `useState`, `useEffect`, `useContext`
  * Next.js: `Image`, `Link`, `useRouter`
  * Icon libraries: `MdNotifications`, `BsSearch`, `CgMenuLeft`, `CgMenuRight`
  * Context: `NFTMarketplaceContext`, `useTheme`
  * Sub-components: `Discover`, `HelpCenter`, `Notification`, `Profile`, `Sidebar`
  * CSS module: `NavBar.module.css`

## State Variables

| State          | Type    | Description                                           |
| -------------- | ------- | ----------------------------------------------------- |
| `discover`     | boolean | Controls visibility of the Discover dropdown menu.    |
| `help`         | boolean | Controls visibility of the Help Center dropdown menu. |
| `notification` | boolean | Toggles the Notification panel.                       |
| `profile`      | boolean | Toggles the Profile dropdown.                         |
| `openSideMenu` | boolean | Toggles the mobile Sidebar component.                 |

## Context & Hooks

* **`useRouter`**: Navigates to `/` when the logo is clicked.
* **`NFTMarketplaceContext`**: Provides `currentAccount` and `connectWallet` to manage wallet state.
* **`useTheme`**: Determines light or dark theme to select appropriate logo image.

## Rendering Structure

1. **Left Section** (`navbar_container_left`):

   * **Logo**: `<Image>` that routes to home on click.
   * **Search Input**: `<input>` with placeholder and `<BsSearch>` icon.

2. **Right Section** (`navbar_container_right`):

   * **Discover**: `<p>` toggling `Discover` component inside a dropdown.
   * **Help Center**: `<p>` toggling `HelpCenter` component.
   * **Notifications**: `<MdNotifications>` toggling `<Notification/>`.
   * **Action Button**: Conditional `<Button>` showing “Connect” or “Create”.
   * **Profile**: Avatar `<Image>` toggling `<Profile/>` dropdown.
   * **Mobile Menu**: `<CgMenuRight>` toggling `<Sidebar/>` for mobile navigation.

## Usage Example

```jsx
import NavBar from './NavBar';

function AppLayout() {
  return (
    <div>
      <NavBar />
      {/* Rest of the app content */}
    </div>
  );
}
```
