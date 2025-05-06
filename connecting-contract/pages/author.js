import React, { useState, useEffect, useContext } from 'react';

import Style from '../styles/author.module.css';
import { Banner} from '../CollectionPage/collectionindex';
import { Brand, Title } from '../components/componentsindex';
import images from '../img';
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '../AuthorPage/authorIndex';
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard';

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const author = () => {
  const popularArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "7d64gf748849j47fy488444",
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const {fetchMyNFTsOrListedNFTs, fetchNFTs, currentAccount} = useContext(NFTMarketplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const items = await fetchNFTs();
      console.log("Fetched NFTs:", items);
      setNfts(items);
    };
    loadNFTs();
  }, []);
  
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      console.log("Fetched My NFTs:", items);
      setMyNFTs(items);
    });
  }, []);
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground3} />
      <AuthorProfileCard currentAccount={currentAccount}/>
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
        nfts={nfts}
        myNFTs={myNFTs}
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
