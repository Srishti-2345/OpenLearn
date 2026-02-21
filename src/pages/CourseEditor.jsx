import React, { useState } from "react";
import CreateCourse from "../components/CreateCourse";
import EditGeneralInfo from "../components/EditGeneralInfo";
import CurriculumBuilder from "../components/CurriculumBuilder";

export default function CourseEditor({ course, setCourse, goBack }) {
  const [tab, setTab] = useState("thumbnail");

  const tabs = [
    { id: "thumbnail", label: "Thumbnail" },
    { id: "general", label: "General Info" },
    { id: "curriculum", label: "Curriculum" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goBack}
          className="text-sm bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold tracking-wide">
          Edit Course
        </h1>

        <button
          onClick={goBack}
          className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          🚀 Publish
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${tab === t.id
                ? "bg-gradient-to-r from-blue-400 to-pink-500 text-black shadow-lg scale-105"
                : "bg-white/10 hover:bg-white/20 text-gray-300"}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6">

        {tab === "thumbnail" && (
          <CreateCourse course={course} setCourse={setCourse} next={() => {}} />
        )}

        {tab === "general" && (
          <EditGeneralInfo course={course} setCourse={setCourse} next={() => {}} />
        )}

        {tab === "curriculum" && (
          <CurriculumBuilder course={course} setCourse={setCourse} />
        )}

      </div>
    </div>
  );
}