import React,{useState,useEffect} from 'react'
import { useFirebase } from '../Context/Firebase';
import logo from '../Media/logo.png';



function Navup() {
    const firebase=useFirebase()
    const [data, setData] = useState();
    const [show,setshow]=useState()


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




      const Showdata=()=>{
        setshow(!show);
      }

      // fetch profile pic URL

  return (
    <>
    <div className='d-flex box-up nav-border '>
         
         <div className='ms-1'>
         <img src={logo} alt='' style={{height:'30px',width:"40px"}}  />
        
         </div>

         
        
         <div className='ms-4'>
         <h5 onDoubleClick={Showdata} className='name mt-1'>{data && data.FirstName} {data && data.LastName}</h5>
         <div>
         
        </div>  </div>
        
    </div>
    {show&&(
          <>
          <div className='showdata  ps-3 pe-3 text-center'>
          <div className='d-flex justify-content-between'><h4 className='ms-5'>Developer Info</h4> <button onClick={Showdata} type="button" class="btn-close info-btn mt-1"  aria-label="Close"></button></div>
          <div className='d-flex'><h5>Name: </h5><h6 className='ms-1'> Mudassar Mobeen</h6></div>
          <div className='d-flex'><h5>Title: </h5><h6 className='ms-1'>Front-end Web Developer</h6></div>
          <div className='d-flex'><h5>Email: </h5><h6 className='ms-1'><a href="mailto:mudassar3439ml@gmail.com?">mudassar3439ml@gmail.com</a>
          </h6></div>

          </div>
          </>
         )
        
         }
    </>
  )
}

export default Navup