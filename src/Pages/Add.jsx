import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Navup from '../Components/Navup';
import {AiOutlineArrowLeft}from "react-icons/ai";
import {MdDone}from "react-icons/md";



function Add() {
  const firebase=useFirebase();
  const navigate=useNavigate();
  const [title,settitle]=useState('');
  const [titleError,settitleError]=useState();
  const [text, setText] = useState('');

  const minRows = 1; 


  const handleTextareaInput = (e) => {
    const textarea = e.target;
    const contentRows = Math.max(minRows, Math.ceil(textarea.value.length / 30));
    textarea.rows = contentRows;
    setText(textarea.value);
  };

  

  const update = () => {
    if(!title){
      settitleError("Title is required");
      return;
    }
    
    firebase
      .AddNotes(title, text)
      .then(() => {
        alert("Notes Saved Successfully");
        navigate("/home");
      })
      .catch((error) => {
        alert("An error occurred while saving notes: " + error.message);
      });
  };
  const back =()=>{
    navigate('/home')
  }
  
  return (
    <>
      <Navup />
      <div className='container scrollable-container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-12 col-lg-12 p-2 mt-5'>
          {/* back and save portation */}
          <div className='back_save d-flex mb-2 justify-content-between'>
          <div> <AiOutlineArrowLeft onClick={back}/> <span className='ms-1 back_save_font'> Notes </span></div>
          <div className='me-2 save'><MdDone onClick={update}></MdDone></div>
          </div>
            <div className='text-center'>
              <input onChange={(e)=>{settitle(e.target.value);
              settitleError('')}}
              value={title} className='input-field-n ' type='text' placeholder='Title' style={{ width: "100%" }} />
            </div>
            {titleError && (
              <p style={{ color: 'red', marginTop: '5px' }}>{titleError}</p>
            )}
            <div className=''>
              <textarea
                className="textarea_field mt-1"
                placeholder='Write something here'
                rows={minRows}
                onChange={(e) => setText(e.target.value)}
                onInput={handleTextareaInput}
                value={text}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
