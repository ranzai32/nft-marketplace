import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Style from '../styles/connectWallet.module.css';
import images from '../img';

const connectWallet = () => {
    const [activeBtn, setActiveBtn] = useState(1);
    const providerArray = [
        {
            provider: images.provider1,
            name: "Metamask"
        },
        {
            provider: images.provider2,
            name: "WalletConnect"
        },
        {
            provider: images.provider3,
            name: "Formatic"
        },
    ]
    return (
        <div className={Style.connectWallet}>
            <div className={Style.connectWallet_box}>
                <h1>Connect your wallet</h1>
                <p className={Style.connectWallet_box_para}>
                    Connect with one of our awailable wallet providers
                </p>

                <div className={Style.connectWallet_box_provider}>
                    {providerArray.map((element, index) => (
                        <div 
                            className={`${Style.connectWallet_box_provider_item} ${activeBtn == index + 1 ? Style.active  : ""}`} 
                            key={index + 1}
                            onClick={() => setActiveBtn(index + 1)}
                        >
                            <Image src={element.provider} alt={element.name} width={50} height={50} className={Style.connectWallet_box_provider_item_img}/>
                            <p>{element.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default connectWallet