import React from "react";
import CourseSection from "../components/CourseSection";
export default function Dashboard({
  courses,
  customChallenges = [],
  openCourse,
  createNew,
  editCourse,
  createNewChallenge,
}) {

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
      gradient: "gradient-to-r from-emerald-400 to-green-500"
    };
  });

  return (
    <div className="dashboard px-10 py-6 text-white">
      <h1 className="text-4xl font-bold mb-6">My Courses</h1>

      <button className="primary mb-8" onClick={createNew}>
        + Create New Course
      </button>

      <button className="primary mb-8 ml-3" onClick={createNewChallenge}>
        + Upload Challenge
      </button>

      <CourseSection
        title="Your Published Courses"
        data={formattedCourses}
        onSelectCourse={openCourse}
        onEditCourse={editCourse}
      />

      <div className="mb-8">
        <h2 className="mb-6 text-center text-3xl font-bold">Your Uploaded Challenges</h2>
        {customChallenges.length === 0 ? (
          <p className="rounded-xl border border-emerald-500/25 bg-black/20 p-5 text-center text-emerald-100/80">
            You have not uploaded any challenges yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {customChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-xl border border-emerald-500/25 bg-black/30 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <span className="rounded-full border border-emerald-400/40 px-2 py-1 text-xs text-emerald-200">
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-emerald-100/90">{challenge.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
