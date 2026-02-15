import React from "react";

const courses = [
  {
    title: "Python for Beginners",
    level: "Beginner",
    progress: 45,
    students: "1,234",
    rating: "4.8",
    weeks: "8 weeks",
    instructor: "Dr. Sarah Johnson",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    progress: 20,
    students: "2,341",
    rating: "4.9",
    weeks: "12 weeks",
    instructor: "Prof. Michael Chen",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Web Development Masterclass",
    level: "Intermediate",
    progress: 60,
    students: "3,456",
    rating: "4.7",
    weeks: "10 weeks",
    instructor: "Emily Davis",
    gradient: "from-green-400 to-teal-500",
  },
  {
    title: "Machine Learning Bootcamp",
    level: "Advanced",
    progress: 10,
    students: "1,876",
    rating: "4.9",
    weeks: "14 weeks",
    instructor: "Andrew Ng",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Cyber Security Essentials",
    level: "Intermediate",
    progress: 35,
    students: "2,012",
    rating: "4.6",
    weeks: "9 weeks",
    instructor: "Kevin Mitnick",
    gradient: "from-red-500 to-pink-600",
  },
  {
    title: "Blockchain & Web3",
    level: "Advanced",
    progress: 5,
    students: "1,045",
    rating: "4.8",
    weeks: "11 weeks",
    instructor: "Vitalik Buterin",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "UI/UX Design Mastery",
    level: "Beginner",
    progress: 70,
    students: "980",
    rating: "4.7",
    weeks: "7 weeks",
    instructor: "Don Norman",
    gradient: "from-pink-400 to-fuchsia-500",
  },
  {
    title: "Cloud Computing AWS",
    level: "Intermediate",
    progress: 25,
    students: "1,560",
    rating: "4.6",
    weeks: "10 weeks",
    instructor: "Jeff Barr",
    gradient: "from-sky-400 to-blue-600",
  },
];

function CyberpunkCourses() {
  return (
    <section className="bg-[var(--color-cyberDark)] text-white px-6 py-16 relative overflow-hidden">

      {/* grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(#00f0ff11_1px,transparent_1px),linear-gradient(90deg,#00f0ff11_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* heading */}
        <h2 className="text-4xl font-bold mb-2 neon-text">All Courses</h2>
        <p className="text-gray-400 mb-10">
          Explore our comprehensive course catalog
        </p>

        {/* 🔥 SCROLL CONTAINER */}
        <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">

          {courses.map((course, index) => (
            <div
              key={index}
              className="snap-start min-w-[300px] group relative rounded-xl overflow-hidden border border-[var(--color-neonBlue)]/30 bg-black/40 backdrop-blur-lg transition duration-500 hover:scale-105 hover:border-[var(--color-neonPink)]"
            >
              {/* glow hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl bg-[var(--color-neonPink)]/20"></div>

              {/* banner */}
              <div className={`h-40 bg-gradient-to-r ${course.gradient} flex items-center justify-center text-4xl font-bold`}>
                ⚡
              </div>

              {/* content */}
              <div className="p-6 relative z-10">

                <div className="flex gap-2 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-black border border-[var(--color-neonBlue)] text-[var(--color-neonBlue)]">
                    {course.level}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-neonPink)] text-black">
                    {course.progress}% Complete
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-neonBlue)] transition">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  Learn with hands-on projects and real-world applications.
                </p>

                <div className="flex justify-between text-sm text-gray-300 mb-4">
                  <span>👥 {course.students}</span>
                  <span>⭐ {course.rating}</span>
                  <span>⏱ {course.weeks}</span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-neonBlue)] to-[var(--color-neonPink)]"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-400">
                  📘 {course.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CyberpunkCourses;