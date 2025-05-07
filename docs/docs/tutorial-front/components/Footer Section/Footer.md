---

sidebar_label: 'Footer.jsx'
title: 'Footer.jsx'
---

# Footer Component Documentation

## Overview

The `Footer` component renders the bottom section of the application, providing branding, social links, site navigation, and a newsletter subscription form. It adapts its styling to the current theme (light or dark) via context.

## Purpose

* Display company branding and description.
* Offer quick access to social media channels (Facebook, LinkedIn, Twitter, YouTube, Instagram).
* Present site navigation through `Discover` and `HelpCenter` sub-components.
* Provide an email subscription form with an input field and send button.
* Adapt logo and styles based on the active theme from `ThemeContext`.

## File Structure

* **Location:** `components/Footer.jsx`
* **Styles:** Imports CSS module `Footer.module.css` for layout, spacing, and responsive design.
* **Images:** Uses `next/image` for optimized logo delivery, switching between `images.logo` and `images.logoLight` based on theme.
* **Imports:**

  * React and `useTheme` hook from `Context/ThemeContext`.
  * Icon components from `react-icons`: `TiSocialFacebook`, `TiSocialLinkedin`, `TiSocialTwitter`, `TiSocialYoutube`, `TiSocialInstagram`, `RiSendPlaneFill`.
  * Sub-components: `Discover` and `HelpCenter` from `NavBar`.
  * `images` object for logos.

## Dependencies

| Dependency                         | Purpose                   |
| ---------------------------------- | ------------------------- |
| `react`                            | Component creation        |
| `next/image`                       | Optimized image rendering |
| `react-icons/ti`, `react-icons/ri` | Social and UI icons       |
| `useTheme` (ThemeContext)          | Theme-based styling logic |
| `Discover`, `HelpCenter`           | Navigation lists          |

## Rendering Structure

1. **Wrapper** (`<div className={Style.footer}>`)
2. **Content Container** (`<div className={Style.footer_box}>`)

   * **Branding & Social** (`footer_box_social`)

     * Logo image (`next/image`) switching by theme.
     * Description paragraph.
     * Social media icon links wrapped in `<a>` tags.
   * **Discover Section** (`footer_box_discover`)

     * Title `<h3>Discover</h3>` and `<Discover />` list.
   * **Help Center** (`footer_box_help`)

     * Title `<h3>Help Center</h3>` and `<HelpCenter />` list.
   * **Subscribe Section** (`subscribe`)

     * Title `<h3>Subscribe</h3>`.
     * Email input and send icon (`RiSendPlaneFill`).
     * Informational text.

## Usage Example

```jsx
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="app">
      {/* ... main content ... */}
      <Footer />
    </div>
  );
}
```
