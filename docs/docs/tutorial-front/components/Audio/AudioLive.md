---

sidebar_label: 'AudioLive.jsx'
title: 'AudioLive.jsx'
---

# AudioLive Component Documentation

## Overview

The `AudioLive` component displays a live audio showcase section by combining featured and compact audio NFT cards in a two-column layout. It leverages the `AudioCard` component for prominent items on the left and `AudioCardSmall` for a list of secondary items on the right, creating a balanced live audio feed.

## Purpose

* **Showcase live audio NFTs:** Present high-priority audio NFTs prominently alongside a scrollable list of additional items.
* **Reusable layout:** Use existing `AudioCard` and `AudioCardSmall` components for consistency and modularity.
* **Responsive structure:** Maintain a clear visual hierarchy in a two-column arrangement for desktop and adaptable stacking for mobile views (depending on CSS).

## File Structure

* **Location:** `components/AudioLive.jsx`
* **Styles:** Imports CSS module `AudioLive.module.css` for layout, spacing, and responsive behavior.
* **Dependencies:**

  * `react` for component definition.
  * `./AudioCard/AudioCard` for large audio NFT cards.
  * `./AudioCardSmall/AudioCardSmall` for compact audio card previews.

## Rendering Logic

```jsx
return (
  <div className={Style.audioLive}>
    <div className={Style.audioLive_box}>
      <div className={Style.audioLive_box_left}>
        <AudioCard />  {/* Featured audio card */}
        <AudioCard />  {/* Additional featured audio */}
      </div>

      <div className={Style.audioLive_box_right}>
        <AudioCardSmall />  {/* Compact preview */}
        <AudioCardSmall />
        <AudioCardSmall />
      </div>
    </div>
  </div>
);
```

## Usage Example

```jsx
import AudioLive from './AudioLive';

function HomePage() {
  return (
    <section>
      <h2>Live Audio Feed</h2>
      <AudioLive />
    </section>
  );
}
```

---
