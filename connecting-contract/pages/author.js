import React, { useState, useEffect } from 'react';

import Style from '../styles/author.module.css';
import { Banner} from '../CollectionPage/collectionindex';
import { Brand, Title } from '../components/componentsindex';
import images from '../img';
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '../AuthorPage/authorIndex';
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard';

const author = () => {
  const popularArray = [
    { background: images.creatorbackground1, user: images.user1 },
    { background: images.creatorbackground2, user: images.user2 },
    { background: images.creatorbackground3, user: images.user3 },
    { background: images.creatorbackground4, user: images.user4 },
    { background: images.creatorbackground5, user: images.user5 },
    { background: images.creatorbackground6, user: images.user6 },
    { background: images.creatorbackground7, user: images.user7 },
    { background: images.creatorbackground8, user: images.user8 },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground3} />
      <AuthorProfileCard />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />
      
      <AuthorNFTCardBox 
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
      />

      <Title heading="Popular Creators" paragraph="Click on NFT music or audio"/>

      <div className={Style.author_box}>
        {popularArray.map((element, index) => (
          <FollowerTabCard index={index} element={element}/>
        ))}
      </div>
      <Brand />
    </div>
  );
};

export default author;
