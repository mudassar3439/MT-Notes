import React,{ createContext,useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import {getFirestore ,collection,addDoc,getDocs,getDoc,where,query,doc, deleteDoc,updateDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBszDz6ZTV3S09LboRMSujQzPg1ODAImVU",
  authDomain: "mt-note.firebaseapp.com",
  projectId: "mt-note",
  storageBucket: "mt-note.appspot.com",
  messagingSenderId: "395792716262",
  appId: "1:395792716262:web:6c7b6791e821f787bec627",
  measurementId: "G-2HT6BEEGYT"
};


  export const App = initializeApp(firebaseConfig);
  const context=createContext(null);
  

//   instance
const Auth=getAuth(App);
const GoogleProvider =new GoogleAuthProvider(App);
const firestore=getFirestore(App);
const storage =getStorage(App);

// useContext Hook
export const useFirebase=()=>useContext(context)


// Provider  

export const Provider=(props)=>{

       // state Hook
       const [user, setuser] = useState();
       

       // For checking if the user is logged in
       useEffect(() => {
         const storedUser = localStorage.getItem('user');
         if (storedUser) {
           setuser(JSON.parse(storedUser));
         } else {
           setuser(null);
         }
         onAuthStateChanged(Auth, (user) => {
           if (user) {
             setuser(user);
             localStorage.setItem('user', JSON.stringify(user));
           } else {
             setuser(null);
             localStorage.removeItem('user');
           }
         });
       }, []);
       
 // Variable
   const logedin = user ? true : false;
   const notloged = user ? false : true;
       


// Signup With Email And Password
const Signup = (email, password) => {
  createUserWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      alert('Account Registered Successfully');
    })
    .catch((error) => {
      console.error('Error signing up:', error);
      alert('Account Registration Failed. Please try again.');
    });
};
    // Signin With Email And Password
 const Signin=(email,password)=>{
    signInWithEmailAndPassword(Auth,email,password)
    .then((value)=>alert('Log-in Successfully'))
    .catch((error)=>alert('Error - Log-in Failed. try again!')) 
 }
 const google =()=>{
  signInWithPopup(Auth,GoogleProvider)
  .then((value)=>alert("Log-in Successfully"));
 }




  




const AddNotes = async (title, text) => {
  const collectionRef = collection(firestore, 'Notes');

  // Get the current date and time
  const currentDate = new Date();

  const result = await addDoc(collectionRef, {
    title,
    text,
    userId: user.uid,
    createdAt: currentDate, // Add a field for the creation date and time
  });

  return result;
};


// const getNotes=()=>{
//   return getDocs(collection(firestore,'Notes'))
// }
const getNotes=async(userId)=>{
  const collectionRef=collection(firestore,'Notes');
  const q=query(collectionRef,where('userId','==',userId))
  const result=await getDocs(q);
  return result;
}


// Getting Single Notes
const SNotes = async (id) => {
  const docRef = doc(firestore, 'Notes', id);
  const result = await getDoc(docRef);
  return result;
};

const deleteNote = async (productId) => {
  try {
    await deleteDoc(doc(firestore, 'Notes', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
const updateNote = async (noteId, updatedNote) => {
  try {
    const noteRef = doc(firestore, 'Notes', noteId);
    const currentDate = new Date();

    // Update the note with the new data
    await updateDoc(noteRef, {
      title: updatedNote.title,
      text: updatedNote.text,
      updatedAt: currentDate, // Add a field for the update date and time
    });

    return "Note updated successfully";
  } catch (error) {
    console.error("An error occurred while updating the note: " + error.message);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};
  
//  For Counter 
const NotesCounter = async (userId) => {
  try {
    const audiosCollectionRef = collection(firestore, 'Notes');
    const q = query(audiosCollectionRef, where('userId', '==', userId));
    const audiosSnapshot = await getDocs(q);
    return audiosSnapshot.size;
  } catch (error) {
    console.error('Error fetching audios count:', error);
    throw error;
  }
};






// Images*******************************************************************************
   //Function For Add product at Firetore 
   const AddImages = async (pic) => {
    const imgRef = ref(storage, `uploads/images/${Date.now()}${pic.name}`);
    const result = await uploadBytes(imgRef, pic);
  
    return addDoc(collection(firestore, 'Images'), {
     
      imageURL: result.ref.fullPath,
      userId: user.uid,
      originalName: pic.name,
    })
    
  };
    
  // Getting All Images From Firestore 
    const AllImages=async(userId)=>{
      const collectionRef=collection(firestore,'Images');
      const q=query(collectionRef,where('userId','==',userId))
      const result=await getDocs(q);
      return result;
    }

  //Function For Getting Images Path from Firebase Storage 
    const getimgURL=(path)=>{
      return getDownloadURL(ref(storage,path))
    }
 // Function For getting Single Image from firestore for Deatail 
    const SingelImage = async (id) => {
      const docRef = doc(firestore, 'Images', id);
      const result = await getDoc(docRef);
      return result;
    };


  // For the Deletion of a Images
  const deleteImage = async (productId) => {
    try {
      await deleteDoc(doc(firestore, 'Images', productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  
//  For Counter 
const imagesCounter = async (userId) => {
  try {
    const audiosCollectionRef = collection(firestore, 'Images');
    const q = query(audiosCollectionRef, where('userId', '==', userId));
    const audiosSnapshot = await getDocs(q);
    return audiosSnapshot.size;
  } catch (error) {
    console.error('Error fetching audios count:', error);
    throw error;
  }
};

// Videos*************************************************************************

// Function for Add videos in Firestore 

const AddVideos = async (video) => {
  const videoRef = ref(storage, `uploads/videos/${Date.now()}${video.name}`);
  const result = await uploadBytes(videoRef, video);

  return addDoc(collection(firestore, 'Videos'), {
    videoURL: result.ref.fullPath,
    userId: user.uid,
    originalName: video.name,
  });
};


// Getting All Videos From Firestore 

const AllVideos=async(userId)=>{
  const collectionRef=collection(firestore,'Videos');
  const q=query(collectionRef,where('userId','==',userId))
  const result=await getDocs(q);
  return result;
}

// Function For Getting Video URL
const getVideoURL = (path) => {
  return getDownloadURL(ref(storage, path));
};

// function for Getting Singel Video Form Firestore for details  
const SingelVideo = async (id) => {
  const docRef = doc(firestore, 'Videos', id);
  const result = await getDoc(docRef);
  return result;
};

// For the Deletion of a Images
const deletevideo = async (productId) => {
  try {
    await deleteDoc(doc(firestore, 'Videos', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

  const  videosCounter = async (userId) => {
    try {
      const audiosCollectionRef = collection(firestore, 'Videos');
      const q = query(audiosCollectionRef, where('userId', '==', userId));
      const audiosSnapshot = await getDocs(q);
      return audiosSnapshot.size;
    } catch (error) {
      console.error('Error fetching audios count:', error);
      throw error;
    }
  };





// Audios*************************************************************************


// Function for Add Audios in Firestore 

const AddAudios = async (audio) => {
  const videoRef = ref(storage, `uploads/Audios/${Date.now()}${audio.name}`);
  const result = await uploadBytes(videoRef, audio);

  return addDoc(collection(firestore, 'Audios'), {
    videoURL: result.ref.fullPath,
    userId: user.uid,
    originalName: audio.name,
  });
};


// Getting All Audios From Firestore 
const AllAudios=async(userId)=>{
  const collectionRef=collection(firestore,'Audios');
  const q=query(collectionRef,where('userId','==',userId))
  const result=await getDocs(q);
  return result;
}
// Function For Getting Audio URL
const getAudioURL = (path) => {
  return getDownloadURL(ref(storage, path));
};

// For the Deletion of a Images
const deleteAudio = async (productId) => {
  try {
    await deleteDoc(doc(firestore, 'Audios', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// import { collection, getDocs, query, where } from 'firebase/firestore';

const AudiosCounter = async (userId) => {
  try {
    const audiosCollectionRef = collection(firestore, 'Audios');
    const q = query(audiosCollectionRef, where('userId', '==', userId));
    const audiosSnapshot = await getDocs(q);
    return audiosSnapshot.size;
  } catch (error) {
    console.error('Error fetching audios count:', error);
    throw error;
  }
};
//Documents***************************************************************************
const AddDocs = async (docs) => {
  const videoRef = ref(storage, `uploads/Documents/${Date.now()}${docs.name}`);
  const result = await uploadBytes(videoRef, docs);

  return addDoc(collection(firestore, 'Documents'), {
    videoURL: result.ref.fullPath,
    userId: user.uid,
    originalName: docs.name,
  });
};

const AllDocs=async(userId)=>{
  const collectionRef=collection(firestore,'Documents');
  const q=query(collectionRef,where('userId','==',userId))
  const result=await getDocs(q);
  return result;
}
const getDocURL = (path) => {
  return getDownloadURL(ref(storage, path));
};


const deleteDocument = async (productId) => {
  try {
    await deleteDoc(doc(firestore, 'Documents', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};



const DocCounter = async (userId) => {
  try {
    const audiosCollectionRef = collection(firestore, 'Documents');
    const q = query(audiosCollectionRef, where('userId', '==', userId));
    const audiosSnapshot = await getDocs(q);
    return audiosSnapshot.size;
  } catch (error) {
    console.error('Error fetching audios count:', error);
    throw error;
  }
};

//Profile***************************************************************************
const Addprofile = async (pic, FirstName, LastName) => {
  const userId = user.uid;
  let isProfileUpdated = false;

  // Check if the user's profile already exists
  const profileQuery = query(collection(firestore, 'Profile'), where('userId', '==', userId));
  const profileQuerySnapshot = await getDocs(profileQuery);

  if (!profileQuerySnapshot.empty) {
    // User's profile exists, so update it
    const profileDoc = profileQuerySnapshot.docs[0];
    const profileId = profileDoc.id;

    if (pic) {
      // Only upload a new profile picture if 'pic' is defined
      const picRef = ref(storage, `uploads/profile/${Date.now()}${pic.name}`);
      const result = await uploadBytes(picRef, pic);

      // Update the existing profile document in Firestore with the new picture
      await updateDoc(doc(firestore, 'Profile', profileId), {
        FirstName,
        LastName,
        imageURL: result.ref.fullPath,
        userId,
        userEmail: user.email,
      });
    } else {
      // Update the existing profile document in Firestore without changing the picture
      await updateDoc(doc(firestore, 'Profile', profileId), {
        FirstName,
        LastName,
        userId,
        userEmail: user.email,
      });
    }

    isProfileUpdated = true;
  } else {
    // User's profile doesn't exist, so create a new profile
    if (pic) {
      const picRef = ref(storage, `uploads/profile/${Date.now()}${pic.name}`);
      const result = await uploadBytes(picRef, pic);

      await addDoc(collection(firestore, 'Profile'), {
        FirstName,
        LastName,
        imageURL: result.ref.fullPath,
        userId,
        userEmail: user.email,
      });
    } else {
      // Create a new profile without a picture
      await addDoc(collection(firestore, 'Profile'), {
        FirstName,
        LastName,
        userId,
        userEmail: user.email,
      });
    }

    isProfileUpdated = false; // Set to false if a new profile is created
  }

  if (isProfileUpdated) {
    alert("Profile Updated");
  } else {
    alert("Profile Created");
  }
};


const getprofile=async(userId)=>{
  console.log(userId)
  const collectionRef=collection(firestore,'Profile');
  const q=query(collectionRef,where('userId','==',userId))
  const result=await getDocs(q);
  console.log(result)
  return result;
}


















   return(
    <>
        <context.Provider value={{
          Signup,
          Signin,
          google,
          logedin,
          notloged,
          storage,
  
  // Notes***********************************************************************
        AddNotes,
        getNotes,
        SNotes,
        updateNote,
        deleteNote,
        NotesCounter,
     // Images*************************************************************************
     AddImages,
          AllImages,
          getimgURL,
          SingelImage,
          deleteImage,
          imagesCounter,
  // Videos*************************************************************************
          AddVideos,
          AllVideos,
          getVideoURL,
          SingelVideo,
          deletevideo,
          videosCounter,
  //Audio***************************************************************************
         AddAudios,
         AllAudios,
         getAudioURL,
         deleteAudio,
         AudiosCounter,
  
  //Documents***************************************************************************
        AddDocs,
        AllDocs,
        getDocURL,
        deleteDocument,
        DocCounter,
  // Profile***********************************************************************
        Addprofile,
        getprofile,

          user,
          
          }}>
            {props.children}
        </context.Provider>
    </>
   )
  }