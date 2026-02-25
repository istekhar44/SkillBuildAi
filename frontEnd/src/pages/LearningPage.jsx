import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const coursesData = [
    {
        title: 'Advanced MERN Stack Patterns',
        category: 'Development',
        rating: '4.8',
        duration: '12h 30m',
        image: 'https://i.pinimg.com/1200x/52/19/d9/5219d9b3f4606ed553479e91b2b9b8d2.jpg',
        color: 'text-indigo-300 bg-indigo-500/20',
        playlistTitle: 'MERN Stack Full Course | Hindi',
        channel: 'Apna College',
        videos: [
            { id: 'HcOc7P5BMi4', title: 'MERN Stack Tutorial #1 - What is MERN?', duration: '2:10:25' },
            { id: 'ESnrn1kAD4E', title: 'MERN Stack Tutorial #2 - Express Setup', duration: '7:15:42' },
            { id: 'ChVE-JbtYbM', title: 'MERN Stack Tutorial #3 - MongoDB Connection', duration: '12:30' },
            { id: 'f2EqECiTBL8', title: 'MERN Stack Tutorial #4 - React Frontend Setup', duration: '18:15' },
            { id: '0riHps91AzE', title: 'MERN Stack Tutorial #5 - REST API Design', duration: '20:08' },
            { id: 'DSp3RMd0zR0', title: 'MERN Stack Tutorial #6 - CRUD Operations', duration: '22:41' },
            { id: 'w3vs4a03y3I', title: 'MERN Stack Tutorial #7 - Authentication & JWT', duration: '25:30' },
            { id: 'a3ClYv4QQKM', title: 'MERN Stack Tutorial #8 - React Router v6', duration: '14:55' },
            { id: 'Xbe7wfMByhc', title: 'MERN Stack Tutorial #9 - State Management', duration: '19:20' },
            { id: 'CvCiNeLnZ00', title: 'MERN Stack Tutorial #10 - Deployment Guide', duration: '16:45' },
        ],
    },
    {
        title: 'Data Structures & Algorithms',
        category: 'Computer Science',
        rating: '4.9',
        duration: '18h 45m',
        image: 'https://i.pinimg.com/1200x/11/8d/48/118d48909bba9064aa8a52361fe99016.jpg',
        color: 'text-green-300 bg-green-500/20',
        playlistTitle: 'DSA Full Course | Hindi',
        channel: 'Apna College',
        videos: [
            { id: 'sz1qaKt0KGQ', title: 'DSA #1 - Introduction to Data Structures', duration: '14:20' },
            { id: 'gCjOSCuIAHI', title: 'DSA #2 - Time & Space Complexity', duration: '22:35' },
            { id: 'HGk_nzmkEOA', title: 'DSA #3 - Arrays Explained', duration: '18:45' },
            { id: 'oAEsSyRtabo', title: 'DSA #4 - Linked Lists Deep Dive', duration: '25:10' },
            { id: 'rI2EBUEMfTk', title: 'DSA #5 - Stacks & Queues', duration: '20:55' },
            { id: 'WbzNRTTrX0g', title: 'DSA #6 - Recursion & Backtracking', duration: '28:30' },
            { id: 'UcTKk2y_3d4', title: 'DSA #7 - Binary Trees', duration: '24:15' },
            { id: 'jTO_RYil_vg', title: 'DSA #8 - Graph Algorithms', duration: '30:40' },
            { id: 'kPRA0W1kECg', title: 'DSA #9 - Sorting Algorithms', duration: '19:50' },
            { id: 'ZA-tUyM_y7s', title: 'DSA #10 - Dynamic Programming', duration: '35:20' },
        ],
    },
    {
        title: 'UI/UX Design Masterclass',
        category: 'Design',
        rating: '4.7',
        duration: '9h 15m',
        image: 'https://i.pinimg.com/736x/ab/d4/7c/abd47c9707684240c25ae7b5db48eb50.jpg',
        color: 'text-pink-300 bg-pink-500/20',
        playlistTitle: 'UI/UX Design Tutorial | Hindi',
        channel: 'DesignBoat School',
        videos: [
            { id: '68w2VwalD5w', title: 'UI/UX #1 - What is UI/UX Design?', duration: '11:30' },
            { id: '68w2VwalD5w', title: 'UI/UX #2 - Design Thinking Process', duration: '16:45' },
            { id: 'wIuVvCuiJhU', title: 'UI/UX #3 - Wireframing Basics', duration: '13:20' },
            { id: 'FTFaQWZBqQ8', title: 'UI/UX #4 - Color Theory for UI', duration: '15:55' },
            { id: 'YqQx75OPRa0', title: 'UI/UX #5 - Typography in Design', duration: '12:40' },
            { id: 'wMmkSd5F_BI', title: 'UI/UX #6 - Figma Crash Course', duration: '28:15' },
            { id: 'gOSd1D2RnYY', title: 'UI/UX #7 - Prototyping & Interaction', duration: '20:30' },
            { id: '_P3CrgFlXhg', title: 'UI/UX #8 - Responsive Design', duration: '17:10' },
            { id: 'pkGfkYEi9SA', title: 'UI/UX #9 - Usability Testing', duration: '14:25' },
            { id: 'X0bP7JxceBY', title: 'UI/UX #10 - Building a Portfolio', duration: '19:50' },
        ],
    },
    {
        title: 'Machine Learning with Python',
        category: 'AI / ML',
        rating: '4.9',
        duration: '22h 10m',
        image: 'https://i.pinimg.com/736x/c9/f3/90/c9f390fa9f59a5606aca1e1b02f0180b.jpg',
        color: 'text-orange-300 bg-orange-500/20',
        playlistTitle: 'Machine Learning Full Course | Hindi',
        channel: 'CodeWithHarry',
        videos: [
            { id: '7uwa9aPbBRU', title: 'ML #1 - What ', duration: '18:30' },
            { id: 'gmvvaobm7eQ', title: 'ML #2 - Types of ML Algorithms', duration: '22:15' },
            { id: 'jGwO_UgTS7I', title: 'ML #3 - Linear Regression', duration: '25:40' },
            { id: 'PPcgtx0sI2E', title: 'ML #4 - Logistic Regression', duration: '20:55' },
            { id: 'FB5EdxAGxQg', title: 'ML #5 - Decision Trees', duration: '19:30' },
            { id: 'nxFG5513HbQ', title: 'ML #6 - Random Forest', duration: '23:45' },
            { id: 'vStJoetOxJg', title: 'ML #7 - Support Vector Machines', duration: '27:10' },
            { id: 'X2vAabgKiuM', title: 'ML #8 - Neural Networks Intro', duration: '30:20' },
            { id: 'IHZwWFHWa-w', title: 'ML #9 - Deep Learning Basics', duration: '28:35' },
            { id: '8HyCNIVRbSU', title: 'ML #10 - Model Deployment', duration: '16:50' },
        ],
    },
];

const LearningPage = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    const openPlaylist = (course) => {
        setSelectedCourse(course);
        setActiveVideoIndex(0);
    };

    const closePlaylist = () => {
        setSelectedCourse(null);
        setActiveVideoIndex(0);
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
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
                        {[
                            {
                                title: 'Global AI Challenge 2026',
                                desc: 'Build the future of AI agents in this 48-hour sprint.',
                                date: '📅 Mar 10, 2026',
                                prize: '$10,000 Prize',
                                badge: 'Live',
                                image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
                            },
                            {
                                title: 'HackSprint — Web3 Edition',
                                desc: 'Decentralize the web. Build dApps, smart contracts & more.',
                                date: '📅 Apr 5, 2026',
                                prize: '$7,500 Prize',
                                badge: 'Upcoming',
                                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
                            },
                            {
                                title: 'HealthTech Innovate',
                                desc: 'Solve real healthcare problems using tech & AI models.',
                                date: '📅 May 20, 2026',
                                prize: '$5,000 Prize',
                                badge: 'Registration Open',
                                image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
                            },
                        ].map((hack, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group hover:border-white/30 transition-all hover:-translate-y-1">
                                <div className="h-40 relative overflow-hidden">
                                    <img
                                        src={hack.image}
                                        alt={hack.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white font-bold">
                                        {hack.badge}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-indigo-400 transition-colors">{hack.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4">{hack.desc}</p>
                                    <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">
                                        <span className="text-gray-500">{hack.date}</span>
                                        <span className="font-bold text-green-400">{hack.prize}</span>
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
                            <h2 className="text-3xl font-bold text-white mb-4">Get Admission Top Institution</h2>
                            <p className="text-gray-300 mb-8 text-lg font-light">
                                Established: 1999 by the Delhi Sikh Gurdwara Management Committee (DSGMC).
                                Location: G-8 Area, Rajouri Garden, New Delhi - 110064.
                                Affiliation & Accreditation: Affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), Delhi, and approved by AICTE.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {['Electronics & Communication Engineering', 'Computer Science & Engineering', 'Information Technology', 'Artificial Intelligence'].map(tag => (
                                    <span key={tag} className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-white/20 hover:scale-105 transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center relative z-10">
                            <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwBAKy4PqgGlp7pZFiIwqKmO0sJ3lz_WLog&s"
                                    alt="Mock Tests"
                                    className="w-full h-full object-cover"
                                />
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
                        {coursesData.map((course, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group">
                                <div className="h-32 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <span className={`text-xs font-bold ${course.color} px-2 py-1 rounded inline-block`}>{course.category}</span>
                                    <h4 className="font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">{course.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                                        <span className="text-yellow-500">★ {course.rating}</span>
                                        <span>•</span>
                                        <span>{course.duration}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openPlaylist(course); }}
                                        className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-95"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186a2.506 2.506 0 00-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 001.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814z" /><path d="M10 15.464V8.536L16 12l-6 3.464z" fill="#fff" /></svg>
                                        Watch 10 Videos
                                        <span className="ml-auto">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* ======= YouTube Playlist Modal ======= */}
            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={closePlaylist}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

                    {/* Modal Container */}
                    <div
                        className="relative z-10 w-[96vw] max-w-[1400px] h-[88vh] bg-[#0f0f0f] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/50 border border-white/5"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: 'playlistSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        {/* Left Side — Video Player */}
                        <div className="flex-1 flex flex-col bg-black min-h-0">
                            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedCourse.videos[activeVideoIndex].id}?autoplay=1&rel=0`}
                                    title={selectedCourse.videos[activeVideoIndex].title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            {/* Video Info Below Player */}
                            <div className="p-5 flex-shrink-0">
                                <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-2">
                                    {selectedCourse.videos[activeVideoIndex].title}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                                            {selectedCourse.channel.charAt(0)}
                                        </div>
                                        {selectedCourse.channel}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span>Video {activeVideoIndex + 1} of {selectedCourse.videos.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side — Playlist Sidebar */}
                        <div className="w-full md:w-[420px] bg-[#0f0f0f] border-l border-white/5 flex flex-col min-h-0">
                            {/* Sidebar Header */}
                            <div className="p-4 border-b border-white/10 flex-shrink-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0 mr-3">
                                        <h4 className="text-white font-bold text-base truncate">
                                            {selectedCourse.playlistTitle}
                                        </h4>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {selectedCourse.channel} • {activeVideoIndex + 1}/{selectedCourse.videos.length}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {/* Shuffle Icon */}
                                        <button className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
                                        </button>
                                        {/* Repeat Icon */}
                                        <button className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
                                        </button>
                                        {/* Kebab Menu */}
                                        <button className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                        </button>
                                        {/* Close Button */}
                                        <button
                                            onClick={closePlaylist}
                                            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 ml-1"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Video List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {selectedCourse.videos.map((video, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveVideoIndex(idx)}
                                        className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer transition-all duration-200 group/item
                                            ${idx === activeVideoIndex
                                                ? 'bg-white/10'
                                                : 'hover:bg-white/5'
                                            }`}
                                    >
                                        {/* Video Number */}
                                        <div className="flex-shrink-0 w-6 flex items-center justify-center pt-2.5">
                                            {idx === activeVideoIndex ? (
                                                <div className="flex flex-col gap-[2px]">
                                                    <div className="w-2 h-2 bg-white rounded-sm animate-pulse" />
                                                    <div className="w-2 h-3 bg-white rounded-sm animate-pulse" style={{ animationDelay: '0.15s' }} />
                                                    <div className="w-2 h-1.5 bg-white rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-500 font-medium">{idx + 1}</span>
                                            )}
                                        </div>

                                        {/* Thumbnail */}
                                        <div className="relative flex-shrink-0 w-[120px] h-[68px] rounded-lg overflow-hidden bg-white/5">
                                            <img
                                                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Duration Badge */}
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                                                {video.duration}
                                            </div>
                                            {/* Play overlay on hover */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>

                                        {/* Video Info */}
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <h5 className={`text-sm font-medium leading-snug line-clamp-2 transition-colors
                                                ${idx === activeVideoIndex ? 'text-white' : 'text-gray-300 group-hover/item:text-white'}`}>
                                                {video.title}
                                            </h5>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{selectedCourse.channel}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Playlist Modal Animation + Custom Scrollbar */}
            <style>{`
                @keyframes playlistSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.15);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.25);
                }
            `}</style>

            <Footer />
        </div>
    );
};

export default LearningPage;
