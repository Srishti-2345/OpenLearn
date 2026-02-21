
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import CourseSection from "./CourseSection";
/* ---------- AUTO GENERATE 50 COURSES ---------- */
const gradients = [
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
];

const titles = [
  "Python for Beginners",
  "Data Structures & Algorithms",
  "Web Development Masterclass",
  "Machine Learning Bootcamp",
  "Cyber Security Essentials",
  "Blockchain & Web3",
  "UI/UX Design Mastery",
  "Cloud Computing AWS",
  "DevOps Engineering",
  "Mobile App Development",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const instructors = [
  "Dr. Sarah Johnson",
  "Prof. Michael Chen",
  "Emily Davis",
  "Andrew Ng",
  "Kevin Mitnick",
  "Vitalik Buterin",
  "Don Norman",
  "Jeff Barr",
];

const allCourses = Array.from({ length: 50 }, (_, i) => ({
  title: `${titles[i % titles.length]} ${i + 1}`,
  level: levels[i % levels.length],
  progress: Math.floor(Math.random() * 100),
  students: (1000 + Math.floor(Math.random() * 4000)).toLocaleString(),
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  weeks: `${6 + Math.floor(Math.random() * 10)} weeks`,
  instructor: instructors[i % instructors.length],
  gradient: gradients[i % gradients.length],
}));

/* ---------- SECTIONS ---------- */
const trending = allCourses.slice(0, 10);
const niche = allCourses.filter(c => c.level === "Advanced").slice(0, 10);
const saved = allCourses.slice(10, 20);

/* ---------- COURSE CARD SECTION ---------- */


const Sidebar = () => {
  const [difficulty, setDifficulty] = useState({
    Beginner: true,
    Intermediate: false,
    Advanced: true,
  });
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [duration, setDuration] = useState("0-2 Hours");
  const [rating, setRating] = useState(4);

  const toggleDifficulty = (level) => {
    setDifficulty((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  return (
    <div className="w-80 bg-[#0d0d0d] text-white p-6 space-y-6 border-r border-[#2c2c2c] h-screen mt-15 overflow-y-auto scrollbar-hide fixed left-0 top-0">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full py-2 pl-10 pr-4 bg-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-2.5 text-[#00ffff]" size={20} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold tracking-wide">Filters</h2>
        <button className="text-[#00ffff] font-semibold text-sm">CLEAR ALL</button>
      </div>

      {/* Difficulty Level */}
      <div>
        <p className="text-[#888] uppercase text-xs tracking-widest mb-2">
          Difficulty Level
        </p>
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <div key={level} className="flex items-center justify-between mb-2">
            <span>{level}</span>
            <button
              onClick={() => toggleDifficulty(level)}
              className={`w-10 h-5 rounded-full p-0.5 ${
                difficulty[level] ? "bg-[#00ffff]" : "bg-[#333]"
              }`}
            >
              <div
                className={`bg-[#0d0d0d] w-4 h-4 rounded-full transform duration-200 ${
                  difficulty[level] ? "translate-x-5" : ""
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <p className="text-[#888] uppercase text-xs tracking-widest mb-2">Price Range</p>
        <div className="flex justify-between text-sm text-[#aaa] mb-2">
          <span>Free</span>
          <span>$100</span>
          <span>$250+</span>
        </div>
        <input
          type="range"
          min="0"
          max="250"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-[#00ffff]"
        />
        <p className="text-right text-sm mt-1 text-[#00ffff]">
          ${priceRange[0]} - ${priceRange[1]}+
        </p>
      </div>

      {/* Duration */}
      <div>
        <p className="text-[#888] uppercase text-xs tracking-widest mb-2">Duration</p>
        <div className="grid grid-cols-2 gap-2">
          {["0-2 Hours", "3-6 Hours", "7-16 Hours", "17+ Hours"].map((d) => (
            <button
              key={d}
              className={`py-2 rounded-lg text-sm font-semibold border ${
                duration === d ? "border-[#00ffff] text-[#00ffff]" : "border-[#333] text-[#aaa]"
              }`}
              onClick={() => setDuration(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <p className="text-[#888] uppercase text-xs tracking-widest mb-2">Ratings</p>
        <div className="flex flex-col gap-2">
          <button
            className={`flex items-center gap-2 text-sm font-semibold ${
              rating === 4 ? "text-[#00ffff]" : "text-[#aaa]"
            }`}
            onClick={() => setRating(4)}
          >
            ⭐⭐⭐⭐ & Up
          </button>
          <button
            className={`flex items-center gap-2 text-sm font-semibold ${
              rating === 3 ? "text-[#00ffff]" : "text-[#aaa]"
            }`}
            onClick={() => setRating(3)}
          >
            ⭐⭐⭐☆ & Up
          </button>
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full py-3 bg-[#00ffff] text-black font-bold rounded-lg hover:bg-[#00dddd] transition-all">
        Apply Filters
      </button>
    </div>
  );
};
/* ---------- MAIN COMPONENT ---------- */
function CyberpunkCourses({ onSelectCourse }) {
  return (
    <div className="flex bg-[var(--color-cyberDark)]  text-white no-scrollbar">
      <Sidebar />
      {/* ===== RIGHT MAIN CONTENT ===== */}
      <div className="w-[70%] flex-1 ml-80 pl-6 pr-0 py-8 overflow-y-auto h-screen scrollbar-hide">
        
        <CourseSection title="🔥 Trending Courses" data={trending} onSelectCourse={onSelectCourse} />
        <CourseSection title="🎯 Your Niche" data={niche} onSelectCourse={onSelectCourse} />
        <CourseSection title="💾 Saved for Later" data={saved} onSelectCourse={onSelectCourse} />
        <CourseSection title="📚 All Courses" data={allCourses} onSelectCourse={onSelectCourse} />
      </div>
    </div>
  );
}

export default CyberpunkCourses;