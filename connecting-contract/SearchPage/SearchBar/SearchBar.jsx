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
