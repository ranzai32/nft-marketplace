import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form.module.css";
import { Button } from "../components/componentsindex";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    try {
      const { data } = await axios.get(tokenURI);
      console.log("NFT Metadata:", data);
      setImage(data.image);
    } catch (error) {
      console.error("Failed to fetch NFT metadata", error);
    }
  };
  

  useEffect(() => {
    if (tokenURI) {
      fetchNFT();
    }
  }, [tokenURI]);
  

  const resell = async () => {
    try {
      await createSale(tokenURI, price, true, tokenId);
      router.push("/author");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="reSell price"
            className={formStyle.Form_box_input_username}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={() => resell()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;