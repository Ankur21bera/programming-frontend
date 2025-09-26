import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Course from './Pages/Course';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MyProfile from './Pages/MyProfile';
import Enrollment from './Pages/Enrollment';
import Navbar from './Components/Navbar';
import { Toaster } from "react-hot-toast";
import Footer from './Components/Footer';
import Forgotpassword from './Pages/Forgotpassword';
import StudentEnrollment from './Pages/StudentEnrollment';







const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
     <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Course/>}/>
        <Route path='/courses/:speciality' element={<Course/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
         <Route path='/my-enrollments' element={<StudentEnrollment/>}/>
        <Route path='/enrollment/:couId' element={<Enrollment/>}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
