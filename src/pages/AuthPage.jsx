import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-[#062f27] to-[#041a16] p-6 shadow-[0_0_30px_rgba(37,231,143,0.15)]">
        <div className="mb-6 flex rounded-xl bg-black/20 p-1">
          <button
            className={`w-1/2 rounded-lg py-2 text-sm font-semibold transition ${mode === "login"
                ? "bg-emerald-400 text-black"
                : "text-emerald-200 hover:bg-emerald-500/10"
              }`}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
          <button
            className={`w-1/2 rounded-lg py-2 text-sm font-semibold transition ${mode === "signup"
                ? "bg-emerald-400 text-black"
                : "text-emerald-200 hover:bg-emerald-500/10"
              }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-2 text-sm text-emerald-100/80">
          {mode === "login"
            ? "Log in to continue your learning journey."
            : "Sign up to start learning and collaborating."}
        </p>

        {error && <div className="mt-4 rounded bg-red-500/20 p-2 text-sm text-red-400 text-center">{error}</div>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm text-emerald-200">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Rivera"
                className="w-full rounded-lg border border-emerald-500/30 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-emerald-200">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-emerald-500/30 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-lg border border-emerald-500/30 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm text-emerald-200">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-emerald-500/30 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-emerald-400 py-2.5 font-semibold text-black hover:bg-emerald-300 disabled:opacity-50"
          >
            {loading ? "Please wait..." : (mode === "login" ? "Log In" : "Create Account")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
