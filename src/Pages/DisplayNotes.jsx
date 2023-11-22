import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Navup from '../Components/Navup';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdDone, MdDelete } from "react-icons/md";
import Typewritertext from '../Components/Typewritertext';

function DisplayNotes() {
  const firebase = useFirebase();
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', text: '' });
  const minRows = 1;
  const [isEditing, setIsEditing] = useState(false);
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
    if(isOnline){
    const fetchNote = async () => {
      try {
        const noteData = await firebase.SNotes(params.productId);
        if (noteData.exists) {
          setNote(noteData.data());
        }
      } catch (error) {
        console.error("An error occurred while fetching the note: " + error.message);
      }
    };
    fetchNote();
  }}, [firebase, params.productId,isOnline]);




  const formatTimestamp = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
      const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      return date.toLocaleDateString(undefined, options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3'); // Format the date without seconds
    } else {
      return ''; // or some default value if createdAt is undefined
    }
  };
  



  const Deletenote = async () => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to delete this note ?');

      if (userConfirmed) {
        // Delete product from Firestore
        await firebase.deleteNote(params.productId);
        // Remove the deleted product from the state
        alert('Notes Delete 💔');
        navigate('/home');
      }
    } catch (error) {
      alert.error('Error deleting product:', error);
    }
  };






  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    const textarea = e.target;
    const contentRows = Math.max(minRows, Math.ceil(textarea.value.length / 30));
    textarea.rows = contentRows;
    setNote({ ...note, text: textarea.value });
    setIsEditing(true);
  };

  const saveNote = () => {
    if (isEditing) {
      firebase
        .updateNote(params.productId, note)
        .then((message) => {
          alert(message);
          setIsEditing(false); // Set editing to false after saving
          navigate("/");
        })
        .catch((error) => {
          alert("An error occurred while saving notes: " + error.message);
        });
    }
  };

  const goBack = () => {
    navigate('/home');
  }

  return (
    <>
      <Navup />

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



      <div className='container scrollable-container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-12 col-lg-12 p-2 mt-5'>
            <div className='back_save d-flex mb-2 justify-content-between'>
              <div>
                <AiOutlineArrowLeft onClick={goBack} />
                <span className='ms-1 back_save_font'> Notes </span>
              </div>
              <div className='me-2 save'>
                <MdDone onClick={saveNote} style={{ display: isEditing ? 'inline' : 'none' }} />
                <MdDelete onClick={Deletenote} style={{ fontSize: "23px", cursor: "pointer", display: !isEditing ? 'inline' : 'none' }} />
              </div>
            </div>
            <div className='time_date d-flex mb-2 justify-content-between'>
              {formatTimestamp(note.createdAt)}
            </div>
            <div className='text-center'>
              <input
                onChange={handleTitleChange}
                value={note.title}
                className='input-field-n'
                type='text'
                placeholder='Title'
                style={{ width: "100%" }}
              />
            </div>
            <div className=''>
              <textarea
                className="textarea_field mt-1"
                placeholder='Write something here'
                onChange={handleTextChange}
                value={note.text}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayNotes;
