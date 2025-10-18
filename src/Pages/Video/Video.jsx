import React from 'react'
import "./Video.css"
import PlayVideo from '../../Components/Playvideo/PlayVideo'
import Recomended from '../../Components/Recomended/Recomended'

function Video() {
  return (
    <div className='play-container'>
      <PlayVideo/>
      <Recomended/>
    </div>
  )
}

export default Video