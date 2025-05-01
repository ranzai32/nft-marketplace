import React, {useState, useMemo, useCallback, useContext} from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import Style from '../styles/account.module.css'
import images from '../img'
import Form from '../accountPage/Form'

const account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async(acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  })

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          Update your profile settings and manage your account information.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}> 
          <input {...getInputProps()} />
          <Image src={images.user1} alt="account upload" width={150} height={150} className={Style.account_box_img_img}/>
          <p className={Style.account_box_img_para}>Change image</p>
        </div>
        <div className={Style.account_box_form}>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default account