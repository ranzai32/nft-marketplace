---
sidebar_label: 'AudioCard.jsx'
title: 'AudioCard.jsx'
---

# AudioCard Component Documentation

## Overview

The `AudioCard` component displays an interactive NFT music card, combining visual and audio controls with metadata and like functionality. It showcases a waveform preview, play/pause toggle, like button, countdown timer, price information, stock availability, and background artwork.

## Purpose

* Present an audio-based NFT with playback controls.
* Allow users to like/unlike via a heart icon.
* Show remaining time/countdown for the drop or auction.
* Display price and stock details.
* Render the NFT’s background artwork prominently.

## File Structure

* **Location:** `AudioCard.jsx`
* **Styles:** CSS module `AudioCard.module.css` for layout and theming.
* **Dependencies:**

  * `react`, `useState`, `useEffect` for state and lifecycle.
  * `next/image` for optimized image rendering.
  * `react-icons/ai` (`AiFillHeart`, `AiOutlineHeart`) for like icons.
  * `react-icons/tb` (`TbPlayerPlay`, `TbPlayerPause`) for playback icons.
  * Local `images` import for waveform and background assets.
  * `LikeProfile` sub-component for displaying profile likes or avatars.

## State

| State  | Type    | Description                                      |
| ------ | ------- | ------------------------------------------------ |
| `like` | boolean | Tracks whether the NFT is liked (true) or not.   |
| `play` | boolean | Tracks playback state: playing (true) or paused. |

## Rendering Logic

1. **Like & Timer Section**

   * **Like Button:** Toggles between `AiOutlineHeart` and `AiFillHeart` icons. Clicking triggers `likeNft()`.
   * **Like Count:** Static count of 24 (could be made dynamic).
   * **Remaining Timer:** Displays a hardcoded countdown (`3h : 20m : 20s`).

2. **Audio Player Section**

   * **Waveform Preview:** Renders `images.musiceWave` via `next/image`.
   * **Play/Pause Toggle:** Clicking toggles `playMusic()`, swapping between `TbPlayerPlay` and `TbPlayerPause` icons.

3. **Details Section**

   * **Title:** `<h4>NFT music #5123</h4>` (static placeholder).
   * **Price Display:** Shows “Price” label and amount (`$3,222.33`).
   * **Stock Info:** Uses `LikeProfile` and displays “24 in stock”.

4. **Artwork Section**

   * Renders the main background image (`images.creatorbackground10`) at specified dimensions.

## Usage Example

```jsx
import AudioCard from './AudioCard';

function MusicGallery() {
  return (
    <div>
      <AudioCard />
    </div>
  );
}
```

---
