import React from "react";
import { FiEdit2 } from 'react-icons/fi';

function CourseSection({ title, data, onSelectCourse, onEditCourse }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl text-center font-bold mb-6">{title}</h2>
      <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {data.map((course, index) => (
          <div key={index} className="snap-start min-w-[280px] h-[360px] perspective cursor-pointer" onClick={() => onSelectCourse && onSelectCourse(course)}>
            <div className="relative w-full h-full duration-700 transform-style preserve-3d hover:rotate-y-180">
              {/* FRONT */}
              <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-[var(--color-neonBlue)]/30 bg-black/40 backdrop-blur-lg">
                <div className={`h-40 bg-${course.gradient} flex items-center justify-center text-4xl font-bold`}>
                  
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-black border border-[var(--color-neonBlue)] text-[var(--color-neonBlue)]">
                      {course.level}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-neonPink)] text-black">
                      {course.progress}% Complete
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <div className="flex justify-between text-sm text-gray-300 mb-4">
                    <span>👥 {course.students}</span>
                    <span>⭐ {course.rating}</span>
                    <span>⏱ {course.weeks}</span>
                  </div>
                  <p className="text-sm text-gray-400">📘 {course.instructor}</p>
                </div>
              </div>
              {/* BACK */}
              <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-xl bg-gradient-to-br from-black via-gray-900 to-black border border-[var(--color-neonPink)] p-6 flex items-center justify-center text-center">
                {/* Edit button on the back face for user-created courses */}
                {(course.instructor === 'You' || course.editable) && onEditCourse && (
                  <button
                    className="absolute top-3 right-3 z-20 bg-white/5 p-2 rounded-full hover:bg-white/10"
                    onClick={(e) => { e.stopPropagation(); onEditCourse(course); }}
                    aria-label="Edit course"
                  >
                    <FiEdit2 />
                  </button>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--color-neonBlue)]">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {course.title} is a carefully designed course that helps you build strong fundamentals, complete real-world projects, and master industry-ready skills with guided lessons and hands-on practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CourseSection;