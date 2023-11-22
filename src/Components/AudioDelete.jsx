import React, { useState,useEffect} from 'react';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AudioDelete(props) {
    const navigate=useNavigate()
  const firebase = useFirebase();
  const [data, setData] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  
  const params = useParams();
  const productId = params.productId;
  

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




  const cancel=()=>{
    navigate('/Audio')
  }

    const Delete = async () => {
          try {
            setIsDeleting(true); 
            await firebase.deleteAudio(productId);
            navigate('/Audio');
            alert("Audio File Deleted 💔");
          } catch (error) {
            alert.error('Error deleting product:', error);
          } finally {
            setIsDeleting(false); 
          }
        
      };
  return (
   <>
    
    <div className='scrollable-Admin-container' style={{width:"100%"}}>
    <div className='container mt-5'>
            <div className='row justify-content-center'>
            <div className='col-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
            <div style={{background:"white",borderRadius:"10px"}}>
            <div className='confirmation-box p-2 mt-5'>
            <h3>Hello {data && data.FirstName} {data && data.LastName} !</h3>
            <p style={{fontSize:"14px"}}>
              you really want to delete this Audio File ?
            </p>
            <h6><b>Note:</b></h6>
            <p style={{fontSize:"14px"}}>
             {data && data.FirstName} {data && data.LastName}, if you click on the Delete button, the audio file will be deleted permanently and removed from our database.
            </p>
            <p style={{fontSize:"14px"}}>
              So Please confirm you really delete this audio file parmanently.
            </p>


            <div className=' d-flex  justify-content-center'>
            <div>
            {isDeleting ? ( 
                <button className="btn btn-danger" style={{fontSize:"13px"}} disabled>
                  Deleting...
                </button>
              ) : (
                <button className="btn btn-danger" style={{fontSize:"13px"}} onClick={Delete}>
                  Delete 
                </button>
              )}
            </div>
             
             <div className='ms-3'>
              <button className='btn btn-primary' style={{fontSize:"13px"}} onClick={cancel}>Cancel</button>
             </div>
            </div>
          </div>

          
            </div>
            </div>
        </div>
    </div>
    </div>
   </>
  )
}

export default AudioDelete