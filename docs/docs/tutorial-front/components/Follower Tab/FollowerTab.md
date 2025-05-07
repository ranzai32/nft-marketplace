---

sidebar\_label: 'FollowerTab.jsx'
title: 'FollowerTab.jsx'
---

# FollowerTab Component Documentation

## Overview

The `FollowerTab` component renders a tabbed interface for browsing NFT creators across three categories: **Popular**, **Following**, and **News**. It maintains internal state to toggle between these views and uses the `FollowerTabCard` sub-component to display each creator’s card.

## Purpose

* Provide a navigable list of top NFT creators in different contexts.
* Allow users to switch between Popular creators, those they are Following, and News-worthy creators.
* Present calls to action for exploring more creators or becoming an author.

## File Structure

* **Location:** `components/FollowerTab.jsx`
* **Imports:**

  * `React`, `useState`, `useEffect` from `react`.
  * Icons from `react-icons/ri`: `RiUserFollowFill`, `RiUserUnfollowFill`, `RiAwardLine`.
  * CSS module: `FollowerTab.module.css`.
  * Sub-component: `FollowerTabCard` from `./FollowerTabCard/FollowerTabCard`.
  * Image assets from `../../img`.

## State Variables

| State       | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| `popular`   | boolean | Active when the **Popular** tab is selected (default: true). |
| `following` | boolean | Active when the **Following** tab is selected.               |
| `news`      | boolean | Active when the **News** tab is selected.                    |

## Internal Data Arrays

* **FollowingArray**: Static list of creator objects for the Following tab.
* **NewsArray**: Static list of creator objects for the News tab.
* **`creators` prop**: Passed array of popular creators for the Popular tab.

## Rendering Logic

1. **Header and Tabs**

   * Displays a heading: *"Top Creators List"*.
   * Renders three buttons with icons:

     * `RiUserFollowFill` + *Popular*
     * `RiUserUnfollowFill` + *Following*
     * `RiAwardLine` + *News*
   * Clicking a button sets its state to `true` and others to `false`.

2. **Conditional Content**

   * If `popular` is `true`, map over the `creators` prop and render a `FollowerTabCard` for each element.
   * If `following` is `true`, use `FollowingArray`.
   * If `news` is `true`, use `NewsArray`.

3. **Footer Actions**

   * Renders two links:

     * *Show me more* (e.g., to load additional creators).
     * *Become Author* (e.g., to register as a creator).

## Usage Example

```jsx
import FollowerTab from './FollowerTab';

const creatorsData = [
  { background: '/img/creator1.jpg', user: '/img/user1.jpg' },
  // ... more creator objects
];

function App() {
  return <FollowerTab creators={creatorsData} />;
}
```

---
