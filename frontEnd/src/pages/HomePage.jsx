import React, { useState } from "react";
import { Search, Briefcase, FileText, User, Calculator, Palette, Code, Megaphone, Scale, ShoppingCart, HeartPulse, Dumbbell } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RegistrationModal from "../components/RegistrationModal";

const categories = [
    { name: "Accounting", icon: Calculator, logoUrl: "https://i.pinimg.com/474x/d3/5f/e6/d35fe6868276a8ec59b5b8b3d2fc4677.jpg" },
    { name: "Creative", icon: Palette, logoUrl: "https://i.pinimg.com/1200x/bb/35/14/bb35142f2a709c75fee37d8a5b44e0a1.jpg" },
    { name: "Development", icon: Code, logoUrl: "https://i.pinimg.com/736x/1d/b8/2d/1db82d67dee4f22964e1658c3d332da7.jpg" },
    { name: "Marketing", icon: Megaphone, logoUrl: "https://i.pinimg.com/736x/b5/e9/78/b5e9785731b3b1e7afe6aff9ebcb031e.jpg" },
    { name: "Legal", icon: Scale, logoUrl: "https://i.pinimg.com/1200x/fa/25/03/fa25037cd56857bc4064956beb8495a9.jpg" },
    { name: "Commercial", icon: ShoppingCart, logoUrl: "https://i.pinimg.com/736x/5b/3d/e1/5b3de14a58c349253f2c55961d122ca6.jpg" },
    { name: "Medicine", icon: HeartPulse, logoUrl: "https://i.pinimg.com/1200x/f2/96/2d/f2962dd945fe020bab500ac4a51d275d.jpg" },
    { name: "Fitness", icon: Dumbbell, logoUrl: "https://i.pinimg.com/1200x/d3/45/e9/d345e96e1877bdd99080130c75464d31.jpg" },
];

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContext, setModalContext] = useState("");
    const navigate = useNavigate();

    const openRegistration = (context) => {
        setModalContext(context);
        setModalOpen(true);
    };

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
                            <div className="flex gap-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/1280px-Google_Translate_logo.svg.png?20210606111727" className="h-6" alt="Google" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/640px-Windows_logo_-_2021.svg.png" className="h-6" alt="Microsoft" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Amazon_Kindle_logo.svg/640px-Amazon_Kindle_logo.svg.png" className="h-6" alt="Amazon" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Spotify_2.png/640px-Spotify_2.png" className="h-6" alt="Spotify" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/640px-Google_Play_Store_badge_EN.svg.png" className="h-6" alt="Playstore" />
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
                    {categories.map(({ name, icon: Icon, logoUrl }, idx) => (
                        <Link
                            to={`/browse?category=${name}`}
                            key={name}
                            className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center gap-4 group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-colors ${idx % 4 === 0 ? 'bg-red-500/20 text-red-400' : idx % 4 === 1 ? 'bg-purple-500/20 text-purple-400' : idx % 4 === 2 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                {logoUrl ? (
                                    <img src={logoUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                ) : null}
                                <Icon size={24} style={logoUrl ? { display: 'none' } : {}} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-200 text-sm group-hover:text-indigo-400">{name}</h3>
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
                    {[
                        { title: 'Business Case Challenge', org: 'Tata Institute of Social Sciences', level: 'Undergraduate', mode: 'Online', logoUrl: 'https://i.pinimg.com/1200x/fc/c5/44/fcc544b9bff026d82feb990b9a4f6186.jpg' },
                        { title: 'Code Sprint 2026', org: 'Google India', level: 'Open for All', mode: 'Hybrid', logoUrl: 'https://i.pinimg.com/736x/60/1c/69/601c69273969aaf4fa7c41be80194204.jpg' },
                        { title: 'Innovation Marathon', org: 'Amazon Web Services', level: 'Graduate', mode: 'Online', logoUrl: 'https://i.pinimg.com/1200x/4a/41/7d/4a417d1f8cab870d4e93498ae1ae2d21.jpg' },
                    ].map((comp, i) => (
                        <div key={i} onClick={() => openRegistration(comp.title)} className="min-w-[350px] bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all cursor-pointer flex gap-4 items-start group">
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                                <img src={comp.logoUrl} alt={comp.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                <span className="text-orange-500 font-bold text-xl hidden items-center justify-center">🏆</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 line-clamp-1">{comp.title}</h3>
                                <p className="text-sm text-gray-400 mb-3">{comp.org}</p>
                                <div className="flex gap-2 text-xs text-gray-400 font-medium">
                                    <span className="bg-white/10 px-2 py-1 rounded">{comp.level}</span>
                                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded">{comp.mode}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </SectionContainer>

                {/* 2. Internships */}
                <SectionContainer title="Internships" subtitle="Unleash internships tailored to your aspirations.">
                    {[
                        { title: 'Marketing Intern', company: 'Zomato', salary: '₹ 20K/Month', type: 'In Office', location: 'Delhi', logoUrl: 'https://i.pinimg.com/736x/ed/30/4f/ed304fe30e831b2f6114fbdc56dec3ad.jpg' },
                        { title: 'Frontend Developer Intern', company: 'Flipkart', salary: '₹ 25K/Month', type: 'Remote', location: 'Bangalore', logoUrl: 'https://i.pinimg.com/736x/33/b2/25/33b225e7ad61fd5dfc3cb14661b9f604.jpg' },
                        { title: 'Data Analyst Intern', company: 'Blinkit', salary: '₹ 15K/Month', type: 'Hybrid', location: 'Gurgaon', logoUrl: 'https://i.pinimg.com/736x/a5/69/d1/a569d1d358139234ba666b49483db544.jpg' },
                    ].map((intern, i) => (
                        <div key={i} onClick={() => openRegistration(intern.title)} className="min-w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">{intern.salary}</span>
                                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 mt-1">{intern.title}</h3>
                                    <p className="text-sm text-gray-400">{intern.company}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img src={intern.logoUrl} alt={intern.company} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                    <Briefcase size={20} className="text-gray-400 hidden" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4">
                                <span className="flex items-center gap-1"><User size={14} /> {intern.type}</span>
                                <span className="flex items-center gap-1"><Search size={14} /> {intern.location}</span>
                                <span className="ml-auto text-indigo-400 font-medium">Apply &rarr;</span>
                            </div>
                        </div>
                    ))}
                </SectionContainer>

                {/* 3. Jobs */}
                <SectionContainer title="Jobs" subtitle="Unveil jobs designed for your next big move.">
                    {[
                        { title: 'Retail Sales Associate', company: 'Dial2Go', salary: '6 - 8 LPA', exp: 'Fresher', location: 'Chennai', logoUrl: 'https://i.pinimg.com/1200x/ca/14/27/ca1427353346347cb0107ba21e295189.jpg' },
                        { title: 'Full Stack Developer', company: 'Infosys', salary: '8 - 12 LPA', exp: '1-3 Yrs', location: 'Pune', logoUrl: 'https://i.pinimg.com/1200x/89/0c/25/890c250fe129488a586b1a99e8b68107.jpg' },
                        { title: 'Product Manager', company: 'Paytm', salary: '15 - 20 LPA', exp: '3-5 Yrs', location: 'Noida', logoUrl: 'https://i.pinimg.com/736x/29/7a/18/297a18bfb75f78339c1d8a91f0dd48a9.jpg' },
                    ].map((job, i) => (
                        <div key={i} onClick={() => openRegistration(job.title)} className="min-w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">{job.salary}</span>
                                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 mt-1">{job.title}</h3>
                                    <p className="text-sm text-gray-400">{job.company}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                    <div className="font-bold text-gray-400 hidden items-center justify-center">{job.company[0]}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4">
                                <span className="flex items-center gap-1"><Briefcase size={14} /> {job.exp}</span>
                                <span className="flex items-center gap-1"><Search size={14} /> {job.location}</span>
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
                                { name: 'TCS', role: 'Software Engineer', logo: 'https://i.pinimg.com/736x/05/43/29/054329d9f175094c212a2552a6081dff.jpg', color: 'bg-black' },
                                { name: 'NVIDIA', role: 'Embedded Engineer', logo: 'https://i.pinimg.com/1200x/55/4f/68/554f682b3b9f1281542e7951283f2829.jpg', color: 'bg-green-600' },
                                { name: 'Accenture', role: 'Analyst', logo: 'https://i.pinimg.com/736x/c8/dc/e1/c8dce16663e5e2d215231332e9e6287e.jpg', color: 'bg-purple-600' },
                                { name: 'Deloitte', role: 'Consultant', logo: 'https://i.pinimg.com/736x/5b/6e/ee/5b6eee8cd07747734f93a0b7c87eecd9.jpg', color: 'bg-green-900' }
                            ].map((company, i) => (
                                <div key={i} className="min-w-[280px] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-indigo-500 transition-colors group">
                                    <div className="h-16 w-full flex items-center justify-center mb-4">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="h-14 w-14 object-contain rounded-lg"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                        <div className={`h-14 w-14 ${company.color} text-white items-center justify-center font-bold rounded-lg text-xl hidden`}>
                                            {company.name[0]}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-1">{company.role}</h3>
                                    <p className="text-gray-400 text-sm mb-6">{company.name}</p>
                                    <button
                                        onClick={() => navigate(`/mock-test/${company.name.toLowerCase()}`)}
                                        className="w-full py-2 rounded-full border border-white/20 text-gray-300 text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all"
                                    >
                                        Start Test
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionContainer>

            </div>
            <Footer />

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                context={modalContext}
            />
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
