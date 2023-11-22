import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substr(0, maxLength) + '...';
}

function ImageCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/image/detail/${props.id}`);
  };

  useEffect(() => {
    firebase.getimgURL(props.imageURL).then((url) => setUrl(url));
  }, [firebase, props.imageURL]);

  const truncatedName = truncateString(props.originalName, 17);

  return (
    <div className="col-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2 mt-3 mb-3">
      <div
        className="card  d-flex"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-img-container">
          <img src={url} className="card-img card_img img-fluid" alt="Pic" />
        </div>
        <div className='ms-1 text-center' style={{ fontSize: "12px" }}>
          {truncatedName}
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
