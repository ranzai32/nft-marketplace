import React from 'react'
import Link from 'next/link'

import Style from './Discover.module.css'

const Discover = () => {

  //----Discover navigation menu
  const discover = [
    { 
      name: 'Collection', 
      link: 'collection' 
    },
    { 
      name: 'Search', 
      link: 'searchPage' 
    },
    { 
      name: 'Author Profile', 
      link: 'author' 
    },
    { 
      name: 'NFT Details',
      link: 'nft-details' 
    }, 
    { 
      name: 'Account Setting', 
      link: 'account' 
    },
    { 
      name: 'Connect Wallet', 
      link: 'connect-wallet' 
    },
    { 
      name: 'Blog', 
      link: 'blog' 
    }
  ]

  return (
    <div>
      {discover.map((element, index) => (
        <div key={index + 1} className={Style.discover}>
          <Link href={{pathname: `${element.link}`}} className={Style.discover_link}>{element.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Discover