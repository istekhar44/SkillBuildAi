import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Play,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    BookOpen,
} from "lucide-react";
import dsaProblems from "../data/dsaProblems";

const CodingChallengePage = () => {
    const { day } = useParams();
    const navigate = useNavigate();
    const dayNum = parseInt(day);
    const problem = dsaProblems[dayNum];

    const [code, setCode] = useState("");
    const [results, setResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState("description"); // description | results
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (problem) {
            setCode(problem.starterCode);
            setResults(null);
        }
        const saved = JSON.parse(localStorage.getItem("100DaysCode_Progress")) || [];
        setCompleted(saved.includes(dayNum));
    }, [dayNum, problem]);

    if (!problem) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <div className="text-center">
                    <BookOpen size={48} className="mx-auto mb-4 text-gray-500" />
                    <h2 className="text-2xl font-bold mb-2">Problem Not Available</h2>
                    <p className="text-gray-400 mb-6">Day {day} problem is coming soon!</p>
                    <button onClick={() => navigate("/challenge")} className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                        Back to Roadmap
                    </button>
                </div>
            </div>
        );
    }

    const diffColor = {
        Easy: "bg-green-500/20 text-green-400 border-green-500/30",
        Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Hard: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    const runTests = () => {
        setIsRunning(true);
        setActiveTab("results");

        setTimeout(() => {
            const testResults = problem.testCases.map((tc) => {
                try {
                    // Create function from user code + call it
                    const fullCode = `${code}\nreturn ${problem.functionName}(...args);`;
                    const fn = new Function("args", fullCode);
                    const actual = fn(tc.input);
                    const expectedStr = JSON.stringify(tc.expected);
                    const actualStr = JSON.stringify(actual);
                    return {
                        label: tc.label,
                        input: JSON.stringify(tc.input),
                        expected: expectedStr,
                        actual: actualStr,
                        passed: expectedStr === actualStr,
                        error: null,
                    };
                } catch (err) {
                    return {
                        label: tc.label,
                        input: JSON.stringify(tc.input),
                        expected: JSON.stringify(tc.expected),
                        actual: null,
                        passed: false,
                        error: err.message,
                    };
                }
            });
            setResults(testResults);
            setIsRunning(false);
        }, 500);
    };

    const markComplete = () => {
        const saved = JSON.parse(localStorage.getItem("100DaysCode_Progress")) || [];
        let updated;
        if (saved.includes(dayNum)) {
            updated = saved.filter((d) => d !== dayNum);
            setCompleted(false);
        } else {
            updated = [...saved, dayNum];
            setCompleted(true);
        }
        localStorage.setItem("100DaysCode_Progress", JSON.stringify(updated));
    };

    const resetCode = () => {
        setCode(problem.starterCode);
        setResults(null);
    };

    const passedCount = results ? results.filter((r) => r.passed).length : 0;
    const totalTests = problem.testCases.length;

    return (
        <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="h-14 bg-[#111] border-b border-white/10 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/challenge")} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Back to Roadmap">
                        <ArrowLeft size={18} />
                    </button>
                    <div className="w-px h-6 bg-white/10"></div>
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">Day {dayNum}</span>
                    <h1 className="font-bold text-sm md:text-base truncate">{problem.title}</h1>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${diffColor[problem.difficulty]}`}>
                        {problem.difficulty}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Day Navigation */}
                    <button
                        onClick={() => dayNum > 1 && navigate(`/challenge/${dayNum - 1}`)}
                        disabled={dayNum <= 1}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                        title="Previous Day"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => dayNum < 100 && navigate(`/challenge/${dayNum + 1}`)}
                        disabled={dayNum >= 100}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                        title="Next Day"
                    >
                        <ChevronRight size={16} />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button
                        onClick={markComplete}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${completed
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        <CheckCircle2 size={14} /> {completed ? "Completed" : "Mark Complete"}
                    </button>
                </div>
            </header>

            {/* Main Content — Split Pane */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* LEFT: Problem Description */}
                <div className="lg:w-[45%] border-r border-white/10 flex flex-col overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10 bg-[#111] shrink-0">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`px-5 py-3 text-sm font-medium transition-colors relative ${activeTab === "description" ? "text-white" : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            Description
                            {activeTab === "description" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab("results")}
                            className={`px-5 py-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === "results" ? "text-white" : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            Test Results
                            {results && (
                                <span className={`text-xs px-1.5 py-0.5 rounded ${passedCount === totalTests ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                    {passedCount}/{totalTests}
                                </span>
                            )}
                            {activeTab === "results" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === "description" ? (
                            <div>
                                {/* Problem Description */}
                                <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">{problem.description}</p>

                                {/* Examples */}
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Examples</h3>
                                <div className="space-y-4 mb-6">
                                    {problem.examples.map((ex, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <p className="text-xs text-gray-500 font-bold mb-2">Example {idx + 1}</p>
                                            <div className="space-y-1 text-sm">
                                                <p><span className="text-gray-500 font-mono">Input: </span><span className="text-gray-200 font-mono">{ex.input}</span></p>
                                                <p><span className="text-gray-500 font-mono">Output: </span><span className="text-green-400 font-mono">{ex.output}</span></p>
                                                {ex.explanation && <p className="text-gray-500 text-xs mt-2">💡 {ex.explanation}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Test Cases Preview */}
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Test Cases ({totalTests})</h3>
                                <div className="space-y-2">
                                    {problem.testCases.map((tc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm">
                                            <span className="text-gray-500 font-mono text-xs">#{idx + 1}</span>
                                            <span className="text-gray-300">{tc.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Test Results Panel */
                            <div>
                                {!results ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <Play size={32} className="mb-3 opacity-50" />
                                        <p className="text-sm">Run your code to see test results</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {/* Summary */}
                                        <div className={`p-4 rounded-xl border ${passedCount === totalTests
                                                ? "bg-green-500/10 border-green-500/30"
                                                : "bg-red-500/10 border-red-500/30"
                                            }`}>
                                            <div className="flex items-center gap-2">
                                                {passedCount === totalTests
                                                    ? <CheckCircle2 size={20} className="text-green-400" />
                                                    : <XCircle size={20} className="text-red-400" />
                                                }
                                                <span className="font-bold">
                                                    {passedCount === totalTests ? "All Tests Passed! 🎉" : `${passedCount} of ${totalTests} Passed`}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Individual Results */}
                                        {results.map((r, idx) => (
                                            <div key={idx} className={`border rounded-xl p-4 ${r.passed ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                                                <div className="flex items-center gap-2 mb-3">
                                                    {r.passed ? <CheckCircle2 size={16} className="text-green-400" /> : <XCircle size={16} className="text-red-400" />}
                                                    <span className="font-bold text-sm">{r.label}</span>
                                                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${r.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                                        {r.passed ? "PASS" : "FAIL"}
                                                    </span>
                                                </div>
                                                <div className="space-y-1.5 text-xs font-mono">
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-500 w-16 shrink-0">Input:</span>
                                                        <span className="text-gray-300 break-all">{r.input}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-500 w-16 shrink-0">Expected:</span>
                                                        <span className="text-green-400 break-all">{r.expected}</span>
                                                    </div>
                                                    {r.error ? (
                                                        <div className="flex gap-2">
                                                            <span className="text-gray-500 w-16 shrink-0">Error:</span>
                                                            <span className="text-red-400 break-all">{r.error}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <span className="text-gray-500 w-16 shrink-0">Output:</span>
                                                            <span className={`break-all ${r.passed ? "text-green-400" : "text-red-400"}`}>{r.actual}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Code Editor */}
                <div className="lg:w-[55%] flex flex-col overflow-hidden">
                    {/* Editor Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">JavaScript</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={resetCode} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Reset Code">
                                <RotateCcw size={13} /> Reset
                            </button>
                        </div>
                    </div>

                    {/* Code Textarea */}
                    <div className="flex-1 relative overflow-hidden">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="w-full h-full bg-[#1a1a2e] text-gray-100 font-mono text-sm p-5 resize-none outline-none leading-relaxed border-none"
                            style={{
                                tabSize: 2,
                                fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
                            }}
                        />
                    </div>

                    {/* Run Button Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-t border-white/10 shrink-0">
                        <div className="text-xs text-gray-500">
                            {results && (
                                <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {passedCount}/{totalTests} tests passed
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={runTests}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-sm hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                            >
                                <Play size={15} fill="white" />
                                {isRunning ? "Running..." : "Run Tests"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingChallengePage;
