import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typewritertext from '../Components/Typewritertext';
import {useFirebase} from '../Context/Firebase';




function Signup() {

  // Firebase use context Hook 
const firebase=useFirebase();

// Use Navigate Hook
const navigate=useNavigate()

// state Hooks
const [email,setemail]=useState(); 
const [password,setpassword]=useState();
const [confirompassword,setconfirompassword]=useState();
const [passwordMatchError, setPasswordMatchError] = useState(false);
const [show ,setshow]=useState();
const [isOnline, setIsOnline] = useState(window.navigator.onLine);
const [backonline,setbackonline]=useState();
const [data, setdata] = useState();


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

// useEffect(()=>{
//   if(firebase.logedin){
//    navigate('/home')
//   }
  
//  },[firebase,navigate]); 
 
// For Firebase Sign-in Function
const Click = () => {
  if (password === confirompassword) {
    firebase.Signup(email, password);
  } else {
    // Passwords do not match, show an error
    setPasswordMatchError(true);
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
        if(doc===null || doc === undefined)
        {
          navigate('/user-profile-complete')
        }
        else {
          const fetchedData = doc.data();
          setdata(fetchedData);
          navigate('/home');
        }
        
      }
    })
    .catch((error) => {
      console.error('Error retrieving data:', error);
    });
  }
}, [firebase,navigate]);


// For show and Hide Password
const Hide=()=>{
  setshow(!show)
}
// For Signin with Google

// for navgiation 
const login=()=>{
  navigate("/Signin")

}
  return (

    <>
    <div className='conatiner-fluid '>
      <div className='row justify-content-center m-3'>
        <div className='col-12 col-md-8 col-xl-6 col-xxl-6 sign-box'>
        <div className=' mt-5 row justify-content-center'>
          <div className='col-12 col-md-12 col-lg-12 col-xl-12 col-xx-12'>
            <div className='d-flex justify-content-between'style={{width:"100%",marginTop:"50px"}}>
              <div className='text-center rigister-box'><h1>Register</h1></div>
              <div className='text-center' onClick={login} style={{width:"50%"}}><h1>Log-in</h1></div>
              

            </div>
          </div>
        </div>

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
          <h5><Typewritertext text=" No Internet Connection "/></h5>
          </div>
          </div>
          </div>
          </div>
        )}
    </div>
    </div>
<div className='scrollable-container'>
      
     {/* Container box  */}
<div className="container mt-3 "id='header'>





<div className="row">
 <div className="col-md-12 col-xl-12 col-lg-12 col-xxl-12 col-12 mx-auto">
    {/* Input Form  */}
   <form  className='mb-5 '>

    {/* For Email Input Field */}
        <div className="mb-3 ">
        <input  className="text-center input-field form-control" id="exampleFormControlInput0" placeholder="Wellcome" disabled/>
        </div>

    {/* For Email Input Field */}
        <div className="mb-3 ">
        <input onChange={e=>setemail(e.target.value)} value={email} type="email" className="text-center input-field form-control" id="exampleFormControlInput2" placeholder="E-mail"/>
        </div>

    {/* For Password Input Field */}
        <div className="mb-3 ">
        <input onChange={e=>setpassword(e.target.value)} value={password} type={show? 'text' : 'password'} className=" text-center input-field form-control" id="exampleFormControlInput1" placeholder="Password"/>   
        </div>
        <div className="mb-3 ">
        <input onChange={e=>setconfirompassword(e.target.value)} value={confirompassword} type={show? 'text' : 'password'} className=" text-center input-field form-control" id="exampleFormControlInput1" placeholder="Confirom Password"/>   
        </div>
        {passwordMatchError && (
                        <div className="text-danger mt-1 ms-1">
                        Passwords not matched .
                        </div>
                      )}
    {/* For show and Hide Password */}
       <div className='ms-3 '>
       <label className=''>
       <input type='checkbox' className='me-1' onChange={Hide}/>
            Show Password
       </label>
       </div>

    {/* For Sign in Button */}
       <div className='text-center'>
       <button  className="btn submit-button  btn-primary mb-3 mt-2" type="button" onClick={Click}>Rigister Account</button>
       </div>

 



   </form>
            
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

export default Signup