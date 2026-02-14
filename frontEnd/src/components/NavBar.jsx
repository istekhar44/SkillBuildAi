import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useViewMode } from '../context/ViewModeContext';

const NavBar = ({ isHero = false }) => {
    const location = useLocation();
    const { viewMode, toggleViewMode, isRecruiterView } = useViewMode();

    // Crystal Theme Styles
    const textColor = 'text-white';

    // Check if we're on a recruiter page
    const isRecruiterPage = location.pathname.includes('/recruiter') || location.pathname.includes('/pipeline');

    return (
        <nav className={`px-6 py-6 w-full z-50 transition-all duration-300 sticky top-0 bg-premium-black/80 backdrop-blur-xl border-b border-white/5`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold cursor-pointer flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg">
                        <Briefcase size={18} />
                    </div>
                    <span className="text-white font-sans tracking-tight">SkillBridge AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>HOME</Link>
                    <Link to="/learning" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>LEARNING</Link>
                    <Link to="/resume-builder" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>RESUME BUILDER</Link>
                    <Link to="/browse" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>JOBS</Link>
                    <Link to="/companies" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>COMPANIES</Link>

                    <div className="w-px h-6 bg-white/10"></div>

                    <div className="flex items-center gap-3">
                        <Link to="/recruiter" className={`${textColor} font-bold hover:text-white transition-colors text-xs flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10`}>
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            FOR RECRUITERS
                        </Link>

                        {/* View Mode Toggle - Only show on recruiter pages */}
                        {isRecruiterPage && (
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                <span className={`text-[10px] font-bold transition-colors ${isRecruiterView ? 'text-white' : 'text-gray-500'}`}>
                                    RECRUITER
                                </span>
                                <button
                                    onClick={toggleViewMode}
                                    className="relative w-11 h-6 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20"
                                    aria-label="Toggle view mode"
                                >
                                    <div
                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg transition-transform duration-300 ${isRecruiterView ? 'translate-x-0' : 'translate-x-5'
                                            }`}
                                    />
                                </button>
                                <span className={`text-[10px] font-bold transition-colors ${!isRecruiterView ? 'text-white' : 'text-gray-500'}`}>
                                    STUDENT
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className={`${textColor} font-medium hover:text-indigo-400 transition-colors text-sm`}>LOGIN</Link>
                    <Link to="/register" className="bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg text-sm">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
