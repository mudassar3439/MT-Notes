import React, { useEffect, useState } from 'react';
import Typewritertext from '../Components/Typewritertext';
import {useFirebase} from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import {HiOutlineDownload } from 'react-icons/hi';
import {MdDelete } from 'react-icons/md';
import Navbar from '../Components/Navbar';

function VideoDetails(props) {
  const params = useParams();
  const productId = params.productId;
  
  const firebase = useFirebase();
  const navigate=useNavigate()
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [backonline,setbackonline]=useState();
  
 
  // useEffect Hook 
  useEffect(() => {
    // Function to handle online/offline events
    const handleOnlineStatus = () => {
      setIsOnline(window.navigator.onLine);
      if(window.navigator.onLine){
        setbackonline(true)
        setTimeout(()=>{
          setbackonline(false)
        },5000)

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
    firebase.SingelVideo(params.productId).then((value) => setdata(value?.data()));
  }, [firebase, params.productId]);


  useEffect(() => {
    if (data && data.videoURL) {
      firebase.getVideoURL(data.videoURL).then((url) => seturl(url));
    }
  }, [firebase, data]);
  console.log(url)

  const DeleteImage = async () => {
    try {
        const userConfirmed = window.confirm('Are you sure you want to delete this Video ?');

        if (userConfirmed) {
            
            // Delete product from Firestore
            await firebase.deletevideo(productId);
            // Remove the deleted product from the state
            alert('Video Deleted Successfully');
            navigate('/Videos');
        }
    } catch (error) {
        alert.error('Error deleting product:', error);
    } 
};
  





  if (!url) {
    return(<>
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
    </>);
  }

  
  
  return (
    <> 
   <Navbar></Navbar>
    <div className='row justify-content-center '>
    <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4 '>
    
    {backonline && (
      <div className='alert-Bg '>
      <div className='row justify-content-center '>
      <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4'>
          <div className='alert  mt-1 text-center' role='alert' style={{background:"green"}}>
          
          <h5><Typewritertext text="Back Online"/></h5>
          </div>
      </div>
      </div>
      </div>
        )}

        {!isOnline && (
          <div className='alert-Bg '>
          <div className='row justify-content-center'>
          <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4' >
          <div className='alert alert-danger mt-1 text-center' role='alert' style={{background:"red"}}>
          
          <h5><Typewritertext text=" No Internet Connection"/></h5>
          </div>
          </div>
          </div>
          </div>
        )}
    </div>
    </div>
   
      <div className="container-fluid scrollable-Home" style={{height:"90vh"}}>
         
        <div className="row ">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mx-auto">
            <div className=" mt-1 ">
              <div className="text-center">
              <video className='Detail-video' autoPlay controls >
            <source  key={url} src={url} type="video/mp4"  />
             Your browser does not support the video tag.
            </video>
              </div>
              <div className='d-flex justify-content-between ps-2 pe-2 mt-1'>
              <HiOutlineDownload className='download' style={{fontSize:"30px"}}></HiOutlineDownload>
              <MdDelete onClick={DeleteImage} className='delete' style={{fontSize:"30px"}}></MdDelete>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
