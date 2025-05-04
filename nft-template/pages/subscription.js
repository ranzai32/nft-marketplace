import React from 'react';

import Style from '../styles/subscription.module.css';
import Subscription from '../SubscriptionPage/Subscription';

const subscription = () => {
    const subscriptionArray =[
        {
            plan: "STARTER",
            price: "$5/mo",
            popular: "",
            service: ["Automated Reporting", "Faster Processing", "Customizations"], 
            info: "Literally you probably haven't heard of them jean shorts."
        },
        {
            plan: "BASIC",
            price: "$15/mo",
            popular:"POPULAR",
            service: ["Everything in Starter", "100 Builds", "Progress Reports", "Premium Support"],
            info: "Literally you probably haven't heard of them jean shorts."
        },
        {
            plan: "PLUS",
            price: "$25/mo",
            popular: "",
            service:["Everything in Basic","Unlimited Builds","Advanced Analytics","Company Evaluations"],
            info: "Literally you probably haven't heard of them jean shorts."
        }
    ];
    return (
        <div className={Style.subscription}>
            <div className={Style.subscription_box}>
                <div className={Style.subscription_box_info}>
                    <h1>Subscription</h1>
                    <p>Pricinf to fit the needs of any company size</p>
                </div>

                <div className={Style.subscription_box_box}>
                    {subscriptionArray.map((element, index) => (
                        <Subscription key={index + 1} element={element} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default subscription