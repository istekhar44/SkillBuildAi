import React from 'react';
import { Briefcase, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useViewMode } from '../context/ViewModeContext';
import { useTheme } from '../context/ThemeContext';

const NavBar = ({ isHero = false }) => {
    const navigate = useNavigate();
    const { toggleViewMode, isRecruiterView } = useViewMode();
    const { isDark, toggleTheme } = useTheme();

    const handleToggle = () => {
        toggleViewMode();
        if (isRecruiterView) {
            navigate('/dashboard');
        } else {
            navigate('/recruiter');
        }
    };

    return (
        <nav className="px-6 py-6 w-full z-50 transition-all duration-300 sticky top-0 backdrop-blur-xl border-b"
            style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border-light)' }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold cursor-pointer flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}
                    >
                        <Briefcase size={18} className="text-indigo-500" />
                    </div>
                    <span className="font-sans tracking-tight" style={{ color: 'var(--text-primary)' }}>SkillBridge AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>HOME</Link>
                    <Link to="/learning" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>LEARNING</Link>
                    <Link to="/resume-builder" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>RESUME BUILDER</Link>
                    <Link to="/browse" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>JOBS</Link>
                    <Link to="/companies" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>COMPANIES</Link>

                    <div className="w-px h-6" style={{ backgroundColor: 'var(--border-color)' }}></div>

                    {/* Recruiter / Student Toggle Slider */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                    >
                        <span className={`text-[10px] font-bold transition-colors ${isRecruiterView ? '' : ''}`}
                            style={{ color: isRecruiterView ? 'var(--text-primary)' : 'var(--text-muted)' }}
                        >
                            RECRUITER
                        </span>
                        <button
                            onClick={handleToggle}
                            className="relative w-11 h-6 rounded-full transition-all duration-300 hover:opacity-80"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)' }}
                            aria-label="Toggle view mode"
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg transition-transform duration-300 ${isRecruiterView ? 'translate-x-0' : 'translate-x-5'
                                    }`}
                            />
                        </button>
                        <span className={`text-[10px] font-bold transition-colors`}
                            style={{ color: !isRecruiterView ? 'var(--text-primary)' : 'var(--text-muted)' }}
                        >
                            STUDENT
                        </span>
                    </div>

                    {/* ─── Theme Toggle Slider ─── */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                    >
                        <Sun size={14} className={`transition-colors ${!isDark ? 'text-amber-500' : ''}`} style={{ color: !isDark ? undefined : 'var(--text-muted)' }} />
                        <button
                            onClick={toggleTheme}
                            className="relative w-11 h-6 rounded-full transition-all duration-300 hover:opacity-80"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)' }}
                            aria-label="Toggle theme"
                            id="theme-toggle"
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-lg transition-transform duration-300 ${isDark ? 'translate-x-5 bg-gradient-to-br from-indigo-500 to-purple-600' : 'translate-x-0 bg-gradient-to-br from-amber-400 to-orange-500'
                                    }`}
                            />
                        </button>
                        <Moon size={14} className={`transition-colors ${isDark ? 'text-indigo-400' : ''}`} style={{ color: isDark ? undefined : 'var(--text-muted)' }} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="font-medium hover:text-indigo-400 transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>LOGIN</Link>
                    <Link to="/register" className="px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg text-sm"
                        style={{
                            backgroundColor: isDark ? '#ffffff' : '#1a1a2e',
                            color: isDark ? '#000000' : '#ffffff',
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
