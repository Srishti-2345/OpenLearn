import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import CyberpunkCourses from './components/CyberpunkCourses' 
import CyberpunkHome from './components/CyberpunkHome' 
import Sidebar from './components/Sidebar';
import WelcomeSection from './components/WelcomeSection';
import CourseCard from './components/CourseCard';
import ProgressOverview from './components/ProgressOverview';
import Certificates from './components/Certificates';
import Deadlines from './components/Deadlines';
import RecentActivity from './components/RecentActivity';


function App() {
  
const courses = [
    {
      title: 'Advanced React Development',
      instructor: 'John Smith',
      progress: 75,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      title: 'Full Stack Web Development',
      instructor: 'Emily Johnson',
      progress: 45,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      title: 'Python for Data Science',
      instructor: 'Michael Chen',
      progress: 60,
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      title: 'UI/UX Design Principles',
      instructor: 'Sarah Williams',
      progress: 30,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      title: 'Mobile App Development',
      instructor: 'David Brown',
      progress: 85,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    }
  ];
  return (
    <>
    <div className=" top-0 left-0 w-screen z-50">
      <Navbar />
       {/* <CyberpunkCourses></CyberpunkCourses> */}   
       {/* <CyberpunkHome className='fixed top-0 left-0 w-screen z-50'></CyberpunkHome> */}
       

  
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <WelcomeSection />

          <ProgressOverview />

          <section className="courses-section">
            <h2 className="section-title">My Enrolled Courses</h2>
            <div className="courses-grid">
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </section>

          <div className="dashboard-grid">
            <div className="grid-left">
              <Certificates />
              <RecentActivity />
            </div>
            <div className="grid-right">
              <Deadlines />
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
      
    </>
  )
}

export default App
