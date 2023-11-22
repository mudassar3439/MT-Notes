import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import logo from '../Media/profilepic.jpeg';
import { ref, getDownloadURL } from 'firebase/storage';
// Icons
import { MdAddToPhotos } from "react-icons/md";
import {SiMediamarkt} from 'react-icons/si';

function Nav() {

  const navigate=useNavigate()

  const firebase=useFirebase()
  const [data, setData] = useState();
  const [url,setUrl]=useState();

  const storage=firebase.storage


    useEffect(() => {
        const uid = firebase.user?.uid;
        firebase
          .getprofile(uid)
          .then((result) => {
            if (result) {
              // Data has been retrieved successfully
              const doc = result.docs[0];
              const fetchedData = doc.data();
              setData(fetchedData); // Update the 'data' state with the fetched data
            }
          })
          .catch((error) => {
            console.error('Error retrieving data:', error);
          });
      }, [firebase]);
  

      useEffect(() => {
  
        if (data && data.imageURL) {
          const imageUrlRef = ref(storage, data.imageURL); // Use the imageURL directly if it's valid
          getDownloadURL(imageUrlRef)
            .then((url) => setUrl(url))
            .catch((error) => {
              console.error('Error getting download URL:', error);
              // Handle the error as needed
            });
        }
      }, );

  const profile=()=>{
    navigate("/Account")
  }



  return (
    <>

        <div className='container-fluid'>
      
        <div className='row justify-content-center'>
            <div className='col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                <div className='d-flex justify-content-between pb-2 box nav-border' >
                
                <NavLink className="nav-link" to="/images" aria-current="page" ><SiMediamarkt className='gallery_btn mt-1' style={{fontSize:"23px",color:"black"}}></SiMediamarkt></NavLink>
                <NavLink className="nav-link" to="/new_notes" aria-current="page"><div className='rounded-pill'><MdAddToPhotos className='mt-1 add_btn_animation' style={{fontSize:"27px"}}></MdAddToPhotos></div></NavLink>
                <img src={url||logo}  onClick={profile} alt='' style={{fontSize:"20px",height:'25px',width:"25px"}} className='mt-1 rounded-pill' />
               
                </div>
            </div>
          </div>




</div>
    </>
  )
}

export default Nav
