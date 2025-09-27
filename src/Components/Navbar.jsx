import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/Appcontext';



const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const {token,setToken,user} = useContext(AppContext);

    const logout = () => {
      setToken(false);
      sessionStorage.removeItem('token')
    }


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
    <h1 className='text-2xl cursor-pointer'>Programming Academy</h1>
    <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/courses'>
            <li className='py-1'>All Courses</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </NavLink>
    </ul>
    <div className='flex items-center gap-4'>
      {
        token
        ?<div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 rounded-full' src={user?.image || assets.profile_pic} alt="" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="" /> 
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/my-enrollments')} className='hover:text-black cursor-pointer'>My Enrollments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
        </div>
        :  <button onClick={()=>navigate('/login')} className='bg-[#5f6fff] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>Create Account</button>
      }
      <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
      <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
       <div className='flex items-center justify-between px-5 py-6'>
        <h3 className='text-black font-semibold'>Programming-Academy</h3>
        <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
       </div>
       <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
        <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setShowMenu(false)} to="/">Home</NavLink>
         <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setShowMenu(false)} to="/courses">All Courses</NavLink>
          <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setShowMenu(false)} to="/about">About</NavLink>
          <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setShowMenu(false)} to="/contact">Contact</NavLink>
          {token ? (
    <>
      <NavLink
        className="px-4 py-2 rounded-full inline-block"
        onClick={() => {
          setShowMenu(false);
          navigate("/my-profile");
        }}
        to="/my-profile"
      >
        My Profile
      </NavLink>
      <NavLink
        className="px-4 py-2 rounded-full inline-block"
        onClick={() => {
          setShowMenu(false);
          navigate("/my-enrollments");
        }}
        to="/my-enrollments"
      >
        My Enrollments
      </NavLink>
      <button
        onClick={() => {
          logout();
          setShowMenu(false);
        }}
        className="px-4 py-2 rounded-full inline-block text-red-600"
      >
        Logout
      </button>
    </>
  ) : (
    <button
      onClick={() => {
        setShowMenu(false);
        navigate("/login");
      }}
      className="px-4 py-2 rounded-full inline-block bg-[#5f6fff] text-white"
    >
      Create Account
    </button>
  )}
       </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
