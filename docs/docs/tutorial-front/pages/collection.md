---

sidebar_label: 'collection.js'
title: 'collection.js'
---

# Collection Page Documentation

## Overview

The `collection` component is a React functional component that renders the main NFT collection page. It composes multiple sub-components—banner, profile summary, NFT grid, filter controls, featured slider, and brand showcase—into a cohesive layout for browsing NFTs.

## Purpose

* **Display page-level layout:** Arrange sections in the order: Banner, Creator Profile, NFT Grid, Filter, Slider, Brand.
* **Showcase NFT items:** Pass an array of NFT data to `NFTCardTwo` for rendering a grid of NFTs with images, names, and prices.
* **Integrate filtering and navigation:** Include `Filter` controls for narrowing NFT results and `Slider` for featured highlights.

## File Structure

* **File:** `collection.js` (proposed page under `/CollectionPage` or `/pages` directory)
* **Stylesheet:** Imports module CSS from `../styles/collection.module.css` as `Style`.
* **Assets:** Imports image references from `../img`.
* **Sub-components:**

  * **`Banner`**, **`CollectionProfile`**, **`NFTCardTwo`** from `../CollectionPage/collectionindex`.
  * **`Filter`** from `../components/Filter/Filter`.
  * **`Slider`**, **`Brand`** from `../components/componentsindex`.

## Implementation Details

1. **Data Definition:**

   ```js
   const collectionArray = [
     { image: images.nft_image_1, name: "Cool NFT #1", price: "0.5 ETH" },
     // ... more items
   ];
   ```

   This array of objects drives the NFT grid display.

2. **JSX Structure:**

   ```jsx
   return (
     <div className={Style.collection}>
       <Banner bannerImage={images.creatorbackground1} />
       <CollectionProfile />
       <NFTCardTwo NFTData={collectionArray} />
       <Filter />
       <Slider />
       <Brand />
     </div>
   );
   ```

   * **`Style.collection`** applies page-level container styling.
   * Each sub-component handles its own rendering logic and props.

3. **Responsiveness & Styling:**

   * The CSS module `collection.module.css` defines grid, flex, and responsive rules to adapt across viewports.

## Usage Example

```jsx
// In your routing setup or pages directory
import collection from './Collection';

// Render via React Router or Next.js page
export default function CollectionPage() {
  return <collection />;
}
```

---
