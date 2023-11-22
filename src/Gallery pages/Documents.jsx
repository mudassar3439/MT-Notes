import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import DocCard from '../Components/DocCard';
import Loader from '../Components/Loader';
import Typewritertext from '../Components/Typewritertext';
import Navbar from '../Components/Navbar';
import Navup from '../Components/Navup';
import GoBack from '../Components/GoBack';


function Documents() {
  const firebase = useFirebase();
  const navigate=useNavigate()
  const [Docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    if (isOnline) {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/'); // Redirect to '/Add-user' if not logged in
    } else {
      const uid = firebase.user?.uid;
      if (uid) {
        setIsLoading(true);
        firebase.AllDocs(uid)
          .then((products) => {
            setDocs(products.docs);
            setIsLoading(false);
            console.log(products); // Perform any operations with the updated products state here
          })
          
      }
    }
  }
  }, [isOnline,firebase, navigate]);


  


 
  return (
    <>
    
    
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








      <div className='container-fluid scrollable-Home '>
      < Navup/>
      <Navbar/>


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
          <div className='row d-flex justify-content-center mt-5 mb-5'>
          <GoBack></GoBack>
          {Docs.length > 0 ?( Docs.map((Video) => (
              <DocCard  key={Video.id} id={Video.id} {...Video.data()} />
            ))):(<div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                <div className="text-center " style={{color:"rgba(0,0,0,0.3)"}}>
                  <div className="container mt-3" id="header">
                    <div className="row">
                      <div className="col-md-12 col-12 mx-auto">
                        <div className="mb-5 p-2">
                          <div className="p-2 mt-2 mb-1 col-md-12 col-lg-12 col-xl-12  d-flex justify-content-between">
                            <div>
                              <h2 className="mt-2 ms-2">Add Documents</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
           }
        </div>
        )}
      </div>
    </>
  );
}

export default Documents;
