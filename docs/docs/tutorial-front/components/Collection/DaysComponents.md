---
sidebar_label: 'DaysComponents.jsx'
title: 'DaysComponents.jsx'
---

# DaysComponents Component Documentation

## Overview

The `DaysComponents` component renders a single NFT creator card, displaying a background image, dual profile thumbnails, collection title, creator info, and price. It is designed for use within time-based lists (24h, 7d, 30d) in the `Collection` component.

## Purpose

* Present an individual creator’s top collection snapshot.
* Display a prominent background image for the collection.
* Overlay two smaller profile images in the lower half of the card.
* Show the collection title, creator name with verification icon, and current price.

## File Structure

* **Location:** `Collection/DaysComponents.jsx` (or similar path)
* **Style:** Imports CSS module `DaysComponents.module.css` for layout and styling.
* **Dependencies:**

  * `react` for component structure.
  * `next/image` for optimized image rendering.
  * `react-icons/md` for the `MdVerified` icon.
  * Local `images` object for fallback or default assets.

## Props

| Prop    | Type   | Description                                                                          |
| ------- | ------ | ------------------------------------------------------------------------------------ |
| element | Object | Data object containing `background` (string URL) and `user` (string URL) for images. |
| index   | number | Index of this element in the parent list (optional use).                             |

### `element` structure example

```js
{
  background: '/path/to/collection-cover.jpg',
  user: '/path/to/creator-avatar.jpg'
}
```

## Rendering Logic

1. **Wrapper and Container**

   * Outer `<div className={Style.daysComponent_wrapper}>` for overall card spacing.
   * Inner `<div className={Style.daysComponent}>` as the card container.

2. **Image Section** (`daysComponent_box_img`)

   * **Top image** (`element.background`) covers full card width.
   * **Bottom images**: two smaller thumbnails (both currently using `images.creatorbackground2`) side by side.
   * Images use `next/image` with `objectFit: 'cover'` and responsive dimensions.

3. **Title and Info Section** (`daysComponent_box_title`)

   * Hardcoded `<h2>Amazing Collection</h2>` (update as needed to use dynamic data).
   * Creator info row:

     * Small avatar image (`element.user`)
     * Label “Creator” and name (“Maksim”) with `<MdVerified />` icon.
   * Price display: `<small>1.255 ETH</small>` (replace with dynamic pricing if available).

## Usage Example

```jsx
import DaysComponents from './DaysComponents';

const sampleElement = {
  background: '/images/collection1.jpg',
  user: '/images/creator1.jpg'
};

function ExampleList() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {dataArray.map((element, idx) => (
        <DaysComponents key={idx} element={element} index={idx} />
      ))}
    </div>
  );
}
```

**Note:** Replace hardcoded title, creator name, and price with props or dynamic fields as your data dictates.
