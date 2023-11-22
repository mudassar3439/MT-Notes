import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import logo from '../Media/pimg.jpeg';
import Loader from './Loader';
import { ref, getDownloadURL } from 'firebase/storage';

function Pupdate() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [pic, setpic] = useState();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [url,setUrl]=useState()
  const [imagePreview, setImagePreview] = useState();
  const [isUpdateButton, setIsUpdateButton] = useState(true);
  const [data, setdata] = useState();
  const [Update,setupdate]=useState();
  const [isLoading, setIsLoading] = useState(true); 

  const storage=firebase.storage

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    }
  }, [firebase, navigate]);

  const update = () => {
    if (FirstName !== data?.FirstName || LastName !== data?.LastName || pic) {
      setupdate(true); // Set loading to true when updating starts
      firebase
        .Addprofile(pic, FirstName, LastName)
        .then(() => {
          setupdate(false); // Set loading to false when updating completes
          navigate("/Account");
        })
        .catch((error) => {
          console.error('Error:', error);
          setupdate(false); // Set loading to false in case of an error
        });
    }
  };
  
  useEffect(() => {
    setIsUpdateButton(!(pic || FirstName !== data?.FirstName || LastName !== data?.LastName));
  }, [pic, FirstName, LastName, data]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
        setpic(file);
      };
    }
  };

  useEffect(() => {
    const uid = firebase.user?.uid;
    firebase
      .getprofile(uid)
      .then((result) => {
        if (result) {
          const doc = result.docs[0];
          const fetchedData = doc.data();
          setdata(fetchedData);
          setFirstName(fetchedData.FirstName);
          setLastName(fetchedData.LastName);
        }
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, [firebase]);


  
// fetch profile pic URL
useEffect(() => {
  if (data && data.imageURL) {
    const imageUrlRef = ref(storage, data.imageURL);
    getDownloadURL(imageUrlRef)
      .then((url) => {
        setUrl(url);
        setIsLoading(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
        // Handle the error as needed
        setIsLoading(false); // Mark loading as complete even in case of an error
      });
  }
},);


  return (
    <div>
      <div className="container-fluid mb-5">
      {isLoading ? (
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
            ) : (
              <>
              <div className="row justify-content-center m-2">
          <div className="col-12 col-md-12 col-lg-8 col-xl-6 col-xxl-6 ">
            <div className="row mt-3">
              <div className="col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2"></div>
            </div>
            <div className="text-center mt-3">
              <label>
                <img
                  src={ imagePreview ||url|| logo}
                  alt="jojoi"
                  className="img-fluid rounded-pill"
                  style={{ height: '100px', width: '100px' }}
                />
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
              </label>
              <h6>Select Profile Pic</h6>
            </div>
            <div>
              <label className="form-label mt-5 ms-2">First Name</label>
              <div className="text-center">
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={FirstName}
                  className="form-control input-field text-center"
                />
              </div>
            </div>
            <div>
              <label className="form-label mt-4 ms-2">Last Name</label>
              <div className="text-center">
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={LastName}
                  className="form-control input-field text-center"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              {Update ? (
                <p>Updating...</p>
              ) : (
                !isUpdateButton && (
                  <>
                    <button className="btn btn-primary update_button mt-1" onClick={update}>
                      Update
                    </button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
              </>
            )}

        
      </div>
    </div>
  );
}

export default Pupdate;
