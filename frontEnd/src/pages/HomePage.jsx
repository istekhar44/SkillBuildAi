import React, { useState } from "react";
import { Search, Briefcase, FileText, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const categories = [
    "Accounting", "Creative", "Development", "Marketing",
    "Legal", "Commercial", "Medicine", "Fitness"
];

const HomePage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-premium-black min-h-screen font-sans text-white">
            <NavBar />

            {/* ================= HERO ================= */}
            <div className="relative pt-12 pb-24 overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">

                    {/* Left Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left pt-10">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-gray-300 text-sm font-medium tracking-wide uppercase">#1 AI-Powered Job Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-white animate-fade-in-up delay-100">
                            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">career</span> <br />
                            you deserve.
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-200 mx-auto md:mx-0">
                            Unlock your potential with companies that value your talent.
                            AI-driven matching ensures you never miss the perfect opportunity.
                        </p>

                        {/* Search Component */}
                        <div className="bg-white/5 border border-white/10 p-2 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-2 max-w-xl animate-fade-in-up delay-300 mx-auto md:mx-0 group hover:bg-white/10 transition-all duration-300">
                            <div className="flex-1 flex items-center px-4 h-14 bg-black/20 rounded-xl border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                                <Search className="text-gray-400 mr-3" size={20} />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search jobs, skills, or companies..."
                                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
                                />
                            </div>
                            <button
                                onClick={() => navigate('/browse', { state: { searchQuery: search } })}
                                className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group/btn"
                            >
                                Search <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-400 animate-fade-in-up delay-400">
                            <p>Trusted by:</p>
                            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <img src="https://logo.clearbit.com/google.com" className="h-6" alt="Google" />
                                <img src="https://logo.clearbit.com/microsoft.com" className="h-6" alt="Microsoft" />
                                <img src="https://logo.clearbit.com/spotify.com" className="h-6" alt="Spotify" />
                            </div>
                        </div>
                    </div>

                    {/* Right Visuals */}
                    <div className="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center perspective-1000">
                        {/* Abstract Gradient Blob behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[60px] opacity-40 animate-pulse-slow"></div>

                        {/* Main Image Container */}
                        <div className="relative z-10 w-full max-w-lg">
                            <img
                                src="/hero_man_final.jpg"
                                alt="Professional"
                                className="w-full h-auto object-cover rounded-3xl shadow-2xl border border-white/10 rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out brightness-110 contrast-105"
                            />

                            {/* Floating Stats Card 1 */}
                            <div className="absolute -left-8 top-20 bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl animate-float-slow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">24k+</p>
                                        <p className="text-gray-400 text-xs">Active Jobs</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Card 2 */}
                            <div className="absolute -right-8 bottom-20 bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl animate-float-delayed">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">10k+</p>
                                        <p className="text-gray-400 text-xs">Companies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= CATEGORIES ================= */}
            <section className="text-center py-20 px-6">
                <h2 className="text-4xl font-bold mb-4 text-white">
                    Search desired job by Categories
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-14">
                    Find your dream job very easily here by searching the job name. We are providing high demands job for all the job seekers
                </p>

                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            to={`/browse?category=${cat}`}
                            key={cat}
                            className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center gap-4 group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl transition-colors ${idx % 4 === 0 ? 'bg-red-500/20 text-red-400' : idx % 4 === 1 ? 'bg-purple-500/20 text-purple-400' : idx % 4 === 2 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                {cat[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-200 text-sm group-hover:text-indigo-400">{cat}</h3>
                                <p className="text-gray-500 text-xs mt-1">20 Jobs</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= TABS ================= */}
            {/* ================= TABS (Animated Logo Slider) ================= */}
            <div className="bg-transparent py-12 text-white border-t border-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

                <div className="max-w-[1920px] mx-auto flex items-center gap-12 animate-scroll w-max hover:[animation-play-state:paused]">
                    {/* Doubled the list for seamless looping */}
                    {[...["Product designer", "Marketing", "Front-end", "3D illustrator", "Graphics Designer", "UX designer", "Data Scientist", "Project Manager", "DevOps Engineer", "Product designer", "Marketing", "Front-end", "3D illustrator", "Graphics Designer", "UX designer", "Data Scientist", "Project Manager", "DevOps Engineer"]].map((tab, i) => (
                        <button key={`${tab}-${i}`} className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 hover:from-white hover:to-indigo-400 transition-all whitespace-nowrap cursor-pointer px-4">
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= SECTIONS: Competitions, Internships, Jobs, Mock Tests ================= */}
            <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

                {/* 1. Competitions */}
                <SectionContainer title="Competitions" subtitle="Uncover the most talked-about competitions today.">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[350px] bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all cursor-pointer flex gap-4 items-start group">
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                <img src={`https://logo.clearbit.com/${i === 1 ? 'tiss.edu' : i === 2 ? 'google.com' : 'amazon.com'}`} className="w-10 h-10 object-contain mix-blend-multiply" onError={(e) => e.target.style.display = 'none'} />
                                <span className="text-orange-500 font-bold text-xl absolute">🏆</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 line-clamp-1">Business Case Challenge</h3>
                                <p className="text-sm text-gray-400 mb-3">Tata Institute of Social Sciences</p>
                                <div className="flex gap-2 text-xs text-gray-400 font-medium">
                                    <span className="bg-white/10 px-2 py-1 rounded">Undergraduate</span>
                                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded">Online</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </SectionContainer>

                {/* 2. Internships */}
                <SectionContainer title="Internships" subtitle="Unleash internships tailored to your aspirations.">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">₹ 20K/Month</span>
                                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 mt-1">Marketing Intern</h3>
                                    <p className="text-sm text-gray-400">Kanodia Technoplast Ltd</p>
                                </div>
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                                    <Briefcase size={20} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4">
                                <span className="flex items-center gap-1"><User size={14} /> In Office</span>
                                <span className="flex items-center gap-1"><Search size={14} /> Delhi</span>
                                <span className="ml-auto text-indigo-400 font-medium">Apply &rarr;</span>
                            </div>
                        </div>
                    ))}
                </SectionContainer>

                {/* 3. Jobs */}
                <SectionContainer title="Jobs" subtitle="Unveil jobs designed for your next big move.">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">6 - 8 LPA</span>
                                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 mt-1">Retail Sales Associate</h3>
                                    <p className="text-sm text-gray-400">Dial2Go</p>
                                </div>
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                                    <div className="font-bold text-gray-400">D2G</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4">
                                <span className="flex items-center gap-1"><Briefcase size={14} /> Fresher</span>
                                <span className="flex items-center gap-1"><Search size={14} /> Chennai</span>
                                <span className="ml-auto text-indigo-400 font-medium">View Job &rarr;</span>
                            </div>
                        </div>
                    ))}
                </SectionContainer>

                {/* 4. Company Mock Tests */}
                <SectionContainer title="Company Mock Tests" subtitle="Unlock 360° prep with realistic, AI-powered mock exams.">
                    <div className="flex flex-col w-full">
                        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                            {['Tech', 'Management', 'General', 'Aptitude'].map(tag => (
                                <button key={tag} className="border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-sm hover:border-indigo-400 hover:text-indigo-400 transition-colors whitespace-nowrap">
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                            {[
                                { name: 'TCS', role: 'Software Engineer', logo: 'tcs.com', color: 'bg-black' },
                                { name: 'NVIDIA', role: 'Embedded Engineer', logo: 'nvidia.com', color: 'bg-green-600' },
                                { name: 'Accenture', role: 'Analyst', logo: 'accenture.com', color: 'bg-purple-600' },
                                { name: 'Deloitte', role: 'Consultant', logo: 'deloitte.com', color: 'bg-green-900' }
                            ].map((company, i) => (
                                <div key={i} className="min-w-[280px] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-indigo-500 transition-colors group">
                                    <div className="h-16 w-full flex items-center justify-center mb-4">
                                        <div className={`h-12 w-12 ${company.color} text-white flex items-center justify-center font-bold rounded`}>
                                            {company.name[0]}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-1">{company.role}</h3>
                                    <p className="text-gray-400 text-sm mb-6">{company.name}</p>
                                    <button className="w-full py-2 rounded-full border border-white/20 text-gray-300 text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
                                        Start Test
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionContainer>

            </div>
            <Footer />
        </div>
    );
};

const StatCard = ({ title, desc, color }) => {
    const colors = {
        yellow: "bg-yellow-100 text-yellow-700",
        pink: "bg-pink-100 text-pink-700",
        green: "bg-green-100 text-green-700",
        orange: "bg-orange-100 text-orange-700"
    };

    return (
        <div className={`p-6 rounded-xl ${colors[color]}`}>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm">{desc}</p>
        </div>
    );
};

export default HomePage;

const SectionContainer = ({ title, subtitle, children }) => (
    <section>
        <div className="flex items-start justify-between mb-8">
            <div className="flex gap-4">
                <div className="w-1.5 h-16 bg-indigo-500 rounded-full"></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-gray-400 mt-1">{subtitle}</p>
                </div>
            </div>
            <button className="text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-500/20 transition-colors flex items-center gap-1">
                View All <span className="text-lg">→</span>
            </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
            {children}
        </div>
    </section>
);
