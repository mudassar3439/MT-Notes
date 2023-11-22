import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import {MdDelete } from 'react-icons/md';

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substr(0, maxLength) + '...';
}



function AudioCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Audio/delete/${props.id}`);
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
  const truncatedName = truncateString(props.originalName, 20);

  return (
    <div className="container mt-3 mb-2" id="header" onClick={handleClick}>
    <div className="row">
      <div className=" col-12 col-md-6 col-10 mx-auto">
        <div className=" p-2 signin-box card" style={{background:"#dedefd",borderRadius:"8px"}}>
          <div className='mt-2 mb-1 col-md-12 col-lg-12 col-xl-12  '>
          <audio className='Card-Audio' controls>
          <source  key={url} src={url} type="video/mp4"  />
           Your browser does not support the Audio tag.
           </audio>
           <div className='d-flex justify-content-between'> 
           <div className='ms-1 text-center' style={{fontSize:"15px"}}>{truncatedName}</div>
           <MdDelete className='delete me-2' onClick={handleClick}  style={{fontSize:"22px"}}></MdDelete>

           </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AudioCard;

 