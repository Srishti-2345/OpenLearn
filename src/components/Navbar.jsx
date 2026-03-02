import React from "react";
import { FiMessageSquare } from "react-icons/fi";

function Navbar({
    onLogoClick = () => {},
    onLoginClick = () => {},
    onCoursesClick = () => {},
    onChallengesClick = () => {},
    onDashboardClick = () => {},
    onContributeClick = () => {},
    onCollaborateCourseClick = () => {},
    enrolledCourses = [],
}) {
    const [openCollaborate, setOpenCollaborate] = React.useState(false);
    const collaborateRef = React.useRef(null);

    React.useEffect(() => {
      const handleOutsideClick = (event) => {
        if (!collaborateRef.current) return;
        if (!collaborateRef.current.contains(event.target)) {
          setOpenCollaborate(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleCourseChatClick = (event, course) => {
      event.stopPropagation();
      onCollaborateCourseClick(course);
      setOpenCollaborate(false);
    };

    return(
        <>
        <nav className="fixed top-0 left-0 w-screen z-50">
            <ul className="flex items-center justify-between h-16 bg-[var(--color-cyberDark)] text-[var(--color-neonBlue)] px-6">
                <li className="text-lg font-bold tracking-wide cursor-pointer" onClick={onLogoClick}>
                  OpenLearn
                </li>
                <li className="list-none">
                <ul className="flex items-center gap-8">
                <li className="cursor-pointer" onClick={onCoursesClick}>Courses</li>
                <li className="cursor-pointer" onClick={onChallengesClick}>Challenges</li>
                <li className="cursor-pointer" onClick={onDashboardClick}>Dashboard</li>
                <li
                  ref={collaborateRef}
                  className="relative cursor-pointer"
                >
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenCollaborate((prev) => !prev)}
                  >
                    Collaborate
                    <span className="text-xs opacity-80">({enrolledCourses.length})</span>
                  </button>
                  {openCollaborate && (
                    <div className="absolute left-1/2 top-9 -translate-x-1/2 min-w-72 max-h-80 overflow-y-auto rounded-xl border border-emerald-400/30 bg-[#05241d] p-2 shadow-[0_0_30px_rgba(37,231,143,0.2)]">
                      {enrolledCourses.length === 0 ? (
                        <p className="px-3 py-4 text-sm text-gray-400">Enroll in a course to unlock community chat.</p>
                      ) : (
                        enrolledCourses.map((course) => (
                          <div
                            key={course.title}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-white hover:bg-emerald-500/10"
                          >
                            <span className="truncate pr-4">{course.title}</span>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/15"
                              title={`Open ${course.title} chat`}
                              onClick={(event) => handleCourseChatClick(event, course)}
                            >
                              <FiMessageSquare className="text-emerald-300" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </li>
                <li className="cursor-pointer" onClick={onContributeClick}>Contribute</li>
                </ul>
                </li>
                <li>
                  <button
                    className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20"
                    onClick={onLoginClick}
                  >
                    Log In
                  </button>
                </li>
            </ul>
            </nav>
        </>
    )
}

export default Navbar;
