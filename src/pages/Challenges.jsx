import { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Lock, Play, Rocket } from "lucide-react";

const visibleTests = [
  { id: 1, nums: [2, 7, 11, 15], target: 9, output: [0, 1] },
  { id: 2, nums: [3, 2, 4], target: 6, output: [1, 2] },
];

const hiddenTests = [
  { nums: [3, 3], target: 6, output: [0, 1] },
  { nums: [1, 5, 8, 10], target: 13, output: [1, 2] },
];

const starterCode = `function twoSum(nums, target) {
  const seen = {};

  for (let i = 0; i < nums.length; i += 1) {
    const needed = target - nums[i];
    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }
    seen[nums[i]] = i;
  }

  return [];
}`;

function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return "__invalid__";
  }
  return JSON.stringify(value);
}

function formatArray(value) {
  return Array.isArray(value) ? JSON.stringify(value) : String(value);
}

function buildRunner(code) {
  const factory = new Function(
    `${code}
    if (typeof twoSum !== "function") {
      throw new Error("Define a function named twoSum(nums, target).");
    }
    return twoSum;`
  );
  return factory();
}

export default function Challenges() {
  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState(null);

  const challenge = useMemo(
    () => ({
      title: "Two Sum",
      difficulty: "Easy",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
      ],
    }),
    []
  );

  const runCode = () => {
    try {
      const solver = buildRunner(code);
      const test = visibleTests[0];
      const output = solver([...test.nums], test.target);
      const passed = normalizeArray(output) === normalizeArray(test.output);

      setResult({
        status: passed ? "Accepted" : "Wrong Answer",
        output: formatArray(output),
        expected: formatArray(test.output),
        mode: "Run",
      });
    } catch (error) {
      setResult({
        status: "Runtime Error",
        output: error instanceof Error ? error.message : "Unknown runtime error",
        expected: "-",
        mode: "Run",
      });
    }
  };

  const submitCode = () => {
    try {
      const solver = buildRunner(code);

      for (const test of visibleTests) {
        const output = solver([...test.nums], test.target);
        if (normalizeArray(output) !== normalizeArray(test.output)) {
          setResult({
            status: `Wrong Answer (Visible Test ${test.id} Failed)`,
            output: formatArray(output),
            expected: formatArray(test.output),
            mode: "Submit",
          });
          return;
        }
      }

      for (let i = 0; i < hiddenTests.length; i += 1) {
        const output = solver([...hiddenTests[i].nums], hiddenTests[i].target);
        if (normalizeArray(output) !== normalizeArray(hiddenTests[i].output)) {
          setResult({
            status: `Wrong Answer (Hidden Test ${i + 1} Failed)`,
            output: "Hidden",
            expected: "Hidden",
            mode: "Submit",
          });
          return;
        }
      }

      setResult({
        status: "Accepted",
        output: "All test cases passed.",
        expected: "-",
        mode: "Submit",
      });
    } catch (error) {
      setResult({
        status: "Runtime Error",
        output: error instanceof Error ? error.message : "Unknown runtime error",
        expected: "-",
        mode: "Submit",
      });
    }
  };

  const formatInput = (nums, target) => `nums = ${JSON.stringify(nums)}, target = ${target}`;

  const formatOutput = (value) => JSON.stringify(value);

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] text-white p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-emerald-500/25 bg-[#062f27] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
              {challenge.difficulty}
            </span>
          </div>

          <p className="mb-4 text-sm text-emerald-100">{challenge.description}</p>

          <h2 className="mb-2 text-lg font-semibold">Constraints</h2>
          <ul className="mb-4 list-inside list-disc text-sm text-emerald-100/80">
            {challenge.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mb-2 text-lg font-semibold">Visible Test Cases</h2>
          <div className="space-y-2">
            {visibleTests.map((test) => (
              <div key={test.id} className="rounded-lg border border-emerald-500/20 bg-[#0b2f27] p-3 text-sm">
                <p>Input: {formatInput(test.nums, test.target)}</p>
                <p>Output: {formatOutput(test.output)}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-2 mt-4 text-lg font-semibold">Hidden Test Cases</h2>
          <div className="rounded-lg border border-emerald-500/20 bg-[#0b2f27] p-3 text-sm text-emerald-100/80">
            <p className="flex items-center gap-2">
              <Lock size={16} className="text-amber-300" />
              {hiddenTests.length} hidden test cases are used during submit.
            </p>
          </div>
        </article>

        <article className="flex min-h-[540px] flex-col rounded-xl border border-emerald-500/25 bg-[#062f27]">
          <header className="flex items-center justify-end gap-2 border-b border-emerald-500/20 p-3">
            <button
              type="button"
              onClick={runCode}
              className="flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              <Play size={16} />
              Run
            </button>
            <button
              type="button"
              onClick={submitCode}
              className="flex items-center gap-2 rounded-md bg-[#1fd67f] px-3 py-2 text-sm font-medium text-black hover:bg-[#25e78f]"
            >
              <Rocket size={16} />
              Submit
            </button>
          </header>

          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
            />
          </div>

          <footer className="border-t border-emerald-500/20 bg-[#0b2f27] p-3 text-sm">
            {result ? (
              <>
                <p className={result.status.includes("Accepted") ? "text-emerald-400" : "text-rose-400"}>
                  {result.mode}: {result.status}
                </p>
                <p className="text-emerald-100/80">Output: {result.output}</p>
                <p className="text-emerald-100/80">Expected: {result.expected}</p>
              </>
            ) : (
              <p className="text-emerald-100/60">Run or submit to see results.</p>
            )}
          </footer>
        </article>
      </div>
    </section>
  );
}
