import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { authService } from '../services/services.auth';
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import ThemeController from './ThemeController';



const Navbar = () => {


  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const auth = useAuth()

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const Logout = (e: any) => {
    e.preventDefault()
    auth?.logout();
    navigate("/login")
  }

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="top-0 absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className={`block h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img src="https://www.siatt.com.br/siatt/wp-content/uploads/2018/01/siatt-logo.png" className='h-10 rounded-lg' alt="Your Company Logo" />
              </Link>
            </div>
            <span className='text-white flex justify-center items-center ml-6 text-2xl'>Connect</span>


            {/* <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Calendário</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Equipe</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dúvidas</a>
                {auth?.user?.user && (
                  <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</a>
                )}
                {auth?.token && (
                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={(e) => Logout(e)}>Sair</button>
                )}
              </div>

            </div> */}


          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <ThemeController/>

            {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> */}
              {auth?.token && (
                
                <div className="relative ml-3">
              <div>
                <button type="button" onClick={toggleProfileMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="./Profile-Avatar.png" alt="User Profile"/>
                  
                </button>
                
              </div>

              <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileMenuOpen ? 'block' : 'hidden'} `} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Seu perfil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Configurações</a> */}

                <div className="flex space-x-4">
                {auth?.user?.user && (
                  <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</a>
                )}
                {auth?.token && (
                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={(e) => Logout(e)}>Sair</button>
                )}
              </div>
              </div>
            </div> 
              )}
          </div>

              

        </div>
      </div>


      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Calendário</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Equipe</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Dúvidas</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Sobre</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

