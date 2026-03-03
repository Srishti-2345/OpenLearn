import { useState } from "react";

const defaultStarterCode = `function solution() {
  // write your solution
}`;

const defaultVisibleTests = `[
  { "id": 1, "args": [1], "output": 1 }
]`;

const defaultHiddenTests = `[
  { "args": [2], "output": 2 }
]`;

export default function ChallengeUploader({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    functionName: "",
    description: "",
    constraints: "",
    starterCode: defaultStarterCode,
    visibleTests: defaultVisibleTests,
    hiddenTests: defaultHiddenTests,
  });
  const [error, setError] = useState("");

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    try {
      const constraints = form.constraints
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const visibleTests = JSON.parse(form.visibleTests);
      const hiddenTests = JSON.parse(form.hiddenTests);

      if (
        !form.title.trim() ||
        !form.functionName.trim() ||
        !form.description.trim() ||
        !constraints.length ||
        !form.starterCode.trim()
      ) {
        setError("All fields are required.");
        return;
      }

      if (!Array.isArray(visibleTests) || visibleTests.length === 0) {
        setError("Visible tests must be a non-empty JSON array.");
        return;
      }

      if (!Array.isArray(hiddenTests) || hiddenTests.length === 0) {
        setError("Hidden tests must be a non-empty JSON array.");
        return;
      }

      const normalizedVisibleTests = visibleTests.map((test, index) => ({
        id: Number(test?.id) || index + 1,
        args: test?.args ?? [],
        output: test?.output,
      }));

      const normalizedHiddenTests = hiddenTests.map((test) => ({
        args: test?.args ?? [],
        output: test?.output,
      }));

      onSave({
        id: Date.now(),
        title: form.title.trim(),
        difficulty: form.difficulty,
        solved: false,
        functionName: form.functionName.trim(),
        description: form.description.trim(),
        constraints,
        starterCode: form.starterCode,
        visibleTests: normalizedVisibleTests,
        hiddenTests: normalizedHiddenTests,
      });
    } catch {
      setError("Test cases must be valid JSON arrays.");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-emerald-500/25 bg-[#062f27] p-5">
        <button
          type="button"
          className="mb-4 rounded-md border border-emerald-400/35 px-3 py-1.5 text-sm hover:bg-emerald-500/10"
          onClick={onCancel}
        >
          Back to Contribute
        </button>
        <h1 className="mb-5 text-2xl font-bold">Upload Challenge</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-emerald-200">Title</label>
            <input
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-emerald-200">Difficulty</label>
              <select
                className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
                value={form.difficulty}
                onChange={(e) => setField("difficulty", e.target.value)}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-emerald-200">Function Name</label>
              <input
                className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
                value={form.functionName}
                onChange={(e) => setField("functionName", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">Description</label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">Constraints (one per line)</label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 outline-none focus:border-emerald-300"
              value={form.constraints}
              onChange={(e) => setField("constraints", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">Starter Code</label>
            <textarea
              rows={8}
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 font-mono text-sm outline-none focus:border-emerald-300"
              value={form.starterCode}
              onChange={(e) => setField("starterCode", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">
              Visible Test Cases (JSON array with id, args, output)
            </label>
            <textarea
              rows={6}
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 font-mono text-sm outline-none focus:border-emerald-300"
              value={form.visibleTests}
              onChange={(e) => setField("visibleTests", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-emerald-200">
              Hidden Test Cases (JSON array with args, output)
            </label>
            <textarea
              rows={6}
              className="w-full rounded-md border border-emerald-400/35 bg-[#0b2f27] px-3 py-2 font-mono text-sm outline-none focus:border-emerald-300"
              value={form.hiddenTests}
              onChange={(e) => setField("hiddenTests", e.target.value)}
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400">
              Save Challenge
            </button>
            <button
              type="button"
              className="rounded-md border border-emerald-400/35 px-4 py-2 hover:bg-emerald-500/10"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
