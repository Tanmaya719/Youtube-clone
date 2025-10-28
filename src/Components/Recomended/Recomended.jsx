import React, { useEffect, useState } from 'react'
import "./recomended.css"
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import { API_KEY, value_conveter } from '../../data'
import { Link } from 'react-router-dom'

function Recomended({ catagoryId }) {

    const [apiData, setApiData] = useState([])

    const fetchRecomendedData = async () => {
        const recomended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${catagoryId}&key=${API_KEY}`

        await fetch(recomended_url).then(res => res.json()).then(data => setApiData(data.items))

    }

    useEffect(() => {
        fetchRecomendedData()
    })

    return (
        <div className='recomended'>
            {apiData.map((item, index) => {

                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="video-side-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_conveter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                )
            })}



        </div>
    )
}

export default Recomended