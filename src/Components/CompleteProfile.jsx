import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import logo from '../Media/pimg.jpeg';

function CompleteProfile() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [pic, setpic] = useState();
  const [FirstName, setFirstName] = useState('');
  const [FirstNameError, setFirstNameError] = useState('');
  const [LastName, setLastName] = useState('');
  const [LastNameError, setLastNameError] = useState('');
  const [imagePreview, setImagePreview] = useState();
  const [data, setdata] = useState();
  const [Update,setupdate]=useState();
  const [picError, setPicError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    }
  }, [firebase, navigate]);

  const update = () => {
    if (!pic) {
      setPicError('Please Select Your Profile Pic');
      return;
    }
    setPicError(''); // Clear the error if pic is selected
    if (!FirstName) {
      setFirstNameError('Please enter your First Name');
      return;
    }

    if (!LastName) {
      setLastNameError('Please enter your Last Name');
      return;
    }
    if (FirstName !== data?.FirstName && LastName !== data?.LastName ) {
      setupdate(true);
      firebase
        .Addprofile(pic, FirstName,LastName) 
        .then(() => {
          setupdate(false);
          navigate("/home")
        })
        .catch((error) => {
          setupdate(false);
          console.error('Error:', error);
        });
    }
  };

  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPicError('')
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
  }, [firebase]);

  
  

  return (
    <div>
      <div className="container-fluid mt-5">
      
        <div className="row justify-content-center m-2">
          <div className="col-12 col-md-12 col-lg-8 col-xl-6 col-xxl-6  sign-box">

          <div className='text-center mt-3'>
           <h4>Complete Your Profile </h4>
           </div>
         
            <div className="row mt-3">
              <div className="col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2"></div>
            </div>
            <div className="text-center  mt-3">
              <label>
                <img
                  src={imagePreview || logo}
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
              {picError && (
              <p style={{ color: 'red', marginTop: '5px' }}>{picError}</p>
            )}
              <h6>Select Profile Pic</h6>
            </div>
            <div>
            <label  className="form-label mt-5 ms-2">First Name</label>
            <div className="text-center ">
              <input
                type="text"
                onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(''); 
              }}
                value={FirstName} 
                className="form-control input-field text-center"
              />
            </div>
            {FirstNameError && (
              <p style={{ color: 'red', marginTop: '5px' }}>{FirstNameError}</p>
            )}

           </div>
           <div>
           <label className="form-label mt-4 ms-2">Last Name</label>
            <div className="text-center">
              <input
                type="text"
                onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(''); 
              }}
                value={LastName} 
                
                className="form-control input-field text-center"
              />
               {LastNameError && (
              <p style={{ color: 'red', marginTop: '5px' }}>{LastNameError}</p>
            )}
            </div>
            </div>
            <div className="text-center mt-4">
              
            {Update ? (
                <p className='text-warning mb-5 mt-2'>Profile Creating...</p>
              ) : (
               
                  <>
                    <button className="btn btn-primary update_button mt-1 mb-5" onClick={update}>
                    Save
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
