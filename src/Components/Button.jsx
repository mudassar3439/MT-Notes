import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useFirebase } from '../Context/Firebase';

const Button = () => {
  const firebase = useFirebase();
  const [NotesCounts, setNotesCounts] = useState(0);

  // Notes Counter ***********************************************************************
  useEffect(() => {
    const Counter = async () => {
      try {
        const uid = firebase.user?.uid;
        if (uid) {
          const count = await firebase.NotesCounter(uid);
          setNotesCounts(count);
        }
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    Counter();
  }, [firebase]);

  return (
    <Draggable>
      <button className='btn btn-btn-outline-primary rounded-pill drag-button'>{NotesCounts}</button>
    </Draggable>
  );
};

export default Button;
