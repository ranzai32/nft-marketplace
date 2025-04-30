import React from 'react'; 

import Style from './AuthorTaps.module.css'; 

const AuthorTaps = ({ collectiables, created, like, follower, following }) => {
  return (
    <div className={Style.AuthorTaps}>
      <p>AuthorTaps Component Placeholder</p>
    </div>
  );
};

export default AuthorTaps;