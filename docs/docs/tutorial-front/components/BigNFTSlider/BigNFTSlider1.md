---

sidebar_label: 'BigNFTSilder.jsx'
title: 'BigNFTSilder.jsx'
---

# BigNFTSilder Component Documentation

## Overview

The `BigNFTSilder` component implements a featured NFT carousel slider, showcasing highlighted NFTs with detailed information including title, creator, collection, current bid, countdown timer, like count, and navigation controls.

## Purpose

* Display a large, interactive NFT slider on the homepage or detail pages.
* Allow users to navigate between multiple featured NFTs using previous/next buttons.
* Present key data points: NFT title, creator name (with verification badge), collection name, current bid amount, and time remaining in the auction.
* Show the NFT image with a like button overlay and like count.

## File Structure

* **Location:** `components/BigNFTSilder.jsx`
* **Styles:** Imports `BigNFTSilder.module.css` for layout, spacing, and responsive design.
* **Dependencies:**

  * React hooks: `useState`, `useEffect`, `useCallback` for managing slider state.
  * `react-icons`: `AiFillFire`, `AiFillHeart`, `AiOutlineHeart`, `MdVerified`, `MdTimer`, `TbArrowBigLeftLines`, `TbArrowBigRightLine` for icons.
  * `next/image` for optimized image loading.
  * Internal `images` import for static asset references.
  * `Button` component for action buttons.

## State & Data

| State      | Type   | Description                                                        |
| ---------- | ------ | ------------------------------------------------------------------ |
| `idNumber` | number | Zero-based index of the currently displayed slide in `sliderData`. |

**Internal Data**: `sliderData` array defines each slide object with the following fields:

* `title` (string): NFT title.
* `id` (number): Unique slide identifier.
* `name` (string): Creator’s name.
* `collection` (string): Collection name.
* `price` (string): Current bid amount.
* `like` (number): Like count.
* `image` (string | StaticImageData): URL or import for creator avatar.
* `nftImage` (string | StaticImageData): URL or import for NFT image.
* `time` (object): Countdown timer segments `{ days, hours, minutes, seconds }`.

## Methods

* `inc`: Advances `idNumber` to the next slide if not at the end.
* `dec`: Decrements `idNumber` to the previous slide if not at the start.

Both use `useCallback` to optimize performance.

## Rendering Structure

```jsx
<div className={Style.bigNFTSlider}>
  <div className={Style.bigNFTSlider_box}>
    {/* Left panel: title, creator, collection, bidding, timer, buttons, nav arrows */}
    <div className={Style.bigNFTSlider_box_left}>…</div>
    {/* Right panel: NFT image with like overlay */}
    <div className={Style.bigNFTSlider_box_right}>…</div>
  </div>
</div>
```

* **Left Panel** includes:

  * NFT title (`<h2>`).
  * Creator info: avatar, label, name with `<MdVerified />` badge.
  * Collection info with `<AiFillFire />` icon.
  * Current bid section, including bid amount and static USD value.
  * Auction countdown using `<MdTimer />` icon and dynamic time segments.
  * Action buttons: “Place” and “View” via `Button` component.
  * Slider navigation arrows (`<TbArrowBigLeftLines />`, `<TbArrowBigRightLine />`).

* **Right Panel** includes:

  * NFT image (`<Image>`), styled to cover the box.
  * Like icon overlay (`<AiFillHeart />`) with like count.

## Usage Example

```jsx
import BigNFTSilder from './BigNFTSilder';

function HomePage() {
  return (
    <section>
      <BigNFTSilder />
    </section>
  );
}
```

---
