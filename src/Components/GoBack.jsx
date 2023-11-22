import React from 'react'
import { IoIosHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

function GoBack() {
  const navigate=useNavigate()
  const Gallery=()=>{
    navigate("/home")
  }
  return (
    <div>
    
    <div className=''>
    <IoIosHome onClick={Gallery} className='mt-5 Home-button rounded-pill '></IoIosHome>

    </div>
    
        
    </div>
  )
}

export default GoBack