import React, {useState, useEffect} from 'react'
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri'

import Style from './FollowerTab.module.css'
import FollowerTabCard from './FollowerTabCard/FollowerTabCard'
import images from '../../img'

const FollowerTab = () => {
    const CardArray = [
        { background: images.creatorbackground1, user: images.user1 },
        { background: images.creatorbackground2, user: images.user2 },
        { background: images.creatorbackground3, user: images.user3 },
        { background: images.creatorbackground4, user: images.user4 },
        { background: images.creatorbackground5, user: images.user5 },
        { background: images.creatorbackground6, user: images.user6 },
        { background: images.creatorbackground7, user: images.user7 },
        { background: images.creatorbackground8, user: images.user8 },
    ];
    const FollowingArray = [
        { background: images.creatorbackground4, user: images.user4 },
        { background: images.creatorbackground5, user: images.user5 },
        { background: images.creatorbackground6, user: images.user6 },
        { background: images.creatorbackground7, user: images.user7 },
        { background: images.creatorbackground8, user: images.user8 },
        { background: images.creatorbackground9, user: images.user9 },
    ];
    const NewsArray = [
        { background: images.creatorbackground6, user: images.user6 },
        { background: images.creatorbackground7, user: images.user7 },
        { background: images.creatorbackground8, user: images.user8 },
        { background: images.creatorbackground9, user: images.user9 },
        { background: images.creatorbackground10, user: images.user10 },
    ];

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