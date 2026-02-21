import React from "react";
import CourseSection from "../components/CourseSection";
import CyberpunkCourseDetails from "../components/CyberpunkCourses";


export default function Dashboard({ courses, openCourse, createNew, editCourse }) {

  // 🎯 Convert saved course → UI card format
  const formattedCourses = courses.map((course) => {
    const totalLessons = course.sections.reduce(
      (a, s) => a + s.lessons.length,
      0
    );

    return {
      ...course,
      progress: totalLessons === 0 ? 0 : 100, // simple logic for now
      students: 1200,
      rating: 4.5,
      weeks: `${course.sections.length} Weeks`,
      instructor: "You",
      gradient: "gradient-to-r from-purple-500 to-pink-500"
    };
  });

  return (
    <div className="dashboard px-10 py-6 text-white">
      <h1 className="text-4xl font-bold mb-6">My Courses</h1>

      <button className="primary mb-8" onClick={createNew}>
        + Create New Course
      </button>

      <CourseSection
        title="Your Published Courses"
        data={formattedCourses}
        onSelectCourse={openCourse}
        onEditCourse={editCourse}
      />
    </div>
  );
}