import React from "react";

function Footer() {
  return (
    <footer className="border-t border-emerald-500/20 bg-[#031f1a] px-6 py-10 text-sm text-emerald-200/80">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold text-emerald-300">OpenLearn</h3>
            <p className="mt-2 max-w-xs text-emerald-100/70">
              Learn, build, collaborate, and track your growth with one modern platform.
            </p>
          </div>

          <div>
            <p className="text-base font-semibold text-emerald-200">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#" className="hover:text-emerald-300">Courses</a>
              <a href="#" className="hover:text-emerald-300">Challenges</a>
              <a href="#" className="hover:text-emerald-300">Community</a>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold text-emerald-200">Legal & Support</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#" className="hover:text-emerald-300">Privacy</a>
              <a href="#" className="hover:text-emerald-300">Terms</a>
              <a href="#" className="hover:text-emerald-300">Support</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-500/15 pt-4 text-emerald-100/60">
          © {new Date().getFullYear()} OpenLearn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
