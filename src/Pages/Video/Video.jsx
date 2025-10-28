import React from 'react'
import "./Video.css"
import PlayVideo from '../../Components/Playvideo/PlayVideo'
import Recomended from '../../Components/Recomended/Recomended'
import { useParams } from 'react-router-dom'

function Video() {
  const {videoId,catagoryId}=useParams()
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}/>
      <Recomended catagoryId={catagoryId}/>
    </div>
  )
}

export default Video