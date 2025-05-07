---

sidebar_label: 'Discover.jsx'
title: 'Discover.jsx'
---

# Discover Component Documentation

## Overview

The `Discover` component renders a list of navigation links for the main sections of the application. It maps over an array of route definitions and creates a styled `<Link>` for each, allowing users to quickly navigate to pages such as Collection, Search, NFT Details, and more.

## Purpose

* Provide a centralized discovery panel linking to primary pages of the app.
* Ensure consistency in link styling and behavior via a CSS module.
* Facilitate easy addition or removal of routes by updating the `discover` array.

## File Structure

* **Location:** `components/Discover.jsx`
* **Styles:** Imports `Discover.module.css` for layout and link styling.
* **Dependencies:**

  * `react` for component definition.
  * `next/link` for client-side navigation.

## Props

This component does not accept external props. All routes are defined internally in the `discover` array.

## Internal Data Structure

```js
const discover = [
  { name: 'Collection',    link: 'collection' },
  { name: 'Search',        link: 'searchPage' },
  { name: 'Author Profile',link: 'author' },
  { name: 'NFT Details',   link: 'nft-details' },
  { name: 'Account Setting',link: 'account' },
  { name: 'Upload NFT',    link: 'uploadNFT' },
  { name: 'Connect Wallet',link: 'connectWallet' },
  { name: 'Blog',          link: 'blog' }
];
```

Each object in the array contains:

* `name` (string): Display text for the navigation link.
* `link` (string): Pathname for the `Link` component.

## Rendering Logic

1. Iterate over `discover` with `Array.map`, using `index` as a `key`.
2. Wrap each `element.name` in a `next/link` component with `href={{ pathname: element.link }}`.
3. Apply the CSS class `Style.discover_link` to the `<Link>` and `Style.discover` to the container `<div>`.

## Usage Example

```jsx
import Discover from './Discover';

function Sidebar() {
  return (
    <aside>
      <Discover />
    </aside>
  );
}
export default Sidebar;
```

---
