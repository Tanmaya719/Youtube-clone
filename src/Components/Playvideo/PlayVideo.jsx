import React, { useEffect, useState } from 'react'
import "./playvideo.css"
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import { API_KEY, value_conveter } from '../../data'
import moment from 'moment'
import App from '../../App'
import { useParams } from 'react-router-dom'




function PlayVideo() {

    // ! getting the videoId using params()
    const {videoId}=useParams()

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])
    // ! fetching the video details through api using video id
    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]))

    }
    // ! fetching chennel data and comment details
    const fetchOtherData = async () => {
        // todo fetching channel data through channel id using api
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`

        await fetch(channelData_url).then(res => res.json()).then(data => setChannelData(data.items[0]))

        // todo fetching channel data through video id using api

        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=30&videoId=${videoId}&key=${API_KEY}`

        await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
    }
    useEffect(() => {
        fetchVideoData()
    }, [videoId])

    useEffect(() => {
        fetchOtherData()
    }, [apiData])


    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_conveter(apiData.statistics.viewCount) : "15k"} viwes &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="" /> {apiData ? value_conveter(apiData.statistics.likeCount) : "245"}</span>
                    <span><img src={dislike} alt="" /> </span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_conveter(channelData.statistics.subscriberCount) : "1M"} Subscriber</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 290) : "Description here"}</p>
                <hr />
                <h4>{apiData ? value_conveter(apiData.statistics.commentCount) : "15k"} Comments</h4>

                {commentData.map((item, index) => {

                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 days ago</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className='comment-action'>
                                    <img src={like} alt="" />
                                    <span>{value_conveter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />

                                </div>
                            </div>

                        </div>
                    )
                })}





            </div>

        </div>
    )
}

export default PlayVideo