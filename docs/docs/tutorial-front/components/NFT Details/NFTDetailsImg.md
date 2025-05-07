---

sidebar\_label: 'NFTDetailsImg.jsx'
title: 'NFTDetailsImg.jsx'
---

# NFTDetailsImg Component Documentation

## Overview

The `NFTDetailsImg` component is responsible for rendering the visual representation of a single NFT, including its main image, like functionality, and expandable sections for description and technical details. It leverages React state hooks for UI interactions and `next/image` for optimized image delivery.

## Purpose

* Display the NFT image at a fixed resolution with responsive cropping.
* Provide a like button to toggle user interest.
* Offer expandable sections:

  * **Description**: shows or hides the textual description of the NFT.
  * **Details**: shows or hides technical metadata such as image dimensions, file size, contract address, and token ID.

## File Location

Typically located at:

```
connecting-contract/NFTDetailsPage/NFTDetailsImg.jsx
```

## Imports

```javascript
import React, { useState } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import Style from './NFTDetailsImg.module.css';
```

## Props

| Name  | Type   | Description                               |                       |
| ----- | ------ | ----------------------------------------- | --------------------- |
| `nft` | Object | NFT data object containing at least:      |                       |
|       |        | • `image` (string): URL of the NFT image  |                       |
|       |        | • `description` (string): NFT description |                       |
|       |        | • `seller` (string): contract address     |                       |
|       |        | • `tokenId` (number                       | string): NFT token ID |

## State

The component uses three boolean state variables via `useState`:

* `description` – whether the description panel is open.
* `details` – whether the details panel is open.
* `like` – whether the NFT is liked.

## UI Behavior

1. **Like Button**

   * Renders a heart icon (`AiOutlineHeart` or `AiFillHeart`) and a static count badge.
   * Clicking toggles the `like` state.

2. **Image Display**

   * Uses Next.js `Image` for optimized loading and fixed dimensions (640×640).
   * Displays a placeholder icon (`BsImages`) and overlay like control.

3. **Expandable Sections**

   * **Description** header toggles the description text.
   * **Details** header toggles a box showing:

     * Image size (`2000×2000 px`, file size).
     * Contract address (`seller`).
     * Token ID.
   * Arrow icons (`TiArrowSortedUp` / `TiArrowSortedDown`) indicate open/closed state.

## Styling

Styles are applied via CSS modules imported from `NFTDetailsImg.module.css`. Key classes:

* `.NFTDetailsImg` – root wrapper.
* `.NFTDetailsImg_box` – main container.
* `.NFTDetailsImg_box_NFT` – sub-container for image and like.
* `.NFTDetailsImg_box_description` / `._details` – headers for toggles.
* `.NFTDetailsImg_box_description_box` / `. _details_box` – content panels.

## Usage Example

```jsx
<NFTDetailsImg
  nft={{
    image: '/images/0.png',
    description: 'A unique digital asset...',
    seller: '0x123...abc',
    tokenId: 42,
  }}
/>
```

This renders the NFT image with interactive like, description, and details panels.
