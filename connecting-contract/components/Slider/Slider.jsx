import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'

import Style from './Slider.module.css'
import SliderCard from './SliderCard/SliderCard'
import images from '../../img'

const Slider = () => {
  const sliderArray = [
    { background: images.creatorbackground1, user: images.user1 },
    { background: images.creatorbackground2, user: images.user2 },
    { background: images.creatorbackground3, user: images.user3 },
    { background: images.creatorbackground4, user: images.user4 },
    { background: images.creatorbackground5, user: images.user5 },
    { background: images.creatorbackground6, user: images.user6 }
  ];

  const [width, setWidth] = useState(0);
  const dragSlider = useRef();

  useEffect(() => {
    if (dragSlider.current) {
      setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
    }
  }, []); // 👈 добавил [] чтобы вызывался только при монтировании

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <h2>Explore NFT video</h2>
        <div className={Style.slider_box_button}>
          <p>Click on play icon & enjoy NFTs video</p>
          <div className={Style.slider_box_button_btn}>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("left")}>
              <TiArrowLeftThick />
            </div>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("right")}>
              <TiArrowRightThick />
            </div>
          </div>
        </div>

        <motion.div className={Style.slider_box_items} ref={dragSlider}>
          {width > 0 && (
            <motion.div
              className={Style.slider_box_item}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {sliderArray.map((element, index) => (
                <SliderCard key={index} index={index} element={element} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;