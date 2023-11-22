import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import {BsFillPlayFill} from 'react-icons/bs';


function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substr(0, maxLength) + '...';
}

function VideoCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/detail/${props.id}`);
  };

  useEffect(() => {
    firebase.getVideoURL(props.videoURL)
      .then((url) => {
        if (url) {
          setUrl(url);
        } else {
          console.log("Video URL not available.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving video URL:", error);
      });
  }, [firebase, props.videoURL]);
  
  const truncatedName = truncateString(props.originalName, 17);

 
  return (


<div className="col-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-2 "> 
  <div className="card d-flex" onClick={handleClick} style={{ cursor: 'pointer', background:"white" }}>
  <div className=" mt-1">
  <BsFillPlayFill className='video-Icon '></BsFillPlayFill>
  <video className='card-video'>
  <source key={url} src={url} type="video/mp4" />
  Not Supported💔
  </video>

  <div className='ms-1 text-center' style={{fontSize:"12px"}}>{truncatedName}</div>
  </div>
  </div>
</div>
  );
}

export default VideoCard;
