import React from "react";
import { FiArrowLeft, FiBookmark, FiShare2, FiPlayCircle, FiLock } from "react-icons/fi";

export default function CyberpunkCourseDetails({ open = false, course = null, onClose = () => {} }) {
  return (
    <div className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="w-[360px] h-full bg-[#0a0a0f] text-white p-4">
        <div className="w-full h-full bg-[#0f0f1a] rounded-2xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,255,255,0.2)] overflow-hidden flex flex-col">

        {/* HEADER IMAGE */}
          <div className="relative h-40 bg-gradient-to-br from-[#1f1f2e] to-[#0a0a0f] flex items-center justify-center">
            <span className="text-5xl opacity-20">{course?.title ? '📘' : '👍'}</span>

            <div className="absolute top-3 left-3 bg-black/50 p-2 rounded-full border border-cyan-400 cursor-pointer" onClick={onClose}>
              <FiArrowLeft />
            </div>

            <div className="absolute top-3 right-12 bg-black/50 p-2 rounded-full border border-cyan-400">
              <FiBookmark />
            </div>

            <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full border border-cyan-400">
              <FiShare2 />
            </div>
          </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-hide">

          {/* Title */}
          <div>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-400">
              {course?.level ?? 'FEATURED'}
            </span>
            <h2 className="mt-2 text-lg font-bold text-cyan-300">
              {course?.title ?? 'Select a course to view details'}
            </h2>
          </div>

          {/* INFO BOXES */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#12121c] border border-cyan-500/30 rounded-lg p-2">
              <p className="text-cyan-400">⏱</p>
              <p>12 Hours</p>
            </div>
            <div className="bg-[#12121c] border border-cyan-500/30 rounded-lg p-2">
              <p className="text-cyan-400">📊</p>
              <p>Intermediate</p>
            </div>
            <div className="bg-[#12121c] border border-cyan-500/30 rounded-lg p-2">
              <p className="text-cyan-400">🌐</p>
              <p>English</p>
            </div>
          </div>

          {/* AUTHOR */}
          <div className="bg-[#101018] border border-pink-500/30 rounded-xl p-3">
            <p className="text-sm text-pink-400 font-semibold mb-1">Note from Author</p>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-pink-500/30"></div>
              <div>
                <p className="text-sm font-semibold">{course?.instructor ?? 'Course Author'}</p>
                <p className="text-xs text-gray-400">{course?.level ?? 'Level'}</p>
                <p className="text-xs mt-1 text-gray-300 italic">
                  {course ? `A quick intro to ${course.title}` : 'No course selected.'}
                </p>
              </div>
            </div>
          </div>

          {/* WHAT YOU'LL LEARN */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-2">What You'll Learn</h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2 items-center text-green-400">✔ Master Figma’s advanced prototyping</li>
              <li className="flex gap-2 items-center text-green-400">✔ Develop a scalable design system</li>
              <li className="flex gap-2 items-center text-green-400">✔ Color theory & emotional impact</li>
              <li className="flex gap-2 items-center text-green-400">✔ Convert UX research into layouts</li>
            </ul>
          </div>

          {/* COURSE CONTENT */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="text-cyan-400 font-semibold">Course Content</h3>
              <span className="text-xs text-green-400">12 Lessons</span>
            </div>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between items-center bg-[#12121c] border border-cyan-500/20 rounded-lg p-3">
                <div>
                  <p className="text-cyan-300 font-semibold">01 {course?.title ? course.title.split(' ')[0] : 'Visual'} Foundation</p>
                  <p className="text-xs text-gray-400">14:20 mins</p>
                </div>
                <FiPlayCircle className="text-cyan-400" />
              </div>

              <div className="flex justify-between items-center bg-[#12121c] border border-pink-500/20 rounded-lg p-3">
                <div>
                  <p className="text-pink-300 font-semibold">02 Typography & Grids</p>
                  <p className="text-xs text-gray-400">28:45 mins</p>
                </div>
                <FiLock className="text-pink-400" />
              </div>

              <div className="flex justify-between items-center bg-[#12121c] border border-pink-500/20 rounded-lg p-3">
                <div>
                  <p className="text-pink-300 font-semibold">03 Interactive Components</p>
                  <p className="text-xs text-gray-400">42:10 mins</p>
                </div>
                <FiLock className="text-pink-400" />
              </div>

              <div className="flex justify-between items-center bg-[#12121c] border border-pink-500/20 rounded-lg p-3">
                <div>
                  <p className="text-pink-300 font-semibold">04 Final Project</p>
                  <p className="text-xs text-gray-400">1.15 hr</p>
                </div>
                <FiLock className="text-pink-400" />
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-auto p-4 border-t border-cyan-500/20 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">TOTAL PRICE</p>
            <p className="text-lg font-bold text-green-400">{course ? `$${(Math.max(20, Math.floor((Math.random()*120)+20))).toFixed(2)}` : '$--'}</p>
          </div>

          <button className="bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(0,255,150,0.5)] hover:scale-105 transition">
            Enroll Now →
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}