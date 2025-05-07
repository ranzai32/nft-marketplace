---

sidebar\_label: 'Service.jsx'
title: 'Service.jsx'
---

# Service Component Documentation

## Overview

The `Service` component renders a four-step tutorial section outlining how users interact with the NFT marketplace. Each step includes an icon, a step label, a title, and a descriptive paragraph.

## Purpose

* Guide users through the primary actions: exploring collections, filtering and analyzing NFTs, connecting a crypto wallet, and trading.
* Provide a visually engaging, step-by-step breakdown to improve user onboarding and reduce friction.

## File Structure

* **Location:** `components/Service.jsx`
* **Styles:** Imports CSS module `Service.module.css` for layout and responsive styling.
* **Assets:** Uses image assets from the `images` import (e.g., `images.service1`, `images.service2`).

## Dependencies

* `react` for component creation.
* `next/image` for optimized image delivery.
* CSS Module `Service.module.css` for scoped styles.
* Local `images` object for icons (`service1` through `service4`).

## Rendering Logic

1. **Wrapper** (`<div className={Style.service}>`) sets overall section styling.
2. **Box Container** (`<div className={Style.service_box}>`) arranges four items in a grid or flex layout.
3. **Each Service Item** (`<div className={Style.service_box_item}>`):

   * **Image:** Renders a 100×100 icon via `<Image>` for the step.
   * **Step Label:** A `<p>` with class `service_box_item_step` showing `Step 1` through `Step 4`.
   * **Title:** `<h3>` describing the action (e.g., "Explore the Marketplace").
   * **Description:** `<p>` providing details about the action.

## Usage Example

```jsx
import Service from './Service';

function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <Service />
      {/* More content */}
    </main>
  );
}
```

---
