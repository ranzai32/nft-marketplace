import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

import Style from './DropZone.module.css';
import images from '../../img';

const DropZone = ({ title, heading, subHeading, name,
        website, description, royalties, fileSize,
        category, properties, setImage, uploadToIPFS }) => {
  const [fileUrl, setFileUrl] = useState(false);
  
  const onDrop = useCallback(async (acceptedFile) => {
    try {
      const url = await uploadToIPFS(acceptedFile[0]);
      console.log("Uploaded file URL:", url); 
      setFileUrl(url);
      setImage(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, [setImage, uploadToIPFS]);
  
  
  
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxSize: 5000000,
  });
  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()}/>
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image src={images.upload} alt='upload' width={100} height={100} className={Style.DropZone_box_input_img_img}/>
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={fileUrl} alt='nft image' width={250} height={250} objectFit='contain'/>

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p><samp>NFT name:</samp> {name || ""}</p>
                <p><samp>Website:</samp> {website || ""}</p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p><span>Description:</span> {description || ""}</p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p><span>Royalties:</span> {royalties || ""}</p>
                <p><span>File size:</span> {fileSize || ""}</p>
                <p><span>Properties:</span> {properties || ""}</p>
                <p><span>Category:</span> {category || ""}</p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default DropZone