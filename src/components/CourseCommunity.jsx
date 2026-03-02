import React, { useMemo, useState } from "react";
import { FiHash, FiHeadphones, FiMessageSquare, FiSend, FiUsers } from "react-icons/fi";

const channelTemplate = ["announcements", "general", "qa", "projects", "resources"];

const seedMessages = [
  { user: "Mentor", text: "Welcome to the course server. Share your progress daily." },
  { user: "Aarav", text: "I am starting module 2 today. Anyone joining?" },
  { user: "Priya", text: "Pinned notes are in #resources." },
];

function CourseCommunity({ enrolledCourses = [], activeCourse = null, onSelectCourse = () => {} }) {
  const [activeChannel, setActiveChannel] = useState("general");
  const [draft, setDraft] = useState("");
  const [messagesByCourse, setMessagesByCourse] = useState({});

  const selectedCourse = activeCourse || enrolledCourses[0] || null;
  const selectedCourseTitle = selectedCourse?.title ?? "";
  const messages = useMemo(() => {
    if (!selectedCourseTitle) return [];
    return messagesByCourse[selectedCourseTitle] ?? seedMessages;
  }, [messagesByCourse, selectedCourseTitle]);

  const sendMessage = () => {
    const message = draft.trim();
    if (!message || !selectedCourseTitle) return;

    setMessagesByCourse((prev) => {
      const existing = prev[selectedCourseTitle] ?? seedMessages;
      return {
        ...prev,
        [selectedCourseTitle]: [...existing, { user: "You", text: message }],
      };
    });
    setDraft("");
  };

  if (enrolledCourses.length === 0) {
    return (
      <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] text-white p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-400/20 bg-[#062f27] p-10 text-center">
          <h2 className="text-3xl font-bold text-emerald-300">Collaborate</h2>
          <p className="mt-3 text-gray-300">
            You are not enrolled in any course yet. Enroll in a course, then open Collaborate from the navbar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] text-white">
      <div className="grid grid-cols-[260px_1fr_220px] h-[calc(100vh-64px)]">
        <aside className="border-r border-emerald-500/20 bg-[#0b2f27] p-3 overflow-y-auto">
          <div className="mb-3 text-xs uppercase tracking-[0.18em] text-emerald-300">Your Courses</div>
          <div className="space-y-2">
            {enrolledCourses.map((course) => (
              <button
                key={course.title}
                className={`w-full rounded-lg px-3 py-2 text-left transition border ${
                  selectedCourseTitle === course.title
                    ? "border-emerald-300/40 bg-emerald-500/10"
                    : "border-transparent bg-white/5 hover:bg-white/10"
                }`}
                onClick={() => onSelectCourse(course)}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-2">{course.title}</span>
                  <FiMessageSquare className="text-emerald-300" />
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex flex-col bg-[#102a23]">
          <div className="h-14 border-b border-emerald-500/20 px-4 flex items-center gap-3">
            <FiHash className="text-emerald-300" />
            <h3 className="font-semibold">{selectedCourseTitle || "Community"}</h3>
            <span className="text-gray-400">/ {activeChannel}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message, idx) => (
              <div key={`${message.user}-${idx}`} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <p className="text-emerald-300 text-sm font-medium">{message.user}</p>
                <p className="text-gray-200 mt-1">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-emerald-500/20 p-4">
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message #${activeChannel}`}
                className="flex-1 rounded-lg border border-emerald-500/30 bg-[#0f2a23] px-3 py-2 outline-none focus:border-emerald-300"
              />
              <button
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-400 text-black hover:bg-emerald-300"
                onClick={sendMessage}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </main>

        <aside className="border-l border-emerald-500/20 bg-[#0b2f27] p-3">
          <div className="mb-3 flex items-center gap-2 text-emerald-300">
            <FiHeadphones />
            <span className="text-sm uppercase tracking-[0.12em]">Channels</span>
          </div>
          <div className="space-y-1 mb-6">
            {channelTemplate.map((channel) => (
              <button
                key={channel}
                className={`w-full text-left rounded-lg px-3 py-2 ${
                  activeChannel === channel ? "bg-emerald-500/10 text-emerald-200" : "text-gray-300 hover:bg-white/10"
                }`}
                onClick={() => setActiveChannel(channel)}
              >
                <span className="inline-flex items-center gap-2">
                  <FiHash />
                  {channel}
                </span>
              </button>
            ))}
          </div>

          <div className="mb-2 flex items-center gap-2 text-emerald-300">
            <FiUsers />
            <span className="text-sm uppercase tracking-[0.12em]">Online</span>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Mentor Bot</p>
            <p>Design Squad</p>
            <p>Debug Team</p>
            <p>You</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CourseCommunity;
