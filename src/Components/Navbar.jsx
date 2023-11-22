import React, { useRef, useState,useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { NavLink } from 'react-router-dom';


// Icons
import {FaRegImages } from 'react-icons/fa';
import {GrAdd } from 'react-icons/gr';
import {BiSolidVideos } from 'react-icons/bi';
import {GiLoveSong } from 'react-icons/gi';
import {VscFileSubmodule } from 'react-icons/vsc';

function Navbar() {
  const firebase = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const ImagesRef = useRef(null);
  const VideosRef = useRef(null);
  const AudioRef = useRef(null);
  const DocsRef = useRef(null);
  const [Imageupload, setImageupload] = useState(false);
  const [Videoupload, setVideoupload] = useState(false);
  const [Audioupload, setAudioupload] = useState(false);
  const [Docupload, setDocupload] = useState(false);
 

  const Handle_Images = async (event) => {
    setIsLoading(true);
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      const uploadPromises = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        uploadPromises.push(firebase.AddImages(file)); 
      }

      // Wait for all files to be uploaded
      Promise.all(uploadPromises)
      .then(async () => {
        
        
          setImageupload(true); 
          setIsLoading(false);
          window.location.reload(); 
        })
        .catch(error => {
          console.error('Error uploading files:', error);
        });
    }
  };

 if (Imageupload) {
    window.alert('Images added successfully!');
    setImageupload(false); 
  }


// Videos **************************************************************** 
const Handle_Video = async (event) => {
  setIsLoading(true);
  const selectedFiles = event.target.files;

  if (selectedFiles.length > 0) {
    const uploadPromises = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      uploadPromises.push(firebase.AddVideos(file)); 
    }

    // Wait for all files to be uploaded
    Promise.all(uploadPromises)
    .then(async () => {
      
      
        setVideoupload(true); 
        setIsLoading(false);
        window.location.reload(); 
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  }
};

useEffect(() => {
  if (Videoupload) {
    window.alert('Video added successfully!');
    setVideoupload(false);
  }
}, [Videoupload]);

// Audio**************************************************************************** 
const Handle_Audio = async (event) => {
  setIsLoading(true);
  const selectedFiles = event.target.files;

  if (selectedFiles.length > 0) {
    const uploadPromises = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      uploadPromises.push(firebase.AddAudios(file)); 
    }

    // Wait for all files to be uploaded
    Promise.all(uploadPromises)
    .then(async () => {
      
      
        setAudioupload(true); 
        setIsLoading(false);
        window.location.reload(); 
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  }
};

useEffect(() => {
  if (Audioupload) {
    window.alert('Audio added successfully!');
    setVideoupload(false);
  }
}, [Audioupload]);

//Documents **************************************************************** 
const Handle_Docs = async (event) => {
  setIsLoading(true);
  const selectedFiles = event.target.files;

  if (selectedFiles.length > 0) {
    const uploadPromises = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      uploadPromises.push(firebase.AddDocs(file)); 
    }

    // Wait for all files to be uploaded
    Promise.all(uploadPromises)
    .then(async () => {
      
      
        setDocupload(true); 
        setIsLoading(false);
        window.location.reload(); 
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  }
};

if (Docupload) {
  window.alert('Document added successfully!');
  setDocupload(false); 
}
 





  return (
    <>

        <div className='container-fluid'>
      
        <div className='row justify-content-center'>
            <div className='col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                <div className='d-flex justify-content-between pb-2 box nav-border' >
                <NavLink className="nav-link" aria-current="page" to="/Images"><FaRegImages style={{fontSize:"23px"}}/></NavLink>
                <NavLink className="nav-link" aria-current="page" to="/Videos"><BiSolidVideos style={{fontSize:"23px"}}></BiSolidVideos></NavLink>
                <NavLink className="nav-link" aria-current="page"><GrAdd data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" style={{fontSize:"27px"}}></GrAdd></NavLink>
                <NavLink className="nav-link" aria-current="page" to="/Audio"><GiLoveSong style={{fontSize:"23px"}}></GiLoveSong></NavLink>
                <NavLink className="nav-link" aria-current="page" to="/Documents"><VscFileSubmodule style={{fontSize:"23px"}}></VscFileSubmodule></NavLink>
                </div>
            </div>
          </div>




    <div className='row'>
      <div className='col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-12  '>
             <div className='justify-content-center'>
             <div className="offcanvas  ofcanvis offcanvas-bottom" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
             <div className='text-center'>
             <h5 className="offcanvas-title" id="offcanvasBottomLabel">Add</h5>
             </div>
            <button type="button" class="btn-close offcanvas-closebtn text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        
      <div className=" d-flex justify-content-between ps-2 pe-2">
      <label className='icon-label'>
             
         <FaRegImages style={{fontSize:"30px",cursor:"pointer" }} title='Images'/>
             <input
               accept="image/*"
               ref={ImagesRef}
               type='file'
               style={{ display: 'none' }}
               onChange={Handle_Images}
               multiple
             />
        </label>

        <div className='loading-spiner'>

         
        {isLoading ? (
                    <>
                      <span style={{fontSize:"17px"}}>Wait </span>
                      <div className="spinner-border spinner-border-sm text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                      ''
                    )}

        </div>
       
        <label className='icon-label'>
             
        <BiSolidVideos style={{fontSize:"30px",cursor:"pointer" }} title='Videos'/>
                 <input
                   accept="video/*"
                   ref={VideosRef}
                   type='file'
                   style={{ display: 'none' }}
                   onChange={Handle_Video}
                   multiple
                 />
            </label>

        <label>
        <GiLoveSong style={{fontSize:"30px",cursor:"pointer" }} title='Audios'/>
                 <input
                   accept="audio/*"
                   ref={AudioRef}
                   type='file'
                   style={{ display: 'none' }}
                   onChange={Handle_Audio}
                   multiple
                 />
            </label>
      
            <label>
        <VscFileSubmodule style={{fontSize:"30px",cursor:"pointer" }} title='Documents'/>
                 <input
                   accept=".pdf,.doc,.docx,.txt"
                   ref={DocsRef}
                   type='file'
                   style={{ display: 'none' }}
                   onChange={Handle_Docs}
                   multiple
                 />
            </label>
      </div>
          </div>
          </div>
          </div>
  </div>
</div>
    </>
  )
}

export default Navbar
