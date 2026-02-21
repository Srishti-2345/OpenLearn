import React from "react";

export default function EditGeneralInfo({ course, setCourse }) {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold">General Information</h2>

      <input
        className="w-full p-3 rounded-lg bg-black/50 border border-white/20 focus:ring-2 focus:ring-blue-400"
        placeholder="Course Title"
        value={course.title}
        onChange={(e) =>
          setCourse({ ...course, title: e.target.value })
        }
      />

      <input
        className="w-full p-3 rounded-lg bg-black/50 border border-white/20 focus:ring-2 focus:ring-blue-400"
        placeholder="Price (₹)"
        value={course.price}
        onChange={(e) =>
          setCourse({ ...course, price: e.target.value })
        }
      />

      <select
        className="w-full p-3 rounded-lg bg-black/50 border border-white/20"
        value={course.level}
        onChange={(e) =>
          setCourse({ ...course, level: e.target.value })
        }
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <label className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/10">
        <span>Make Course Public</span>
        <input
          type="checkbox"
          checked={course.isPublic}
          onChange={() =>
            setCourse({ ...course, isPublic: !course.isPublic })
          }
        />
      </label>

    </div>
  );
}