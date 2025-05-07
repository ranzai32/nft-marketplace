---

sidebar_label: 'Profile.jsx'
title: 'Profile.jsx'
---

# Profile Component Documentation

## Overview

The `Profile` component renders the current user's account information and provides a menu for navigating profile-related actions. It displays the user's avatar, name, and shortened wallet address, along with links for profile management, help, and disconnecting the wallet. A theme toggle button is also included.

## Purpose

* Show the connected user's identity (avatar and account address).
* Provide quick access to personal pages: My Profile, My Items, Edit Profile.
* Offer utility links: Help Center, Disconnect wallet.
* Allow theme switching via the `ThemeToggleButton` component.

## Props

| Prop             | Type   | Description                                      |
| ---------------- | ------ | ------------------------------------------------ |
| `currentAccount` | string | Full wallet address; displayed in shortened form |

## File Structure

* **Location:** `components/Profile.jsx`
* **Styles:** Imports `Profile.module.css` for layout and theming.
* **Dependencies:**

  * `react` for component definition.
  * `next/image` for optimized avatar rendering.
  * `react-icons` for menu icons (`FaUserAlt`, `FaRegImage`, `FaUserEdit`, `MdHelpCenter`, `TbDownloadOff`).
  * `next/link` for internal navigation.
  * `ThemeToggleButton` for toggling light/dark mode.
  * Local `images` for default avatar source.

## Rendering Structure

1. **Wrapper** `<div className={Style.profile}>`
2. **Account Section** `<div className={Style.profile_account}>`

   * Avatar: `<Image>` with `images.user1`, 50×50.
   * User Info: Name and shortened address (`currentAccount.slice(0, 18) + '...'`).
3. **Menu Section** `<div className={Style.profile_menu}>`

   * **First Menu Group** `<div className={Style.profile_menu_one}>`

     * My Profile (icon + link)
     * My Items (icon + link)
     * Edit Profile (icon + link)
   * **Second Menu Group** `<div className={Style.profile_menu_two}>`

     * Help (icon + link)
     * Disconnect (icon + link; placeholder for wallet disconnect)
     * Theme toggle button (`ThemeToggleButton`).

## Usage Example

```jsx
import Profile from './Profile';

function Navbar({ account }) {
  return (
    <nav>
      <Profile currentAccount={account} />
    </nav>
  );
}
```
