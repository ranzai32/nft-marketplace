import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// --- Updated FeatureList ---
const FeatureList = [
    {
        title: 'Full NFT Lifecycle Management',
        // IMPORTANT: Replace this Svg with an icon relevant to NFT creation/management
        Image: require('@site/static/img/service-1.png').default,
        description: (
            <>
                Easily mint new NFTs, list them for sale, manage your existing assets,
                and resell tokens seamlessly within the marketplace.
            </>
        ),
    },
    {
        title: 'Interactive Marketplace & Bidding',
        // IMPORTANT: Replace this Svg with an icon relevant to trading/bidding
        Image: require('@site/static/img/service-2.png').default,
        description: (
            <>
                Discover and purchase unique NFTs. Engage in dynamic auctions by placing bids
                and tracking comprehensive bid histories for full transparency.
            </>
        ),
    },
    {
        title: 'Secure Web3 & IPFS Integration',
        // IMPORTANT: Replace this Svg with an icon relevant to security/decentralization/wallet
        Image: require('@site/static/img/service-3.png').default,
        description: (
            <>
                Connect your Ethereum wallet securely to interact with the marketplace.
                Your NFT metadata and assets are stored decentrally on IPFS.
            </>
        ),
    },
];

// --- Feature Component (remains the same) ---
function Feature({Image: imgSrc, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                {imgSrc && <img src={imgSrc} className={styles.featureSvg} alt={title} />}
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

// --- HomepageFeatures Component (remains the same, uses updated FeatureList) ---
export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}