import React from 'react'


import { Button, Category, Brand } from '../components/componentsindex';
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return( 
    <div>
        <NFTDetailsPage />
        <Category />
        <Brand />
    </div>
  );
};

export default NFTDetails;