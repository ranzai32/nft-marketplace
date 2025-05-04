import React from 'react';
import { TiTick } from 'react-icons/ti';

import Style from './Subscription.module.css';
import { Button } from '../components/componentsindex'

const Subscription = ({element, index}) => {
  return (
    <div className={Style.SubscriptionBox}>
        <div className={Style.SubscriptionBox_box}>
            <span className={Style.SubscriptionBox_box_span}>{element.plan}</span>
            <small className={Style.SubscriptionBox_box_small}>{element.popular || ""}</small>
            <p className={Style.SubscriptionBox_box_price}>{element.price}</p>

            <div className={Style.SubscriptionBox_box_info}>
                {element.service.map((el, i) => (
                    <p className={Style.SubscriptionBox_box_info_para} key={i + 1}>
                        <span><TiTick/></span>
                        {el}
                    </p>
                ))}
            </div>
            <Button btnName="Submit" handleClick={() => {}} classStyle={Style.button}/>
        </div>
    </div>
  )
}

export default Subscription;