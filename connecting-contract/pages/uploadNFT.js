import React, { useEffect, useState, useContext } from 'react'

import Style from '../styles/uploadNFT.module.css'
import {UploadNFT} from '../UploadNFT/uploadNFTindex'

import  { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'

const uploadNFT = () => {
    const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>You can set preferred display name, create your profile URL and manage other personal settings.</p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Image, Video, Audio, or 3D model.</h2>
                    <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF, Max size: 100 MB</p>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT}/>
                </div>
            </div>
        </div>
    )
}

export default uploadNFT;