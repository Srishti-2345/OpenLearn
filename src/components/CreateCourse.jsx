import React from "react";

export default function CreateCourse({ course, setCourse }) {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold">Course Thumbnail</h2>

      <div className="border-2 border-dashed border-blue-400/40 rounded-xl p-8 text-center bg-black/40 backdrop-blur">
        <p className="mb-3 text-gray-300">Upload Thumbnail</p>

        <input
          type="file"
          className="text-sm"
          onChange={(e) =>
            setCourse({ ...course, thumbnail: e.target.files[0] })
          }
        />

        {course.thumbnail && (
          <p className="text-green-400 mt-2 text-sm">
            ✔ File selected
          </p>
        )}
      </div>

      <input
        className="w-full p-3 rounded-lg bg-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Course Title"
        value={course.title}
        onChange={(e) =>
          setCourse({ ...course, title: e.target.value })
        }
      />

    </div>
  );
}