import React, {useState} from 'react';
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
import { FaPercent } from 'react-icons/fa';
import { AiTwotonePropertySafety } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Style from './UploadNFT.module.css';
import formStyle from '../accountPage/Form.module.css';
import images from '../img';
import {Button} from '../components/componentsindex';
import { DropZone } from './uploadNFTindex';

const UploadNFT = ({uploadToIPFS, createNFT}) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter();

  const categoryArray = [
    {
      image: images.nft_image_1,
      category: "Sports",
    },
    {
      image: images.nft_image_2,
      category: "Arts",
    },
    {
      image: images.nft_image_3,
      category: "Music",
    },
    {
      image: images.nft_image_1,
      category: "Digital",
    },
    {
      image: images.nft_image_2,
      category: "Time",
    },
    {
      image: images.nft_image_3,
      category: "Photography",
    }
  ];

  return (
    <div className={Style.upload}>
      <DropZone 
        title="JPG, PNG, WEBM, MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor='nft'>Item Name</label>
          <input 
            type='text' 
            placeholder='Abraham Lincoln' 
            className={formStyle.Form_box_input_username}
            onChange={(e) =>  setName(e.target.value)}
          ></input>
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor='price'>Price</label>
            <input 
              type='text' 
              placeholder='100' 
              className={formStyle.Form_box_input_username}
              onChange={(e) =>  setPrice(e.target.value)}
            ></input>
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor='website'>Website</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input 
                type='text' 
                placeholder='https://example.com'
                onChange={(e) =>  setWebsite(e.target.value)}
              ></input>
            </div>

            <p className={formStyle.Form_box_input_para}>
              Artify will include a link to this URL on this item's detail page, 
              so that users can click to learn more about it. You are welcome to 
              link to your own webpage with more details.
            </p>
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor='description'>Description</label>
            <textarea 
              placeholder='Tell us about yourself' 
              cols='30'
              rows='6'
              onChange={(e) => {setDescription(e.target.value)}}
            ></textarea>

            <p>
              The description will be included on the item's detail page underneath its image. 
              Markdown syntax is supported.
            </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor='name'>Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an existing collection or create a new one
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((element, index) => (
              <div 
                className={`${Style.upload_box_slider} ${active == index + 1 ? Style.active : ""}`}
                key={index + 1}
                onClick={() => {
                  setActive(index + 1);
                  setCategory(element.category);
                }}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image src={element.image}
                      alt='backgroung image'
                      width={70} height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>

                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick/>
                  </div>
                </div>

                <p>Crypto Legend - {element.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
            <div className={formStyle.Form_box_input}>
              <label htmlFor='royalties'>Royalties</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <FaPercent/>
                </div>
                <input type='text' placeholder='20%' onClick={(e) => {setRoyalties(e.target.value)}}></input>
              </div>
            </div>
            <div className={formStyle.Form_box_input}>
              <label htmlFor='size'>Size</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <MdOutlineAttachFile/>
                </div>
                <input type='text' placeholder='160MB' onClick={(e) => {setFileSize(e.target.value)}}></input>
              </div>
            </div>
            <div className={formStyle.Form_box_input}>
              <label htmlFor='properties'>Properties</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <AiTwotonePropertySafety/>
                </div>
                <input type='text' placeholder='Properties' onClick={(e) => {setProperties(e.target.value)}}></input>
              </div>
            </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button 
            btnName="Upload" 
            handleClick={async() => createNFT(name, price, image, description, router, website, royalties, fileSize, category, properties)} 
            className={Style.upload_box_btn_style}
          />
          <Button btnName="Review" handleClick={() => {}} className={Style.upload_box_btn_style}/>
        </div>
      </div>
    </div>
  )
}

export default UploadNFT;