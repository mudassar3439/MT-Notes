import React,{useState,useEffect} from 'react'
import BNav from '../Components/BNav';
import Navup from '../Components/Navup';
import { useFirebase } from '../Context/Firebase';
import NotesBox from '../Components/NotesBox';
import Button from '../Components/Button';
import Typewritertext from '../Components/Typewritertext';

function Home() {
   
  const firebase=useFirebase()
  const [notes, setnotes] = useState([]);
  const [show,setshow]=useState()
  const [NotesCounts, setNotesCounts] = useState(0);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [backonline,setbackonline]=useState();



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
      const uid = firebase.user?.uid;
      if (uid) {
        
        firebase.getNotes(uid)
          .then((products) => {
            setnotes(products.docs);
           
            console.log(products); // Perform any operations with the updated products state here
          })
          
      }
      
    }}, [firebase,isOnline]);

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
    


    const Showdata=()=>{
      setshow(!show);
    }
   
  return (
    <>
    <Navup/>
     

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
    
    <div  className='container mt-5 mb-5 scrollable-Home '>
    <div className='row d-flex'>
    <span onClick={Showdata}>
    <Button></Button>
    </span>
    
    <div>
    {show&&(
          <>
          <div className='showdata  ps-3 pe-3 text-center'>
          <div className='d-flex justify-content-between'><h4 className='ms-5 me-3'>Notes Info </h4> <button onClick={Showdata} type="button" class="btn-close  info-btn mt-1"  aria-label="Close"></button></div>
           <div> <h5>You Have {NotesCounts} Notes</h5></div>
          </div>
          </>
         )
        
         }
    </div>
    
    
    {notes.length > 0 ?(notes.map((product) => (
              <NotesBox  key={product.id} id={product.id} {...product.data()} />
            ))):(
              <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                <div className="text-center " style={{color:"rgba(0,0,0,0.3)"}}>
                  <div className="container mt-3" id="header">
                    <div className="row">
                      <div className="col-md-12 col-12 mx-auto">
                        <div className="mb-5 p-2">
                          <div className="p-2 mt-2 mb-1 col-md-12 col-lg-12 col-xl-12  d-flex justify-content-between">
                            <div>
                              <h2 className="mt-2 ms-2">Add Your Notes</h2>
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
      
    </div>
     
    <BNav/>
    </>
  )
}

export default Home