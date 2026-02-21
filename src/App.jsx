import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CyberpunkCourses from './components/CyberpunkCourses' 
import CyberpunkHome from './components/CyberpunkHome' 
import CyberpunkCourseDetails from './components/CyberpunkCourseDetails'
import Dashboard from './pages/Dashboard'
import CourseEditor from './pages/CourseEditor'


function App() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'dashboard' | 'editor'
  const [courses, setCourses] = useState([])
  const [editorCourse, setEditorCourse] = useState(null)

  return (
    <>
      <Navbar
        onCoursesClick={() => { setDetailsOpen(false); setView('courses'); }}
        onContributeClick={() => setView('dashboard')}
      />
      <main className="pt-16">
        {view === 'editor' ? (
          <CourseEditor
            course={editorCourse}
            setCourse={(updated) => {
              setEditorCourse(updated);
              setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            }}
            goBack={() => setView('dashboard')}
          />
        ) : view === 'dashboard' ? (
          <Dashboard
            courses={courses}
            openCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); setView('home'); }}
            createNew={() => {
              const newCourse = {
                id: Date.now(),
                title: 'Untitled Course',
                category: '',
                level: 'Beginner',
                price: '',
                isPublic: true,
                thumbnail: null,
                instructor: 'You',
                editable: true,
                sections: [{ id: Date.now() + 1, title: 'New Section', lessons: [] }]
              };

              setCourses((prev) => [...prev, newCourse]);
              setEditorCourse(newCourse);
              setView('editor');
            }}
            editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
          />
        ) : view === 'courses' ? (
          <>
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
              editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
            />
          </>
        ) : (
          <CyberpunkHome />
        )}
      </main>
    </>
  )
}

export default App
// import React, { useState } from "react";
// import Dashboard from "./pages/Dashboard";
// import CourseEditor from "./pages/CourseEditor";

// export default function App() {
//   const [page, setPage] = useState("dashboard");

//   const [courses, setCourses] = useState([]);

//   const [currentCourse, setCurrentCourse] = useState(null);

//   return (
//     <div>
//       {page === "dashboard" && (
//         <Dashboard
//           courses={courses}
//           setCourses={setCourses}
//           openCourse={(course) => {
//             setCurrentCourse(course);
//             setPage("editor");
//           }}
//           createNew={() => {
//             const newCourse = {
//               id: Date.now(),
//               title: "",
//               category: "",
//               level: "Beginner",
//               price: "",
//               isPublic: true,
//               thumbnail: null,
//               sections: []
//             };

//             setCourses([...courses, newCourse]);
//             setCurrentCourse(newCourse);
//             setPage("editor");
//           }}
//         />
//       )}

//       {page === "editor" && currentCourse && (
//         <CourseEditor
//           course={currentCourse}
//           setCourse={(updated) => {
//             setCurrentCourse(updated);

//             // update in list
//             setCourses((prev) =>
//               prev.map((c) => (c.id === updated.id ? updated : c))
//             );
//           }}
//           goBack={() => setPage("dashboard")}
//         />
//       )}
//     </div>
//   );
// }
// import { useState } from "react";
// import DescriptionPanel from "./components/DescriptionPanel";
// import EditorPanel from "./components/EditorPanel";
// import ResultPanel from "./components/ResultPanel";

// export default function App() {
//   const [code, setCode] = useState(`// Write Java code here
// class Solution {
//   public int[] twoSum(int[] nums, int target) {
//     // your code
//     return new int[]{0,1};
//   }
// }`);

//   const [result, setResult] = useState(null);
//   const [showResult, setShowResult] = useState(false);

//   // SAMPLE + HIDDEN TESTS
//   const sampleTests = [
//     { input: "[2,7,11,15],9", output: "[0,1]" },
//   ];

//   const hiddenTests = [
//     { input: "[3,2,4],6", output: "[1,2]" },
//     { input: "[3,3],6", output: "[0,1]" },
//   ];

//   function normalizeOutput(output) {
//     return output.replace(/\s+/g, "").trim();
//   }

//   function checkAnswer(user, expected) {
//     return normalizeOutput(user) === normalizeOutput(expected);
//   }

//   // 🔥 Simulated execution (replace with backend later)
//   function simulateRun(userCode, input) {
//     // VERY basic simulation for Two Sum
//     const [arrStr, targetStr] = input.split(",");
//     const nums = JSON.parse(arrStr);
//     const target = Number(targetStr);

//     const map = {};
//     for (let i = 0; i < nums.length; i++) {
//       const diff = target - nums[i];
//       if (map[diff] !== undefined) {
//         return `[${map[diff]},${i}]`;
//       }
//       map[nums[i]] = i;
//     }
//     return "[]";
//   }

//   const handleRun = () => {
//     const output = simulateRun(code, sampleTests[0].input);
//     setResult({
//       type: "run",
//       output,
//       expected: sampleTests[0].output,
//       verdict: checkAnswer(output, sampleTests[0].output)
//         ? "Accepted"
//         : "Wrong Answer",
//     });
//     setShowResult(true);
//   };

//   const handleSubmit = () => {
//     let verdict = "Accepted";

//     // check sample
//     for (let t of sampleTests) {
//       const out = simulateRun(code, t.input);
//       if (!checkAnswer(out, t.output)) {
//         verdict = "Wrong Answer (Sample Failed)";
//         setResult({ type: "submit", verdict, output: out, expected: t.output });
//         setShowResult(true);
//         return;
//       }
//     }

//     // check hidden
//     for (let t of hiddenTests) {
//       const out = simulateRun(code, t.input);
//       if (!checkAnswer(out, t.output)) {
//         verdict = "Wrong Answer (Hidden Failed)";
//         setResult({ type: "submit", verdict, output: out, expected: t.output });
//         setShowResult(true);
//         return;
//       }
//     }

//     setResult({ type: "submit", verdict: "Accepted 🎉" });
//     setShowResult(true);
//   };

//   return (
//     <div className="w-screen h-screen flex bg-[#0f172a] text-white">
//       {/* LEFT SIDE */}
//       <div
//         className={`transition-all duration-300 ${
//           showResult ? "w-1/2 opacity-40" : "w-1/2"
//         }`}
//       >
//         <DescriptionPanel />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-1/2 flex flex-col border-l border-gray-700">
//         <EditorPanel
//           code={code}
//           setCode={setCode}
//           onRun={handleRun}
//           onSubmit={handleSubmit}
//         />
//         {showResult && <ResultPanel result={result} />}
//       </div>
//     </div>
//   );
// }