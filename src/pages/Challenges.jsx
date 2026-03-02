import { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Lock, PanelLeft, Play, Rocket, X } from "lucide-react";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    solved: true,
    functionName: "twoSum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    starterCode: `function twoSum(nums, target) {
  const seen = {};

  for (let i = 0; i < nums.length; i += 1) {
    const needed = target - nums[i];
    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }
    seen[nums[i]] = i;
  }

  return [];
}`,
    visibleTests: [
      { id: 1, args: [[2, 7, 11, 15], 9], output: [0, 1] },
      { id: 2, args: [[3, 2, 4], 6], output: [1, 2] },
    ],
    hiddenTests: [
      { args: [[3, 3], 6], output: [0, 1] },
      { args: [[1, 5, 8, 10], 13], output: [1, 2] },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    solved: false,
    functionName: "isValid",
    description:
      "Given a string containing only ()[]{} characters, determine if the input string is valid.",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only"],
    starterCode: `function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      continue;
    }
    if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}`,
    visibleTests: [
      { id: 1, args: ["()[]{}"], output: true },
      { id: 2, args: ["(]"], output: false },
    ],
    hiddenTests: [
      { args: ["([{}])"], output: true },
      { args: ["((("], output: false },
    ],
  },
  {
    id: 3,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    solved: false,
    functionName: "maxProfit",
    description:
      "Given an array prices where prices[i] is the price of a stock on the ith day, return the maximum profit.",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}`,
    visibleTests: [
      { id: 1, args: [[7, 1, 5, 3, 6, 4]], output: 5 },
      { id: 2, args: [[7, 6, 4, 3, 1]], output: 0 },
    ],
    hiddenTests: [{ args: [[2, 4, 1]], output: 2 }],
  },
];

function normalize(value) {
  return JSON.stringify(value);
}

function buildRunner(code, functionName) {
  const factory = new Function(
    `${code}
    if (typeof ${functionName} !== "function") {
      throw new Error("Define a function named ${functionName}.");
    }
    return ${functionName};`
  );
  return factory();
}

export default function Challenges() {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [code, setCode] = useState(problems[0].starterCode);
  const [result, setResult] = useState(null);
  const [showProblemList, setShowProblemList] = useState(false);

  const challenge = useMemo(() => problems[selectedProblemIndex], [selectedProblemIndex]);

  const setActiveProblem = (index) => {
    setSelectedProblemIndex(index);
    setCode(problems[index].starterCode);
    setResult(null);
  };

  const runCode = () => {
    try {
      const solver = buildRunner(code, challenge.functionName);
      const test = challenge.visibleTests[0];
      const output = solver(...test.args);
      const passed = normalize(output) === normalize(test.output);

      setResult({
        status: passed ? "Accepted" : "Wrong Answer",
        output: normalize(output),
        expected: normalize(test.output),
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
      const solver = buildRunner(code, challenge.functionName);

      for (const test of challenge.visibleTests) {
        const output = solver(...test.args);
        if (normalize(output) !== normalize(test.output)) {
          setResult({
            status: `Wrong Answer (Visible Test ${test.id} Failed)`,
            output: normalize(output),
            expected: normalize(test.output),
            mode: "Submit",
          });
          return;
        }
      }

      for (let i = 0; i < challenge.hiddenTests.length; i += 1) {
        const output = solver(...challenge.hiddenTests[i].args);
        if (normalize(output) !== normalize(challenge.hiddenTests[i].output)) {
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

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#031f1a] text-white p-4 md:p-6">
      <button
        className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-400/35 bg-emerald-500/10 px-3 py-2 text-sm hover:bg-emerald-500/20"
        onClick={() => setShowProblemList(true)}
      >
        <PanelLeft size={16} />
        Problems
      </button>

      {showProblemList && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowProblemList(false)} />
      )}

      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-64px)] w-[300px] transform border-r border-emerald-500/25 bg-[#062f27] p-4 transition-transform duration-300 ${
          showProblemList ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="mb-3 text-lg font-bold text-emerald-300">Problem List</h2>
          <button
            className="rounded-md border border-emerald-400/30 p-1 hover:bg-emerald-500/10"
            onClick={() => setShowProblemList(false)}
          >
            <X size={14} />
          </button>
        </div>
        <div className="space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
            {problems.map((problem, index) => (
              <button
                key={problem.id}
                className={`w-full rounded-lg border p-3 text-left ${
                  index === selectedProblemIndex
                    ? "border-emerald-400/40 bg-emerald-500/10"
                    : "border-emerald-500/15 bg-[#0b2f27] hover:bg-emerald-500/5"
                }`}
                onClick={() => setActiveProblem(index)}
              >
                <p className="font-semibold">{problem.id}. {problem.title}</p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-emerald-300">{problem.difficulty}</span>
                  <span className={problem.solved ? "text-emerald-300" : "text-emerald-100/60"}>
                    {problem.solved ? "Solved" : "Unsolved"}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </aside>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-emerald-500/25 bg-[#062f27] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
              {challenge.difficulty}
            </span>
          </div>

          <div className="mb-4 flex gap-2">
            <button
              className="rounded-lg border border-emerald-400/35 px-3 py-1.5 text-sm hover:bg-emerald-500/10 disabled:opacity-40"
              disabled={selectedProblemIndex === 0}
              onClick={() => setActiveProblem(selectedProblemIndex - 1)}
            >
              Previous
            </button>
            <button
              className="rounded-lg border border-emerald-400/35 px-3 py-1.5 text-sm hover:bg-emerald-500/10 disabled:opacity-40"
              disabled={selectedProblemIndex === problems.length - 1}
              onClick={() => setActiveProblem(selectedProblemIndex + 1)}
            >
              Next
            </button>
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
            {challenge.visibleTests.map((test) => (
              <div key={test.id} className="rounded-lg border border-emerald-500/20 bg-[#0b2f27] p-3 text-sm">
                <p>Input: {normalize(test.args)}</p>
                <p>Output: {normalize(test.output)}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-2 mt-4 text-lg font-semibold">Hidden Test Cases</h2>
          <div className="rounded-lg border border-emerald-500/20 bg-[#0b2f27] p-3 text-sm text-emerald-100/80">
            <p className="flex items-center gap-2">
              <Lock size={16} className="text-amber-300" />
              {challenge.hiddenTests.length} hidden test cases are used during submit.
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
