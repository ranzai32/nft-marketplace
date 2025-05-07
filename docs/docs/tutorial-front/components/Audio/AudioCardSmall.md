---

sidebar_label: 'AudioCardSmall.jsx'
title: 'AudioCardSmall.jsx'
---

# AudioCardSmall Component Documentation

## Overview

The `AudioCardSmall` component provides a compact audio NFT card suitable for list or sidebar displays. It shows a thumbnail image, basic metadata (title and price), a like indicator, and a play/pause button to toggle audio playback state.

## Purpose

* Render a minimal, reusable audio NFT preview card.
* Display essential information: artwork thumbnail, title, price, and like count.
* Allow users to toggle playback state with a single button.

## File Structure

* **Location:** `components/AudioCardSmall.jsx`
* **Styles:** Imports CSS module `AudioCardSmall.module.css` for layout and styling.
* **Dependencies:**

  * `react` for component logic and `useState` hook.
  * `next/image` for optimized image rendering.
  * Icons from `react-icons/tb`: `TbPlayerPlay`, `TbPlayerPause` for playback control.
  * `LikeProfile` sub-component for rendering a like button/profile indicator.
  * Local `images` import for thumbnail source.

## State

| State | Type    | Description                                  |
| ----- | ------- | -------------------------------------------- |
| play  | boolean | `true` if audio is playing; toggles on click |

## Props

This component currently does not accept external props; it uses static demo data. To adapt dynamically, replace hardcoded values with props such as:

```jsx
<AudioCardSmall
  title="NFT music #1111"
  thumbnail={images.creatorbackground1}
  price="1.00 ETH"
  onLikeToggle={...}
/>
```

## Rendering Structure

1. **Wrapper** (`<div className={Style.audioPlayer}>`) contains the entire card.
2. **Card Box** (`<div className={Style.audioPlayer_box}>`): flex container:

   * **Thumbnail** (`<Image ... className={Style.audioPlayer_box_img}/>`)
   * **Info Section** (`<div className={Style.audioPlayer_box_info}>`):

     * `<h4>`: NFT title
     * Info box: `<LikeProfile />` and price display (`<small>Price</small><p>1.00 ETH</p>`)
   * **Play Button** (`<div className={Style.audioPlayer_box_playBtn}>`): toggles between play and pause icons.

## Usage Example

```jsx
import AudioCardSmall from './AudioCardSmall';

function SidebarMusicList() {
  return (
    <div>
      <AudioCardSmall />
      <AudioCardSmall />
      {/* ... */}
    </div>
  );
}
```

---
