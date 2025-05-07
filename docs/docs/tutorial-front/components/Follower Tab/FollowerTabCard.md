---

sidebar\_label: 'FollowerTabCard.jsx'
title: 'FollowerTabCard.jsx'
---

# FollowerTabCard Component Documentation

## Overview

The `FollowerTabCard` component renders a single ranked NFT creator card used within the `FollowerTab` view. It displays the creator’s background image, profile avatar, rank, name with a verification badge, total volume in ETH, and a toggleable follow/unfollow button.

## Purpose

* Show a creator’s rank in a leaderboard-style list.
* Provide quick access to the creator’s profile via a clickable name.
* Display key stats (total ETH volume) alongside a verification badge.
* Allow users to follow or unfollow the creator with immediate UI feedback.

## Props

| Prop      | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| `index`   | number | Zero-based index indicating the creator’s rank in the list.        |
| `element` | object | Data object containing the creator’s details:                      |
|           |        | • `background` (string) – URL for the card background image.       |
|           |        | • `user` (string) – URL for the creator’s avatar image.            |
|           |        | • `seller` (string) – Creator’s address or identifier.             |
|           |        | • `total` (number) – Total ETH volume associated with the creator. |

## State

| State       | Type    | Description                                                 |
| ----------- | ------- | ----------------------------------------------------------- |
| `following` | boolean | `true` if the current user is following; toggles via click. |

## File Structure

* **Location:** `components/FollowerTabCard.jsx`
* **Styles:** CSS module `FollowerTabCard.module.css` for layout and theming.
* **Dependencies:**

  * `react` for component and `useState` hook.
  * `next/image` for optimized images.
  * `react-icons` for `MdVerified` and `TiTick` icons.
  * `next/link` for profile navigation.
  * Local `images` import for fallback images.

## Rendering Structure

1. **Wrapper** (`<div className={Style.FollowerTabCard}>`)
2. **Rank Section** (`.FollowerTabCard_rank`): shows `#{index+1}` and a medal emoji.
3. **Card Content** (`.FollowerTabCard_box`):

   * **Background Image** (`.FollowerTabCard_box_img`)
   * **Avatar** (`.FollowerTabCard_box_profile`)
   * **Info Section** (`.FollowerTabCard_box_info`):

     * **Name & Badge** (`.FollowerTabCard_box_info_name`): clickable `<h4>` with sliced seller address and `<MdVerified />`.
     * **Total Volume**: `<p>` showing `{element.total} ETH`.
     * **Follow Toggle** (`.FollowerTabCard_box_info_following`): `<a>` toggles between “Follow ✓” and “Following”.

## Usage Example

```jsx
import FollowerTabCard from './FollowerTabCard';

const creator = {
  background: '/img/bg1.jpg',  
  user: '/img/user1.jpg',      
  seller: '0xAbC123...XYZ',  
  total: 3.14                 
};

function Leaderboard() {
  return (
    <div>
      <FollowerTabCard index={0} element={creator} />
    </div>
  );
}
```

---
