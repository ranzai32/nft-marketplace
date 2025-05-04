import React from 'react'
import Link from 'next/link'

import Style from './HelpCenter.module.css'

const HelpCenter = () => {
  const helpCenter = [
    {
      name: 'About',
      link: 'aboutUs',
    },
    {
      name: 'Contact Us',
      link: 'contactUs',
    },
    {
      name: 'Sign Up',
      link: 'sign-up',
    },
    {
      name: 'Sign In',
      link: 'sign-in',
    },
    {
      name: 'Subscription',
      link: 'subscription',
    }
  ]

  return (
    <div className={Style.box}>
      {
        helpCenter.map((element, index) => (
          <div className={Style.helpCenter} key={index + 1}>
            <Link href={{pathname: `${element.link}`}}>
              {element.name}
            </Link>
          </div>
      ))}
    </div>
  )
}

export default HelpCenter