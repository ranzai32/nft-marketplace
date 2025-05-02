import React from 'react';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram, TiSocialTwitter } from 'react-icons/ti';
import { HiOutlineMail } from 'react-icons/hi';

import Style from '../styles/contactUs.module.css'
import formStyle from '../accountPage/Form.module.css'
import images from '../img';
import {Button} from '../components/componentsindex'

const contactUs = () => {
  return (
    <div className={Style.contactUs}>
        <div className={Style.contactUs_box}>
            <h1>Contact</h1>
            <div className={Style.contactUs_box_box}>
                <div className={Style.contactUs_box_left}>
                    <div className={Style.contactUs_box_left_item}>
                        <h3>ADDRESS</h3>
                        <p>
                            Photo booth tattobed prism, portland taiyaki
                            hoodie neutra typewriter
                        </p>
                    </div>
                    <div className={Style.contactUs_box_left_item}>
                        <h3>EMAIL</h3>
                        <p>
                            artify@example.com
                        </p>
                    </div>
                    <div className={Style.contactUs_box_left_item}>
                        <h3>PHONE</h3>
                        <p>
                            +77777654321
                        </p>
                    </div>
                    <div className={Style.contactUs_box_left_item}>
                        <h3>SOCIALS</h3>
                        <div className={Style.contactUs_box_left_item_social}>
                            <a href='#'>
                            <TiSocialFacebook />
                            </a>
                            <a href='#'>
                            <TiSocialInstagram />
                            </a>
                            <a href='#'>
                            <TiSocialLinkedin />
                            </a>
                            <a href='#'>
                            <TiSocialTwitter />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={Style.contactUs_box_right}>
                    <form>
                        <div className={formStyle.Form_box_input}>
                            <label htmlFor='name'>Fullname</label>
                            <input type='text' placeholder='Abraham Lincoln' className={formStyle.Form_box_input_username}></input>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor='email'>Email</label>
                            <div className={formStyle.Form_box_input_box}>
                                <div className={formStyle.Form_box_input_box_icon}>
                                    <HiOutlineMail/>
                                </div>
                                <input type='email' placeholder='example@gmail.com'></input>
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor='description'>Message</label>
                            <textarea 
                            placeholder='Tell us about your problem' 
                            cols='30'
                            rows='6'
                            ></textarea>
                        </div>

                        <Button btnName="Send Message" handleClick={() => {}} classStyle={Style.button}/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default contactUs