import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    CheckCircle2,
    XCircle,
    MinusCircle,
    Trophy,
    Home,
    RotateCcw,
    AlertTriangle,
} from "lucide-react";
import mockTests from "../data/mockTests";

const MockTestPage = () => {
    const { companySlug } = useParams();
    const navigate = useNavigate();
    const testData = mockTests[companySlug];

    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(testData ? testData.duration * 60 : 0);
    const [showConfirm, setShowConfirm] = useState(false);

    // Timer
    useEffect(() => {
        if (submitted || !testData) return;
        if (timeLeft <= 0) {
            setSubmitted(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, submitted, testData]);

    const selectAnswer = useCallback(
        (optionIdx) => {
            if (submitted) return;
            setAnswers((prev) => ({ ...prev, [currentQ]: optionIdx }));
        },
        [currentQ, submitted]
    );

    if (!testData) {
        return (
            <div className="min-h-screen theme-bg flex items-center justify-center text-white">
                <div className="text-center">
                    <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-400" />
                    <h2 className="text-2xl font-bold mb-2">Test Not Found</h2>
                    <p className="text-gray-400 mb-6">
                        No test available for "{companySlug}"
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const questions = testData.questions;
    const totalQ = questions.length;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Scoring
    const getResults = () => {
        let correct = 0,
            incorrect = 0,
            unanswered = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === undefined) unanswered++;
            else if (answers[idx] === q.correctAnswer) correct++;
            else incorrect++;
        });
        return { correct, incorrect, unanswered, total: totalQ, percentage: Math.round((correct / totalQ) * 100) };
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setShowConfirm(false);
    };

    const results = submitted ? getResults() : null;

    // ─── RESULTS SCREEN ───
    if (submitted && results) {
        return (
            <div className="min-h-screen theme-bg text-white">
                {/* Results Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                        {/* Score Card */}
                        <div className="text-center mb-10">
                            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${results.percentage >= 70 ? 'bg-green-500/20' : results.percentage >= 40 ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                                <Trophy size={40} className={results.percentage >= 70 ? 'text-green-400' : results.percentage >= 40 ? 'text-yellow-400' : 'text-red-400'} />
                            </div>
                            <h1 className="text-4xl font-bold mb-2">Test Completed!</h1>
                            <p className="text-gray-400 text-lg">{testData.companyName} — {testData.role}</p>
                        </div>

                        {/* Score Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-bold text-indigo-400">{results.correct}/{results.total}</p>
                                <p className="text-gray-400 text-sm mt-1">Score</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-bold text-white">{results.percentage}%</p>
                                <p className="text-gray-400 text-sm mt-1">Percentage</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-bold text-green-400">{results.correct}</p>
                                <p className="text-gray-400 text-sm mt-1">Correct</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-bold text-red-400">{results.incorrect}</p>
                                <p className="text-gray-400 text-sm mt-1">Incorrect</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
                            <div className="flex justify-between text-sm text-gray-400 mb-3">
                                <span>Performance</span>
                                <span>{results.percentage}%</span>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${results.percentage >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : results.percentage >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' : 'bg-gradient-to-r from-red-500 to-pink-400'}`}
                                    style={{ width: `${results.percentage}%` }}
                                ></div>
                            </div>
                            <div className="flex gap-6 mt-4 text-sm">
                                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> {results.correct} Correct</span>
                                <span className="flex items-center gap-2"><XCircle size={14} className="text-red-400" /> {results.incorrect} Wrong</span>
                                <span className="flex items-center gap-2"><MinusCircle size={14} className="text-gray-500" /> {results.unanswered} Skipped</span>
                            </div>
                        </div>

                        {/* Question Breakdown */}
                        <h2 className="text-xl font-bold mb-6">Question Breakdown</h2>
                        <div className="space-y-4 mb-10">
                            {questions.map((q, idx) => {
                                const userAns = answers[idx];
                                const isCorrect = userAns === q.correctAnswer;
                                const isSkipped = userAns === undefined;

                                return (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <span className={`mt-1 shrink-0 ${isSkipped ? 'text-gray-500' : isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                                {isSkipped ? <MinusCircle size={18} /> : isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                                            </span>
                                            <p className="font-medium text-gray-200">
                                                <span className="text-gray-500 mr-2">Q{idx + 1}.</span>
                                                {q.question}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                                            {q.options.map((opt, optIdx) => {
                                                let cls = "border border-white/10 bg-white/5 text-gray-400";
                                                if (optIdx === q.correctAnswer) cls = "border-green-500/50 bg-green-500/10 text-green-300";
                                                if (optIdx === userAns && !isCorrect) cls = "border-red-500/50 bg-red-500/10 text-red-300";

                                                return (
                                                    <div key={optIdx} className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 ${cls}`}>
                                                        <span className="font-bold opacity-60">{String.fromCharCode(65 + optIdx)}.</span>
                                                        {opt}
                                                        {optIdx === q.correctAnswer && <CheckCircle2 size={14} className="ml-auto text-green-400" />}
                                                        {optIdx === userAns && !isCorrect && <XCircle size={14} className="ml-auto text-red-400" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center pb-12">
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors"
                            >
                                <Home size={18} /> Go Home
                            </button>
                            <button
                                onClick={() => {
                                    setAnswers({});
                                    setCurrentQ(0);
                                    setSubmitted(false);
                                    setTimeLeft(testData.duration * 60);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                            >
                                <RotateCcw size={18} /> Retry Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── TEST SCREEN ───
    const q = questions[currentQ];
    const answeredCount = Object.keys(answers).length;

    return (
        <div className="min-h-screen theme-bg text-white flex flex-col">
            {/* Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Top Bar */}
            <header className="sticky top-0 z-30 backdrop-blur-xl border-b border-white/10" style={{ backgroundColor: 'var(--bg-nav)' }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${testData.color} text-white flex items-center justify-center font-bold rounded-lg text-sm`}>
                            {testData.companyName[0]}
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">{testData.companyName}</h1>
                            <p className="text-gray-400 text-xs">{testData.role} Mock Test</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Progress */}
                        <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <span className="text-sm text-gray-400">Progress</span>
                            <span className="font-bold text-indigo-400">{answeredCount}/{totalQ}</span>
                        </div>

                        {/* Timer */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${timeLeft <= 300 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-white'}`}>
                            <Clock size={16} />
                            <span className="font-mono font-bold text-sm">
                                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full flex flex-col lg:flex-row gap-8">
                {/* Question Area */}
                <div className="flex-1">
                    {/* Question Number */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                            Q {currentQ + 1}
                        </span>
                        <span className="text-gray-500 text-sm">of {totalQ}</span>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed text-gray-100">
                        {q.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 mb-10">
                        {q.options.map((opt, idx) => {
                            const isSelected = answers[currentQ] === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => selectAnswer(idx)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 group
                    ${isSelected
                                            ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <span
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors
                    ${isSelected
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white/10 text-gray-400 group-hover:bg-white/20"
                                            }`}
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="text-base">{opt}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                            disabled={currentQ === 0}
                            className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>

                        {currentQ === totalQ - 1 ? (
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
                            >
                                Submit Test
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQ((c) => Math.min(totalQ - 1, c + 1))}
                                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Question Palette (Sidebar) */}
                <div className="lg:w-72 shrink-0">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-28">
                        <h3 className="font-bold text-sm text-gray-300 mb-4">Question Palette</h3>
                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {questions.map((_, idx) => {
                                const isAnswered = answers[idx] !== undefined;
                                const isCurrent = idx === currentQ;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQ(idx)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
                      ${isCurrent
                                                ? "bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0a0a0a]"
                                                : isAnswered
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : "bg-white/5 border border-white/10 text-gray-500 hover:bg-white/10"
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="space-y-2 text-xs text-gray-400 border-t border-white/10 pt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-indigo-600"></span> Current
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-green-500/20 border border-green-500/30"></span> Answered
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-white/5 border border-white/10"></span> Unanswered
                            </div>
                        </div>

                        {/* Submit from sidebar */}
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all"
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
                        <AlertTriangle size={40} className="mx-auto mb-4 text-yellow-400" />
                        <h3 className="text-xl font-bold mb-2">Submit Test?</h3>
                        <p className="text-gray-400 mb-2">
                            You have answered <span className="text-white font-bold">{answeredCount}</span> out of <span className="text-white font-bold">{totalQ}</span> questions.
                        </p>
                        {answeredCount < totalQ && (
                            <p className="text-yellow-400/80 text-sm mb-6">
                                ⚠ {totalQ - answeredCount} question(s) are unanswered and will be marked as skipped.
                            </p>
                        )}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockTestPage;
