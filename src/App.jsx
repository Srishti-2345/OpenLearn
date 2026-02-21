import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import CyberpunkCourses from './components/CyberpunkCourses' 
import CyberpunkHome from './components/CyberpunkHome' 
import CyberpunkCourseDetails from './components/CyberpunkCourseDetails'


function App() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide">
          <CyberpunkCourses onSelectCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); }} />
        </div>

        {detailsOpen && (
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setDetailsOpen(false)} />
        )}

        <CyberpunkCourseDetails
          open={detailsOpen}
          course={selectedCourse}
          onClose={() => setDetailsOpen(false)}
        />
      </main>
    </>
  )
}

export default App
