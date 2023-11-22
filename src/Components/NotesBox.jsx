import React from 'react';
import { useNavigate } from 'react-router-dom';


function NotesBox(props) {
  const navigate=useNavigate();
  
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3'); // Format the date without seconds
  };

  const click=()=>{
    navigate(`/Notes/${props.id}`)
  }
  
  return (
    <div>   
    <div className="container mt-3 " id="header" >
    <div className="row">
      <div className=" col-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10   mx-auto">
        <div onClick={click} className="mb-4 p-2 sign-box-n card" style={{background:"#dedefd",height:"60px"}}>
          <div className='mt- mb-1 col-md-12 col-lg-12 col-xl-12  '>
            <div className='d-flex justify-content-between'>
              <h6 className='ms-2' style={{fontSize:"17px"}}>{props.title}</h6>
            </div>
            <div className='ms-2' style={{fontSize:"11px",color:"#00000070"}}>
            <span >{formatTimestamp(props.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default NotesBox