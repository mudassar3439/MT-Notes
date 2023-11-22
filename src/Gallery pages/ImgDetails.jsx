import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewritertext from '../Components/Typewritertext';
import { useFirebase } from '../Context/Firebase';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Navbar from '../Components/Navbar';

import { HiOutlineDownload } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

function ImgDetails(props) {
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [backonline, setbackonline] = useState();

  useEffect(() => {
    // Function to handle online/offline events
    const handleOnlineStatus = () => {
      setIsOnline(window.navigator.onLine);
      if (window.navigator.onLine) {
        setbackonline(true);
        setTimeout(() => {
          setbackonline(false);
        }, 5000);
      }
    };

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Cleanup the event listeners when component unmounts
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    firebase.SingelImage(params.productId).then((value) => setdata(value?.data()));
  }, [firebase, params.productId]);

  const DeleteImage = async () => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to delete this Image ?');

      if (userConfirmed) {
        // Delete product from Firestore
        await firebase.deleteImage(productId);
        // Remove the deleted product from the state
        alert('Image Deleted Successfully');
        navigate('/Images');
      }
    } catch (error) {
      alert.error('Error deleting product:', error);
    }
  };

  
  useEffect(() => {
    if (data && data.imageURL) {
      firebase.getimgURL(data.imageURL).then((url) => seturl(url));
    }
  }, [firebase, data]);

  useEffect(() => {
    if (url) {
      const handleImageLoad = () => {
        const image = document.getElementById('imgDetail');
        if (image) {
          const viewportHeight = window.innerHeight;
          const imageHeight = image.clientHeight;

          if (imageHeight < viewportHeight) {
            // Center the image vertically
            const marginTop = (viewportHeight - imageHeight) / 3;
            image.style.marginTop = `${marginTop}px`;
          } else {
            // Display the image as full page
            image.style.height = '100vh';
            image.style.width = 'auto';
            image.style.marginTop = '0px';
          }
        }
      };

      handleImageLoad();

      window.addEventListener('resize', handleImageLoad);

      return () => {
        window.removeEventListener('resize', handleImageLoad);
      };
    }
  }, [url]);

  if (!url) {
    return (
      <>
        <div className='loading-spinner'>
          <Loader></Loader>
          <h1 className='ms-4 mt-0'>
             <span style={{color:" #F10C49"}}>wait </span>
              <div className="spinner-grow spinner-grow-sm  ms-1" style={{color:"#F10C49"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow-sm ms-1" style={{color:"#f4dd51"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow-sm  ms-1" style={{color:"#e3aad6"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='row justify-content-center '>
        <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4 '>
          {backonline && (
            <div className='alert-Bg '>
              <div className='row justify-content-center '>
                <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4'>
                  <div className='alert  mt-1 text-center' role='alert' style={{ background: 'green' }}>
                    <h5>
                      <Typewritertext text='Back Online' />
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isOnline && (
            <div className='alert-Bg '>
              <div className='row justify-content-center'>
                <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4'>
                  <div className='alert alert-danger mt-1 text-center' role='alert' style={{ background: 'red' }}>
                    <h5>
                      <Typewritertext text=' No Internet Connection ' />
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar></Navbar>
      <div className='container scrollable-Home mt-3 ' style={{ marginBottom: '60px' }}>
        <div className='row mt-1 '>
          <div className='col-12 col-md-8 col-lg-8 col-xl-12 mx-auto'>
            <div className='p-2  '>
              <div className='text-center'>
              <a href={url} download>
                  <img
                    id='imgDetail'
                    src={url}
                    alt=''
                    className='img-fluid img-thumbnail'
                    target='blank'
                  />
                </a>
              </div>
              <div className='d-flex justify-content-between ps-2 pe-2 mt-1'>
                <HiOutlineDownload className='download' style={{ fontSize: '30px' }}></HiOutlineDownload>
                <MdDelete onClick={DeleteImage} className='delete' style={{ fontSize: '30px' }}></MdDelete>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImgDetails;
