import { Route,Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Animation.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import Singup from './Pages/Signup'
import Signin from './Pages/Signin'
import Home from './Pages/Home';
import Add from './Pages/Add';
import Account from './Pages/Account';
import CompleteProfile from './Components/CompleteProfile';
import Pupdate from './Components/Pupdate';
import DisplayNotes from './Pages/DisplayNotes';



import Images from './Gallery pages/Images'
import ImgDetails from './Gallery pages/ImgDetails'
import Videos from './Gallery pages/Videos'
import VideoDetails from './Gallery pages/VideoDetails'
import Audio from './Gallery pages/Audio'
import AudioDelete from './Components/AudioDelete';
import Documents from './Gallery pages/Documents'
import DocDelete from './Components/DocDelete';

function App() {
  return (
   <>
   
    <Routes>
    <Route exact='true' path="/" element={<Singup/>}/>
    <Route exact='true' path="/Signin" element={<Signin/>}/>
    <Route path="/Account" element={<Account/>}/>
    <Route path="/user-Profile-Complete" element={<CompleteProfile/>}/>
    <Route path="/user-Profile_update" element={<Pupdate/>}/>
    <Route exact='true' path="/home" element={<Home/>}/>
    <Route exact='true' path="/new_notes" element={<Add/>}/>
    <Route exact='true' path="/Notes/:productId" element={<DisplayNotes/>}/>
  


    <Route exact='true' path="/Images" element={<Images/>}/>
      <Route path="/image/detail/:productId" element={<ImgDetails/>}/>
      <Route exact='true' path="/Videos" element={<Videos/>}/>
      <Route path="/video/detail/:productId" element={<VideoDetails/>}/>
      <Route exact='true' path="/Audio" element={<Audio/>}/>
      <Route path="/Audio/delete/:productId" element={<AudioDelete/>}/>
      <Route path="/Documents" element={<Documents/>}/>
      <Route path="/Document/delete/:productId" element={<DocDelete/>}/>
 </Routes>
   </>
  );
}

export default App;
