import React, { useState } from "react";

export default function CurriculumBuilder({ course, setCourse }) {
  const [sectionTitle, setSectionTitle] = useState("");

  // 🛡 Safe fallback
  const sections = course?.sections || [];

  // ➕ Add Section
  const addSection = () => {
    if (!sectionTitle.trim()) return;

    const newSection = {
      id: Date.now(),
      title: sectionTitle,
      lessons: []
    };

    setCourse({
      ...course,
      sections: [...sections, newSection]
    });

    setSectionTitle("");
  };

  // ➕ Add Lesson
  const addLesson = (sectionId) => {
    const updatedSections = sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: [
            ...sec.lessons,
            {
              id: Date.now(),
              title: "New Lesson",
              duration: "5:00"
            }
          ]
        };
      }
      return sec;
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Course Curriculum</h2>

        <div className="text-sm text-gray-300">
          {sections.length} Sections •{" "}
          {sections.reduce((a, s) => a + s.lessons.length, 0)} Lessons
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-5">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-black/40 border border-white/10 p-5 rounded-xl shadow-lg backdrop-blur"
          >
            {/* Section Title */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-blue-400">
                {sec.title}
              </h3>

              <button
                onClick={() => addLesson(sec.id)}
                className="text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                + Add Lesson
              </button>
            </div>

            {/* Lessons */}
            <div className="space-y-2">
              {sec.lessons.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  No lessons yet
                </p>
              )}

              {sec.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex justify-between items-center bg-black/50 px-4 py-2 rounded-lg border border-white/10"
                >
                  <span className="text-sm">
                    📘 {lesson.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Section */}
      <div className="bg-black/40 border border-white/10 p-5 rounded-xl backdrop-blur shadow">
        <h3 className="text-lg font-semibold mb-3 text-pink-400">
          Add New Section
        </h3>

        <div className="flex gap-3">
          <input
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Enter section title..."
            className="flex-1 p-3 rounded-lg bg-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={addSection}
            className="bg-gradient-to-r from-blue-400 to-pink-500 text-black px-5 rounded-lg font-semibold hover:scale-105 transition"
          >
            + Add
          </button>
        </div>
      </div>

    </div>
  );
}