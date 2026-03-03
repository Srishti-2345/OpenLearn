export default function CourseContent({ course = null, onBack = () => {} }) {
  const fallbackSections = [
    {
      id: "sec-1",
      title: "Getting Started",
      lessons: [
        { id: "l-1", title: "Course Introduction", duration: "08:00" },
        { id: "l-2", title: "Setup and Prerequisites", duration: "14:00" },
      ],
    },
    {
      id: "sec-2",
      title: "Core Concepts",
      lessons: [
        { id: "l-3", title: "Fundamentals", duration: "22:00" },
        { id: "l-4", title: "Hands-on Practice", duration: "30:00" },
      ],
    },
  ];

  const sections = course?.sections?.length ? course.sections : fallbackSections;

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-5xl rounded-xl border border-emerald-500/25 bg-[#062f27] p-5">
        <button
          type="button"
          className="mb-4 rounded-md border border-emerald-400/35 px-3 py-1.5 text-sm hover:bg-emerald-500/10"
          onClick={onBack}
        >
          Back to Courses
        </button>

        <h1 className="text-3xl font-bold">{course?.title ?? "Course Content"}</h1>
        <p className="mt-1 text-emerald-200/90">
          Instructor: {course?.instructor ?? "Course Author"}
        </p>

        <div className="mt-6 space-y-4">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id ?? sectionIndex}
              className="rounded-xl border border-emerald-500/25 bg-black/20 p-4"
            >
              <h2 className="text-xl font-semibold">
                {sectionIndex + 1}. {section.title || "Untitled Section"}
              </h2>

              {section.lessons?.length ? (
                <ul className="mt-3 space-y-2">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lesson.id ?? lessonIndex}
                      className="flex items-center justify-between rounded-md border border-emerald-500/20 bg-[#0b2f27] px-3 py-2"
                    >
                      <span>{lesson.title || `Lesson ${lessonIndex + 1}`}</span>
                      <span className="text-sm text-emerald-200/85">
                        {lesson.duration || "10:00"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-emerald-100/80">No lessons yet in this section.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
