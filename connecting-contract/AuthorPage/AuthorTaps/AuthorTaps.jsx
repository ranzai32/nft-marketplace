import React, {useState} from 'react'; 
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

import Style from './AuthorTaps.module.css'; 

const AuthorTaps = ({ setCollectiables, setCreated, setLike, setFollower, setFollowing }) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Created By Admin",
    "Most Appriciated",
    "Most Discussed",
    "Most View"
  ];

  const openDropDownList = () => {
    setOpenList(!openList);
  }

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if(btnText == "Listed NFTs") {
      setCollectiables(true);
      setCreated(false);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(1);
    } else if(btnText == "Own NFTs") {
      setCollectiables(false);
      setCreated(true);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(2);
    } else if(btnText == "Like") {
      setCollectiables(false);
      setCreated(false);
      setLike(true);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(3);
    } else if(btnText == "Following") {
      setCollectiables(false);
      setCreated(false);
      setLike(false);
      setFollower(false);
      setFollowing(true);
      setActiveBtn(4);
    } else if(btnText == "Followers") {
      setCollectiables(false);
      setCreated(false);
      setLike(false);
      setFollower(true);
      setFollowing(false);
      setActiveBtn(5);
    }

  }
  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Listed NFTs</button>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Own NFTs</button>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Like</button>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Following</button>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Followers</button>
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <div className={Style.AuthorTaps_box_right_para} onClick={() => openDropDownList()}>
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((element, index) => (
                <div key={index + 1} onClick={() => setSelectedMenu(element)} className={Style.AuthorTaps_box_right_list_item}>
                  <p>{element}</p>
                  <span>{selectedMenu == element && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;