import React from 'react'
import Image from 'next/image'

import Style from './LikeProfile.module.css'
import images from '../../img'

const LikeProfile = () => {
    const imageArray = [images.user1, images.user2, images.user3, images.user4];
    return (
        <div className={Style.like}>
            {imageArray.map((element, index)=> (
                <div className={Style.like_box} key={index + 1}>
                    <Image src={imageArray[index]} width={15} height={15} className={Style.like_box_img}/>
                </div>
            ))}
        </div>
    )
}

export default LikeProfile