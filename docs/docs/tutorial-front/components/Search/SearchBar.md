---

sidebar\_label: 'SearchBar.jsx'
title: 'SearchBar.jsx'
---

# SearchBar Component Documentation

## Overview

The `SearchBar` component provides a responsive text input for searching items. It displays a search icon, captures user input, and invokes callback functions to filter results or clear the search when the input is emptied.

## Purpose

* **Capture user queries:** Listens to input changes and stores the current search term in component state.
* **Trigger search actions:** Calls `onHandleSearch` when the input is non-empty, passing the current value.
* **Clear search state:** Calls `onClearSearch` when the input is cleared.
* **Visual cues:** Renders search and arrow icons to indicate interaction affordances.

## File Structure

The component is located at `SearchBar/SearchBar.jsx` and uses modular CSS and React Icons:

```javascript title="SearchBar/SearchBar.jsx"
import React, { useState } from 'react';
import Style from '../SearchBar/SearchBar.module.css';
import { BsSearch, BsArrowRight } from 'react-icons/bs';

const SearchBar = ({ onHandleSearch, onClearSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      onClearSearch();
    } else {
      onHandleSearch(value);
    }
  };

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Type your keyword..."
          onChange={handleChange}
          value={search}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
```

## Props

| Prop             | Type     | Description                                        |
| ---------------- | -------- | -------------------------------------------------- |
| `onHandleSearch` | Function | Callback invoked with the current non-empty value. |
| `onClearSearch`  | Function | Callback invoked when the input is cleared.        |

## Styling

Styles are imported from `SearchBar/SearchBar.module.css`. Key classes:

* `.SearchBar` — wrapper for the component.
* `.SearchBar_box` — container for input and icons.
* `.SearchBar_box_icon` — styles for both the search and arrow icons.

## Usage Example

```jsx
import SearchBar from './SearchBar';

function App() {
  const handleSearch = term => { /* filter list by `term` */ };
  const clearSearch = () => { /* reset filters */ };

  return (
    <SearchBar
      onHandleSearch={handleSearch}
      onClearSearch={clearSearch}
    />
  );
}
```
