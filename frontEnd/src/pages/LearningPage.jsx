import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const LearningPage = () => {
    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            <div className="relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">SkillBridge Learning Center</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Master the skills you need to land your dream job. Join hackathons, take practice tests, and learn from experts.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* --- 100 Days of Code Banner (Crystal) -- */}
                <div onClick={() => window.location.href = '/challenge'} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-16 text-white flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-white/10 transition-all relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-lg">RECOMMENDED FOR YOU</div>
                        <h2 className="text-3xl font-bold mb-2 tracking-tight">100 Days of Code Challenge</h2>
                        <p className="text-gray-300 max-w-lg mb-6">Join 1200+ developers in a consistency marathon. Track your progress, build habits, and master your stack.</p>
                        <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">Start Challenge &rarr;</button>
                    </div>
                    <div className="relative z-10 hidden md:block">
                        <div className="w-32 h-32 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/10 shadow-inner">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-green-400">0%</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Progress</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. Hackathons (Crystal Cards) */}
                <section className="mb-16">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Upcoming Hackathons</h2>
                            <p className="text-gray-400 mt-1">Compete with the best and build your portfolio.</p>
                        </div>
                        <button className="text-white/70 hover:text-white font-medium hover:underline transition-colors">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group hover:border-white/30 transition-all hover:-translate-y-1">
                                <div className="h-40 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 relative">
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white font-bold">
                                        Live
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-indigo-400 transition-colors">Global AI Challenge 2026</h3>
                                    <p className="text-sm text-gray-400 mb-4">Build the future of specific AI agents in this 48-hour sprint.</p>
                                    <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">
                                        <span className="text-gray-500">📅 Feb 15, 2026</span>
                                        <span className="font-bold text-green-400">$10,000 Prize</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Mock Tests (Crystal Panel) */}
                <section className="mb-16">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
                        <div className="max-w-2xl relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Test your knowledge</h2>
                            <p className="text-gray-300 mb-8 text-lg font-light">
                                Take our industry-standard mock interviews and quizzes to identify your weak spots before the real interview.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {['React Assessment', 'Data Structures', 'System Design', 'Python Basic'].map(tag => (
                                    <span key={tag} className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-white/20 hover:scale-105 transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center relative z-10">
                            <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <span className="text-5xl">📝</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Courses (Crystal Cards) */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Recommended Courses</h2>
                            <p className="text-gray-400 mt-1">Curated learning paths based on your profile.</p>
                        </div>
                        <button className="text-white/70 hover:text-white font-medium hover:underline transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group">
                                <div className="h-32 bg-gray-800/50 rounded-xl mb-4 border border-white/5"></div>
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded inline-block">Development</span>
                                    <h4 className="font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">Advanced MERN Stack pattern design</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                                        <span className="text-yellow-500">★ 4.8</span>
                                        <span>•</span>
                                        <span>12h 30m</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default LearningPage;
