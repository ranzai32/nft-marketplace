---

sidebar_label: 'aboutUs.js'

title: 'aboutUs.js'
---

# AboutUs Component Documentation

## Overview

The `AboutUs` component renders the informational "About Us" page, showcasing the project’s mission, founders, key metrics, and brand identity. It organizes content into distinct sections: a hero banner, founders grid, fast facts summary, and a repeating Brand logo block.

## Purpose

* **Communicate mission**: Present the organization’s vision and daily activities.
* **Highlight leadership**: Display images, names, and titles of the co-founders.
* **Showcase impact**: List key statistics such as articles published, registered users, and global presence.
* **Reinforce branding**: End with a Brand component for consistent site-wide brand exposure.

## File Structure

* **Location:** `components/AboutUs.js` (or `pages/aboutUs.js`)
* **Styles:** Imports CSS module `aboutUs.module.css` for layout, typography, and responsive design.
* **Assets:** Uses `next/image` for optimized image rendering and an `images` object for asset URLs.
* **Sub-components:**

  * `Brand` from `componentsindex` for site branding at the bottom.

## Data Arrays

| Array          | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `founderArray` | List of founder objects with `name`, `position`, and `image`.      |
| `factsArray`   | Array of fact objects each with `title` and `info` for fast facts. |

## Rendering Logic

1. **Hero Section** (`aboutUs_box_hero`):

   * Left: `<h1>` and `<p>` describing the site’s mission.
   * Right: Hero image via `next/image`.
2. **Founders Section** (`aboutUs_box_founder`):

   * Title block with `<h2>Founders</h2>` and introductory `<p>`.
   * Grid mapping over `founderArray`:

     * Each item renders an image, `<h3>{name}</h3>`, and `<p>{position}</p>`.
3. **Fast Facts Section** (`aboutUs_box_facts`):

   * Title block with `<h2>Fast Facts</h2>`.
   * Grid mapping over `factsArray`, rendering `<h3>{title}</h3>` and `<p>{info}</p>`.
4. **Brand Block**:

   * Renders the shared `Brand` component at the bottom.

## Dependencies

* **React** for component structure.
* **next/image** for optimized images.
* **CSS Modules** (`aboutUs.module.css`) for scoped styling.
* **Brand** component for logo display.
* **images** object for importing static assets.

## Usage Example

```jsx
import AboutUs from '../components/AboutUs';

function AboutPage() {
  return <AboutUs />;
}

export default AboutPage;
```
