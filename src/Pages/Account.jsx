import React,{useState,useEffect} from 'react'
import { App } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import logo from '../Media/pimg.jpeg'
import ProfileNav from '../Components/ProfileNav';
import Loader from '../Components/Loader';
import { getAuth } from 'firebase/auth';
import Typewritertext from '../Components/Typewritertext';
import { ref, getDownloadURL } from 'firebase/storage';


import {FaRegImages } from 'react-icons/fa';
import {BiSolidVideos } from 'react-icons/bi';
import {GiLoveSong } from 'react-icons/gi';
import {VscFileSubmodule } from 'react-icons/vsc';

function Account() {
// Instance
  const firebase=useFirebase()
  const Auth = getAuth(App);
  const navigate=useNavigate()

// State Hooks 
  const [VideoCounts, setVideoCounts] = useState(0);
  const [imageCounts, setimageCounts] = useState(0);
  const [url,setUrl]=useState()
  const [Loading,setLoading]=useState(true)
  const [AudioCounts, setAudioCounts] = useState(0);
  const [DocCounts, setDocCounts] = useState(0);
  const [data,setdata]=useState();
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [backonline,setbackonline]=useState();
  const storage=firebase.storage
  


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
  




  // useEffect Hook For navigate to the signup page when logout 
  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
    }
  }, [firebase, navigate]);


//Update Button Function ***************************************************************



// Update_profile Function for button 
const Profile_updat =()=>{
  navigate("/user-Profile_update")

}


// Image Counter ***********************************************************************
  useEffect(() => {
    const Counter = async () => {
      try {
        const uid = firebase.user?.uid;
        if (uid) {
          const count = await firebase.imagesCounter(uid);
          setimageCounts(count);
        }
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    Counter();
  }, [firebase]);


// Videos Counter ***********************************************************************

  useEffect(() => {
    const Counter = async () => {
      try {
        const uid = firebase.user?.uid;
        if (uid) {
          const count = await firebase.videosCounter(uid);
          setVideoCounts(count);
        }
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    Counter();
  }, [firebase]);


  
// Audios Counter ***********************************************************************

useEffect(() => {
    const Counter = async () => {
      try {
        const uid = firebase.user?.uid;
        if (uid) {
          const count = await firebase.AudiosCounter(uid);
          setAudioCounts(count);
        }
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    Counter();
  }, [firebase]);

// Documents Counter ***********************************************************************

useEffect(() => {
    const Counter = async () => {
      try {
        const uid = firebase.user?.uid;
        if (uid) {
          const count = await firebase.DocCounter(uid);
          setDocCounts(count);
        }
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    Counter();
  }, [firebase]);

  
// useState For hide And Show Input Field and geting data from firestore

useEffect(() => {
  if(isOnline){
  const uid = firebase.user?.uid;
  if (uid !==undefined){
  firebase
    .getprofile(uid)
    .then((result) => {
      if (result) {
        // Data has been retrieved successfully
        const doc = result.docs[0];
        const fetchedData = doc.data();
        setdata(fetchedData);
        console.log(fetchedData)
      }
    })
    .catch((error) => {
      console.error('Error retrieving data:', error);
    });
  }
}}, [firebase,isOnline]);



// fetch profile pic URL
useEffect(() => {
  if (data && data.imageURL) {
    const imageUrlRef = ref(storage, data.imageURL);
    getDownloadURL(imageUrlRef)
      .then((url) => {
        setUrl(url);
        setLoading(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
        // Handle the error as needed
        setLoading(false); // Mark loading as complete even in case of an error
      });
  }
},);







//LogOut Button Function ***********************************************************************
  const Click= () => {
    Auth.signOut()
      .then(() => {
        alert('You Are Loged-out.Please Sign-in Again !');
        navigate('/')
      })
  }


  return (
    <div>




<div className='row justify-content-center '>
    <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4 '>
    
    {backonline && (
      <div className='alert-Bg '>
      <div className='row justify-content-center '>
      <div className='col-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4'>
          <div className='alert  mt-1 text-center' role='alert' style={{background:"green"}}>
          
          <h5><Typewritertext text="Back Online "/></h5>
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



     {Loading ? (
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
        ) :(
    <div className='container-fluid ' >
    <ProfileNav></ProfileNav>
    
              <>
              <div className='row justify-content-center m-2'>
     
     <div className='col-12 col-md-12 col-lg-8 col-xl-6 col-xxl-6  sign-box'>
     {/* Pic and its input Field Start */}
   <div className='text-center  mt-5' >

    <img src={url || logo} alt=""
     className="img-fluid rounded-pill"
     style={{ height: '100px', width: '100px' }}/>
     
     </div>
      {/* Pic and its input Field  End */}



     {/* Name and its Input Field Start */}
     <div className="text-center mt-2">
          
             <h1>{data && data.FirstName} {data && data.LastName}</h1>
         
         </div>
     {/* Name and its Input Field End*/}

     <div className='text-center mt-1 ' style={{fontSize:"14px"}} >{data && data.userEmail}</div>

     <div className='text-center'>
          <button className='btn  text-warning btn-dark mt-4 rounded-pill' onClick={Profile_updat}>Edit_Profile</button>
     </div>

     {/* Tables Start */}
     <div className='row mt-4  justify-content-center'>
     <div className='col-12'>
      
     
     {/* Images */}
     <div className='d-flex justify-content-between mt-1 Table'>
      <h5 className='ms-3 text-info'><FaRegImages/></h5>
       <h6 className='me-5 mt-2'>{imageCounts}</h6>
     </div>

     {/* Videos */}
     <div className='d-flex justify-content-between mt-1 Table'>
     <h5 className=' ms-3 text-info'><BiSolidVideos/></h5>
     <h6 className='me-5 mt-2'>{VideoCounts}</h6>
     </div>

     {/* Audios */}
     <div className='d-flex justify-content-between mt-1 Table'>
     <h5 className='ms-3 text-info'><GiLoveSong/></h5>
     <h6 className='me-5 mt-2'>{AudioCounts}</h6>
     </div>

   {/* Documents */}
     <div className='d-flex justify-content-between mt-1 Table'>
     <h5 className='ms-3 text-info'><VscFileSubmodule/></h5>
     <h6 className='me-5 mt-2'>{DocCounts}</h6>
     </div>
     
     </div>
     </div>
        {/* Tables End */}


     {/* Logout Button Start*/}
          <div className='text-center mt-3'>
          <button className='btn btn-primary mt-3 mb-5' onClick={Click}> Log-out</button>
          </div>
    {/* Logout Button End*/}     
      
   </div>
 </div>
              </>
            
     
    </div>
    )}
    </div>
  )
}

export default Account