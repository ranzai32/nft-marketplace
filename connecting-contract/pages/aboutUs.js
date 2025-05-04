import React from 'react';
import Image from 'next/image';

import Style from '../styles/aboutUs.module.css';
import {Brand} from '../components/componentsindex';
import images from '../img';

const aboutUs = () => {
    const founderArray = [
        {
            name: "Alikhan Makymov",
            position: "CEO and co-founder",
            image: images.founder1
        },
        {
            name: "Maxim Sarsekeyev",
            position: "CEO and co-founder",
            image: images.founder2
        },
        {
            name: "Alinur Anatolyev",
            position: "CEO and co-founder",
            image: images.founder1
        },
    ];
    const factsArray = [
        {
            title: "10 million",
            info: " Articles have been public around the world (as of May 8, 2025)"
        },
        {
            title: "100,000",
            info: "Registered users account (as of May 8, 2025)"
        },
        {
            title: "220+",
            info: " Countries and presence (as of May 8, 2025)"
        },
    ];
    return (
        <div className={Style.aboutUs}>
            <div className={Style.aboutUs_box}>
                <div className={Style.aboutUs_box_hero}>
                    <div className={Style.aboutUs_box_hero_left}>
                        <h1>About us</h1>
                        <p>
                            We're impartial and independent, and every day we create distinctive, 
                            world-class NFTs and content which inform, educate and entertain 
                            millions of people in the around the world.
                        </p>
                    </div>

                    <div className={Style.aboutUs_box_hero_right}>
                        <Image src={images.hero} width={600}/>
                    </div>
                </div>

                <div className={Style.aboutUs_box_title}>
                    <h2>Founders</h2>
                    <p>
                        We're impartial and independent, and every day we create distinctive, 
                        world-class NFTs.
                    </p>
                </div>

                <div className={Style.aboutUs_box_founder}>
                    <div className={Style.aboutUs_box_founder_box}>
                        {founderArray.map((element, index) => (
                            <div className={Style.aboutUs_box_founder_box_img}>
                                <Image src={element.image} alt={element.name} width={350} height={350} className={Style.aboutUs_box_founder_box_img_img}/>
                                <h3>{element.name}</h3>
                                <p>{element.position}</p>
                            </div>
                        ))};
                    </div>
                </div>

                <div className={Style.aboutUs_box_title}>
                    <h2>Fast Facts</h2>
                    <p>
                        We're impartial and independent, and every day we create distinctive, 
                        world-class NFTs.
                    </p>
                </div>

                <div className={Style.aboutUs_box_facts}>
                    <div className={Style.aboutUs_box_facts_box}>
                        {factsArray.map((element, index) => (
                            <div className={Style.aboutUs_box_facts_box_info}>
                                <h3>{element.title}</h3>
                                <p>{element.info}</p>
                            </div>
                        ))};
                    </div>
                </div>

                <Brand />
            </div>
        </div>
    )
}

export default aboutUs;