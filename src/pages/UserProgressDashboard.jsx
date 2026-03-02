import React from "react";

export default function UserProgressDashboard({ enrolledCourses = [], onOpenCourses = () => {} }) {
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);
  const [showAllCourses, setShowAllCourses] = React.useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = React.useState(false);

  const fallbackCourses = [
    { title: "Advanced UI Design", instructor: "Module 4: Dynamic Layouts", progress: 75, lessonsDone: 12, lessonsTotal: 16 },
    { title: "Intro to Python", instructor: "David Malan", progress: 40, lessonsDone: 8, lessonsTotal: 20 },
    { title: "App Marketing", instructor: "Emma Watson", progress: 10, lessonsDone: 2, lessonsTotal: 20 },
  ];

  const sourceCourses = enrolledCourses.length ? enrolledCourses : fallbackCourses;

  const normalizedCourses = sourceCourses.map((course, index) => {
    const progress =
      typeof course.progress === "number"
        ? course.progress
        : Math.max(10, 35 + ((index * 17) % 55));
    return {
      ...course,
      progress: Math.max(0, Math.min(100, progress)),
      lessonsDone: course.lessonsDone ?? Math.max(1, Math.round(((Math.max(0, Math.min(100, progress))) / 100) * 16)),
      lessonsTotal: course.lessonsTotal ?? 16,
    };
  });

  const completedCourses = normalizedCourses.filter((course) => course.progress >= 90);
  const inProgressCourses = normalizedCourses.filter((course) => course.progress < 90);
  const achievements = [
    { title: "Early Bird", symbol: "◎" },
    { title: "Fast Learner", symbol: "⚡" },
    { title: "7-Day Warrior", symbol: "🏆" },
    { title: "Scholar", symbol: "🔒" },
    { title: "Consistency", symbol: "🔥" },
    { title: "Problem Solver", symbol: "🧠" },
    { title: "Top Contributor", symbol: "⭐" },
    { title: "Community Helper", symbol: "💬" },
  ];

  const certificatesEarned = completedCourses.length + 1;
  const streakDays = normalizedCourses.length ? 15 : 0;
  const badgesUnlocked = 6 + Math.min(inProgressCourses.length, 4);
  const leaderboard = [
    { rank: 4, name: "You", xp: 12450, highlight: true },
    { rank: 3, name: "Sarah Jenkins", xp: 12890, highlight: false },
    { rank: 2, name: "Arjun Mehta", xp: 14220, highlight: false },
    { rank: 1, name: "Lina Park", xp: 15610, highlight: false },
    { rank: 5, name: "Mia Collins", xp: 11840, highlight: false },
    { rank: 6, name: "Ethan Ross", xp: 10970, highlight: false },
    { rank: 7, name: "Noah Reed", xp: 10340, highlight: false },
    { rank: 8, name: "Ava Patel", xp: 9780, highlight: false },
  ];

  const resumeCourse = normalizedCourses[0];
  const visibleAchievements = showAllAchievements ? achievements : achievements.slice(0, 4);
  const visibleCourses = showAllCourses ? normalizedCourses : normalizedCourses.slice(0, 3);
  const visibleLeaderboard = showFullLeaderboard ? leaderboard : leaderboard.slice(0, 2);
  const canExpandCourses = normalizedCourses.length > 3;
  const monthlySolved = Array.from({ length: 30 }, (_, index) => {
    const base = Math.floor((Math.sin(index / 4) + 1.2) * 2);
    const streakBoost = index % 7 === 0 ? 2 : 0;
    return base + streakBoost + Math.min(inProgressCourses.length, 3);
  });
  const maxSolvedInDay = Math.max(...monthlySolved, 1);
  const heatmapWeeks = 12;
  const heatmapDays = 7;
  const heatmapValues = Array.from({ length: heatmapWeeks }, (_, week) =>
    Array.from({ length: heatmapDays }, (_, day) => (week * 3 + day + completedCourses.length) % 5)
  );
  const heatmapColors = [
    "bg-[#123728]",
    "bg-[#1a5a3f]",
    "bg-[#1f7d56]",
    "bg-[#24aa72]",
    "bg-[#2ceb9a]",
  ];

  return (
    <section className="min-h-[calc(100vh-64px)] w-full bg-[#031f1a] px-4 py-5 text-white md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-[#1fe284]/20 bg-gradient-to-b from-[#062f27] to-[#041a16] p-4 shadow-[0_0_30px_rgba(11,255,135,0.15)] md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#a3f7cb] to-[#7de3b4]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#80d6af]">Welcome back</p>
              <p className="text-xl font-bold leading-none">Alex Rivera</p>
            </div>
          </div>
          <div className="rounded-full border border-[#2ced9c]/40 bg-[#0e5a3f]/60 px-3 py-1 text-xs font-semibold text-[#51f6a9]">
            {streakDays} Day Streak
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#2ced9c]/20 bg-[#0b2f27] p-4">
          <h4 className="text-xl font-bold">Problems Solved (Last 30 Days)</h4>
          <div className="mt-4 flex h-40 items-end gap-1 rounded-lg border border-[#2ced9c]/10 bg-[#06271f] p-3">
            {monthlySolved.map((count, index) => (
              <div key={`day-${index}`} className="flex flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t bg-[#2ceb9a]"
                  style={{ height: `${Math.max(6, (count / maxSolvedInDay) * 100)}%` }}
                  title={`Day ${index + 1}: ${count} solved`}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#aee7cc]">
            Total solved this month: <span className="font-semibold text-[#53f7a8]">{monthlySolved.reduce((a, b) => a + b, 0)}</span>
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-[#2ced9c]/20 bg-[#0b2f27] p-4">
          <h4 className="text-xl font-bold">Submission Heatmap</h4>
          <p className="mt-1 text-xs text-[#aee7cc]">LeetCode-style contribution intensity by day.</p>
          <div className="mt-4 overflow-x-auto">
            <div className="inline-grid grid-flow-col gap-1">
              {heatmapValues.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                  {week.map((value, dayIndex) => (
                    <div
                      key={`cell-${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 rounded-sm ${heatmapColors[value]}`}
                      title={`Week ${weekIndex + 1}, Day ${dayIndex + 1}: ${value} submissions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[#2ced9c]/20 bg-[#0a3d2f] p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#5cf0ab]">Resume Learning</p>
          <h2 className="mt-1 text-2xl font-bold">{resumeCourse.title}</h2>
          <p className="text-sm text-[#a6e5ca]">{resumeCourse.instructor || "Module 4: Dynamic Layouts"}</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="font-semibold text-[#d7ffe9]">{resumeCourse.progress}% Complete</p>
            <p className="text-[#84d2af]">
              {resumeCourse.lessonsDone}/{resumeCourse.lessonsTotal} Lessons
            </p>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#0a2b20]">
            <div className="h-full rounded-full bg-[#2ceb9a]" style={{ width: `${resumeCourse.progress}%` }} />
          </div>
          <button className="mt-4 w-full rounded-lg bg-[#25e78f] py-2.5 text-sm font-bold text-[#042218]">
            Resume Lesson
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Achievements</h3>
          <button
            className="text-sm font-semibold text-[#50f5a6]"
            onClick={() => setShowAllAchievements((prev) => !prev)}
          >
            {showAllAchievements ? "Show Less" : "View All"}
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-6">
          {visibleAchievements.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#2ced9c]/30 bg-[#0b4b37] text-[#53f7a8]">
                {item.symbol}
              </div>
              <p className="mt-2 text-[11px] text-[#aee7cc]">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#2ced9c]/20 bg-[#0b2231] p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold">Global Ranking</h4>
            <span className="rounded-full bg-[#1f2f50] px-3 py-1 text-xs text-[#e2e9ff]">Diamond League</span>
          </div>
          <div className="mt-3 space-y-2">
            {visibleLeaderboard.map((row) => (
              <div
                key={row.name}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                  row.highlight
                    ? "border-[#25e78f]/30 bg-[#0d4a39]"
                    : "border-[#5c7eb8]/20 bg-[#102941]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#74fcb8]">{row.rank}</span>
                  <span className={row.highlight ? "font-semibold text-white" : "text-[#b7c8e5]"}>{row.name}</span>
                </div>
                <span className="font-semibold text-[#8ee8ff]">{row.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
          <button
            className="mt-3 w-full text-center text-xs font-semibold tracking-[0.2em] text-[#87b8ff]"
            onClick={() => setShowFullLeaderboard((prev) => !prev)}
          >
            {showFullLeaderboard ? "SHOW LESS LEADERBOARD" : "VIEW FULL LEADERBOARD"}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold">My Courses</h3>
          <button
            className="text-sm font-semibold text-[#50f5a6]"
            onClick={() => {
              if (canExpandCourses) {
                setShowAllCourses((prev) => !prev);
                return;
              }
              onOpenCourses();
            }}
          >
            {canExpandCourses ? (showAllCourses ? "Show Less" : "See All") : "Browse Courses"}
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {visibleCourses.map((course, index) => (
            <div key={`${course.title}-${index}`} className="rounded-xl border border-[#2ced9c]/15 bg-[#091a34] p-3">
              <div className="flex gap-3">
                <div className="h-14 w-14 rounded-md bg-gradient-to-br from-[#5e8aa8] to-[#0f3340]" />
                <div className="flex-1">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-xs text-[#8eb5c7]">{course.instructor || "Course Instructor"}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#89c2da]">Progress</span>
                    <span className="font-semibold text-[#3ef49e]">{course.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[#12304b]">
                    <div className="h-full rounded-full bg-[#2ceb9a]" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
