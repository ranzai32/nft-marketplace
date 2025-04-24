import React from 'react'

import Style from './AudioLive.module.css'
import AudioCard from './AudioCard/AudioCard'
import AudioCardSmall from './AudioCardSmall/AudioCardSmall'

const AudioLive = () => {
  return (
    <div className={Style.aduioLive}>
        <div className={Style.aduioLive_box}>
            <div className={Style.aduioLive_box_left}>
                <AudioCard />
                <AudioCard />
            </div>

            <div className={Style.aduioLive_box_right}>
              <AudioCardSmall />
              <AudioCardSmall />
              <AudioCardSmall />
            </div>
        </div>
    </div>
  )
}

export default AudioLive