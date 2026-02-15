import React from "react";

function CyberpunkHome() {
  return (
    <section className="min-h-screen h-screen overflow-hidden bg-[var(--color-cyberDark)] text-white px-6 py-16 relative flex items-center justify-center">

      {/* 🔲 grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(#00f0ff11_1px,transparent_1px),linear-gradient(90deg,#00f0ff11_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* scanline overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.03)_3px)] pointer-events-none"></div>

      {/* content */}
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">

        {/* Glitch Heading */}
        <h1 className="glitch text-5xl md:text-7xl mb-6" data-text="NEON LEARN">
          NEON LEARN
        </h1>

        {/* Subtitle */}
        <p className="neon-text text-lg md:text-2xl mb-8">
          Upgrade your skills in the cyber era ⚡ Learn. Build. Dominate.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <button className="px-6 py-3 border border-[var(--color-neonBlue)] text-[var(--color-neonBlue)] hover:bg-[var(--color-neonBlue)] hover:text-black transition duration-300 shadow-[0_0_10px_#00f0ff] hover:shadow-[0_0_25px_#00f0ff]">
            Explore Courses
          </button>

          <button className="px-6 py-3 border border-[var(--color-neonPink)] text-[var(--color-neonPink)] hover:bg-[var(--color-neonPink)] hover:text-black transition duration-300 shadow-[0_0_10px_#ff00ff] hover:shadow-[0_0_25px_#ff00ff]">
            Start Learning
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-3xl neon-text">120+</h2>
            <p className="text-gray-400">Courses</p>
          </div>
          <div>
            <h2 className="text-3xl neon-text">50K+</h2>
            <p className="text-gray-400">Students</p>
          </div>
          <div>
            <h2 className="text-3xl neon-text">300+</h2>
            <p className="text-gray-400">Challenges</p>
          </div>
          <div>
            <h2 className="text-3xl neon-text">24/7</h2>
            <p className="text-gray-400">AI Mentor</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CyberpunkHome;