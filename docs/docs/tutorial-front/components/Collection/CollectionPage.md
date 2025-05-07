---
sidebar_label: 'Collection.jsx'
title: 'Collection.jsx'
---

# Collection Component Documentation

## Overview

The `Collection` component displays a list of top NFT creators over selectable timeframes (24 hours, 7 days, 30 days). It uses state to toggle between different dataset arrays and renders a responsive card grid using the `DaysComponents` sub-component.

## Purpose

* Provide an interactive header with timeframe filters (icons and buttons) for user selection.
* Maintain internal state (`popular`, `following`, `news`) to control which data set is visible.
* Render a grid of creator cards by mapping over the appropriate array (`CardArray`, `FollowingArray`, or `NewsArray`).

## File Structure

* **Location:** `Collection/Collection.jsx` (or similar path)
* **Style:** Imports CSS module `Collection.module.css` for styling.
* **Dependencies:**

  * React hooks: `useState`, `useEffect` (though `useEffect` is imported but not currently used)
  * Icons from `react-icons/bs`: `BsFillAlarmFill`, `BsCalendar3`, `BsFillCalendarDateFill`
  * `DaysComponents` sub-component for rendering individual creator cards
  * `images` object for background and user avatar assets

## State and Data Arrays

* **States:**

  * `popular` (boolean) — shows 24-hour top creators
  * `following` (boolean) — shows 7-day top creators
  * `news` (boolean) — shows 30-day top creators

* **Data Arrays:**

  * `CardArray` — 8 items for the 24-hour view
  * `FollowingArray` — 6 items for the 7-day view
  * `NewsArray` — 5 items for the 30-day view

## Methods

* `openPopular()` — activates `popular` state, deactivates others
* `openFollower()` — activates `following` state, deactivates others
* `openNews()` — activates `news` state, deactivates others

Each method ensures only one timeframe is active at a time.

## Rendering Logic

1. **Header Section:**

   * Title: “Top List Creators”
   * Button group with icons for timeframes
2. **Conditional Grids:**

   * Renders `<DaysComponents>` instances for the active dataset
   * Each item passes `element` and `index` props to the sub-component

## Usage Example

```jsx
import Collection from './Collection';

function HomePage() {
  return (
    <section>
      <Collection />
    </section>
  );
}
```

No props are required for this component; it manages its own data and state internally.
