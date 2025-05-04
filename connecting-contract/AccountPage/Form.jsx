import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineHttp, MdOutlineContentCopy } from 'react-icons/md'
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti'

import Style from './Form.module.css'
import {Button} from '../components/componentsindex'

const Form = () => {
  
  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor='name'>Username</label>
            <input type='text' placeholder='Abraham Lincoln' className={Style.Form_box_input_username}></input>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor='email'>Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail/>
              </div>
              <input type='email' placeholder='example@gmail.com'></input>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor='description'>Description</label>
            <textarea 
              placeholder='Tell us about yourself' 
              cols='30'
              rows='6'
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor='website'>Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input type='text' placeholder='https://example.com'></input>
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor='facebook'>Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook/>
                </div>
                <input type='text' placeholder='https://facebook.com/username'></input>
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor='twitter'>Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter/>
                </div>
                <input type='text' placeholder='https://twitter.com/username'></input>
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor='Instagram'>Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram/>
                </div>
                <input type='text' placeholder='https://instagram.com/username'></input>
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor='wallet'>Wallet Address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input type='text' placeholder='0x1234567890abcdef1234567890abcdef12345678'></input>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy/>
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button btnName="Upload profile" handleClick={() => {}} className={Style.button}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form