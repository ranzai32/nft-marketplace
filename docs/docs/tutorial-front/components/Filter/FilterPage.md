---
sidebar\_label: 'Filter.jsx'
title: 'Filter.jsx'
---

# Filter Component Documentation

## Overview

The `Filter` component provides a user interface for filtering NFTs by category, price range, and media type. It includes a set of category buttons and a collapsible filter panel with toggles for image, video, and music filters, as well as additional options like verified creators.

## Purpose

* Allow users to quickly narrow down visible NFTs by selecting predefined categories (e.g., NFTs, Arts, Musics, Sports, Photography).
* Provide a collapsible filter menu for further refinement:

  * Price range display with removable tag
  * Media-type toggles (Images, Videos, Musics)
  * Verified creators filter

## File Structure

* **Location:** `components/Filter.jsx`
* **Style:** Imports CSS module `Filter.module.css` for layout, spacing, and responsive behavior.
* **Dependencies:**

  * `react` for component logic and state management.
  * Icon libraries from `react-icons`:

    * `FaFilter`, `FaAngleDown`, `FaAngleUp`, `FaWallet`, `FaMusic`, `FaVideo`, `FaImage`, `FaUsers`, `FaUserAlt`
    * `AiFillCloseCircle` from `react-icons/ai`
    * `MdVerified` from `react-icons/md`
    * `TiTick` from `react-icons/ti`

## State Variables

| State    | Type    | Description                                                            |
| -------- | ------- | ---------------------------------------------------------------------- |
| `filter` | boolean | Controls visibility of the filter panel (true = closed, false = open). |
| `image`  | boolean | Toggles the Images filter tag (true = hidden, false = active).         |
| `video`  | boolean | Toggles the Videos filter tag (true = hidden, false = active).         |
| `music`  | boolean | Toggles the Musics filter tag (true = hidden, false = active).         |

## Rendering Logic

1. **Category Buttons (always visible)**

   * Renders a row of `<button>` elements for each category: NFTs, Arts, Musics, Sports, Photography.
   * Currently placeholder callbacks (`onClick={() => {}}`).

2. **Filter Toggle Button**

   * Displays a filter icon (`FaFilter`) and label “Filter”.
   * Icon toggles between `FaAngleDown` and `FaAngleUp` based on `filter` state.
   * Clicking it calls `openFilter()` to show/hide the filter panel.

3. **Filter Panel (conditionally rendered)**
   When `filter` is `true`, renders additional filtering options:

   * **Price Tag:** Shows a removable price range tag with `FaWallet` icon and `AiFillCloseCircle` to clear.
   * **Media-Type Toggles:** Each row shows an icon (`FaImage`, `FaVideo`, `FaMusic`), label, and either close (`AiFillCloseCircle`) or check (`TiTick`) icon based on state. Clicking toggles the state.
   * **Verified Filter:** Static row with `FaUserAlt` and `MdVerified` icon (no toggle state).

## Usage Example

```jsx
import Filter from './Filter';

function NFTGallery() {
  return (
    <div>
      <Filter />
      {/* NFT grid or list goes here */}
    </div>
  );
}
```

---
