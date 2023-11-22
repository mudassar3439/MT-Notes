import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import {MdDelete } from 'react-icons/md';

function DocCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substr(0, maxLength) + '...';
  }

  const truncatedName = truncateString(props.originalName, 25);

  const handleClick = () => {
    navigate(`/Document/delete/${props.id}`);
  };

  useEffect(() => {
    firebase.getVideoURL(props.videoURL)
      .then((url) => {
        if (url) {
          setUrl(url);
        } else {
          console.log("Doc URL not available.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving Doc URL:", error);
      });
  }, [firebase, props.videoURL]);
  
  return (
    <div className="container mt-3 mb-2" id="header" >
    <div className="row">
      <div className=" col-12 col-md-6 col-10 mx-auto">
        <div className=" p-2 signin-box Doc-card" style={{background:"#dedefd",borderRadius:"8px"}}>
          <div className='mt-2 mb-1 col-md-12 col-lg-12 col-xl-12 '>
          <div className='card-documents'>
         <a key={url} href={url} target="_blank" rel="noopener noreferrer">
         View Document
          </a>
        </div>
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

export default DocCard;

 