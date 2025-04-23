import React, {useState, useEffect} from 'react'
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri'

import Style from './FollowerTab.module.css'
import FollowerTabCard from './FollowerTabCard/FollowerTabCard'

const FollowerTab = () => {
    const CardArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const FollowingArray = [1, 2, 3, 4, 5, 6];    
    const NewsArray = [1, 2, 3, 4, 5];

    const [popular, setPopular] = useState(true);
    const [following, setFollowing] = useState(false);
    const [news, setNews] = useState(false);

    const openPopular = ()=>{
        if(!popular){
            setPopular(true);
            setFollowing(false);
            setNews(false);
        }
    }
    const openFollower = ()=>{
        if(!following){
            setPopular(false);
            setFollowing(true);
            setNews(false);
        }
    }
    const openNews = ()=>{
        if(!popular){
            setPopular(false);
            setFollowing(false);
            setNews(true);
        }
    }
    return (
        <div className={Style.followerTab}>
            <div className={Style.followerTab_title}>
                <h2>Top Creators List</h2>
                <div className={Style.followerTab_tabs}>
                    <div className={Style.followerTab_tabs_btn}>
                        <button onClick={() => openPopular()}>
                            <RiUserFollowFill /> Popular
                        </button>
                        <button onClick={() => openFollower()}>
                            <RiUserUnfollowFill /> Following
                        </button>
                        <button onClick={() => openNews()}>
                            <RiAwardLine /> News
                        </button>
                    </div>
                </div>
            </div>

            {popular && (
                <div className={Style.followerTab_box}>
                    {CardArray.map((element, index) => (
                        <FollowerTabCard key={index + 1} index={index} element={element}/>
                    ))}
                </div>
            )}
            {following && (
                <div className={Style.followerTab_box}>
                    {FollowingArray.map((element, index) => (
                        <FollowerTabCard key={index + 1} index={index} element={element}/>
                    ))}
                </div>
            )}
            {news && (
                <div className={Style.followerTab_box}>
                    {NewsArray.map((element, index) => (
                        <FollowerTabCard key={index + 1} index={index} element={element}/>
                    ))}
                </div>
            )}

            <div className={Style.followerTab_member}>
                <div className={Style.followerTab_member_box}>
                    <a href='#'>Show me more</a>
                    <a href='#'>Become Author</a>
                </div>
            </div>
        </div>
    )
}

export default FollowerTab