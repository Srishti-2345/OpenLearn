import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import CyberpunkCourses from './components/CyberpunkCourses' 
import CyberpunkHome from './components/CyberpunkHome' 


function App() {
  

  return (
    <>
    <div className="fixed top-0 left-0 w-screen z-50">
      <Navbar />
       {/* <CyberpunkCourses></CyberpunkCourses> */}
       <CyberpunkHome className='fixed top-0 left-0 w-screen z-50'></CyberpunkHome>
    </div>
      
    </>
  )
}

export default App
