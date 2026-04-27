import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ApiPracticeModal from '../components/ApiPracticeModal';
import { Trophy, Flame, Calendar, CheckCircle } from 'lucide-react';

const ChallengePage = () => {
    // State for tracking progress
    const [progress, setProgress] = useState(0);
    const [completedDays, setCompletedDays] = useState([]);
    const [showPractice, setShowPractice] = useState(false);
    const navigate = useNavigate();

    // Load progress from local storage
    useEffect(() => {
        const savedProgress = JSON.parse(localStorage.getItem('100DaysCode_Progress')) || [];
        setCompletedDays(savedProgress);
        setProgress(savedProgress.length);
    }, []);

    const toggleDay = (day) => {
        let newCompleted;
        if (completedDays.includes(day)) {
            newCompleted = completedDays.filter(d => d !== day);
        } else {
            newCompleted = [...completedDays, day];
        }
        setCompletedDays(newCompleted);
        setProgress(newCompleted.length);
        localStorage.setItem('100DaysCode_Progress', JSON.stringify(newCompleted));
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />

            <div className="relative py-16 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-yellow-500/20">Official Challenge</span>
                            <span className="flex items-center gap-1 text-orange-400 font-bold"><Flame size={16} /> 1200+ Coding now</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">100 Days of Code Challenge</h1>
                        <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                            Build a coding habit that sticks. Commit to coding for at least 1 hour every day for the next 100 days.
                        </p>
                    </div>

                    {/* Stats Card (Crystal) */}
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 min-w-[320px] shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Progress</p>
                                <h3 className="text-4xl font-bold text-white mt-1">{progress}%</h3>
                            </div>
                            <div className="w-14 h-14 bg-green-500/20 rounded-2xl border border-green-500/30 flex items-center justify-center">
                                <Trophy size={28} className="text-green-400" />
                            </div>
                        </div>

                        <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-green-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#22c55e]" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-gray-400 text-xs mt-4 flex items-center gap-2">
                            <Calendar size={14} /> Only {100 - progress} days left to mastery!
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left: Progress Grid */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        Your Roadmap
                    </h2>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                            {Array.from({ length: 100 }, (_, i) => i + 1).map(day => (
                                <button
                                    key={day}
                                    onClick={() => navigate(`/challenge/${day}`)}
                                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all transform hover:scale-105 border ${completedDays.includes(day)
                                        ? 'bg-green-500 text-black border-green-400 shadow-[0_0_10px_#22c55e]'
                                        : 'bg-black/30 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-2xl flex items-start gap-4">
                        <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-xl">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Why take this challenge?</h3>
                            <p className="text-indigo-200/80 mt-1 leading-relaxed">
                                Consistency is the key to mastering software development. Tracking your streak visually leverages the "Seinfeld Strategy" — don't break the chain!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Daily Task (Crystal) */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Today's Focus</h2>

                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 sticky top-24">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 block">Day {progress + 1} Recommendation</span>
                        <h3 className="text-2xl font-bold text-white mb-6">Mastering API Requests</h3>

                        <div className="space-y-5 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                <p className="text-gray-300 text-sm leading-relaxed mt-1">Learn fetch and Axios in depth.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                <p className="text-gray-300 text-sm leading-relaxed mt-1">Build a small app fetching weather data.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                <p className="text-gray-300 text-sm leading-relaxed mt-1">Handle loading and error states.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPractice(true)}
                            className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                        >
                            Start Learning
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-6">Updated daily based on your skill level</p>
                    </div>
                </div>

            </div>

            {/* API Practice Modal */}
            <ApiPracticeModal isOpen={showPractice} onClose={() => setShowPractice(false)} />

            <Footer />
        </div>
    );
};

export default ChallengePage;
