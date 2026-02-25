import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase, Facebook, Twitter, Linkedin, Instagram, Github,
    Mail, Phone, MapPin, Send, CheckCircle, ArrowUpRight, Sparkles,
    GraduationCap, Building2, FileText, Zap, Youtube
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const { isDark } = useTheme();

    const handleSubscribe = async () => {
        if (!email.trim()) {
            setStatus('error');
            setMessage('Please enter your email address.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message);
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }

        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubscribe();
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden"
            style={{ backgroundColor: isDark ? '#0a1628' : '#f0f2f7', color: 'var(--text-primary)' }}
        >
            {/* Ambient Glow Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Footer Grid */}
            <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                <Briefcase size={20} className="text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                Skill<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Build</span>Ai
                            </span>
                        </Link>
                        <p className="mb-8 leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                            Empowering careers through AI-driven job matching, skill-building, and professional development. Your next opportunity starts here.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Linkedin size={16} />} href="https://linkedin.com" label="LinkedIn" isDark={isDark} />
                            <SocialIcon icon={<Github size={16} />} href="https://github.com" label="GitHub" isDark={isDark} />
                            <SocialIcon icon={<Twitter size={16} />} href="https://twitter.com" label="Twitter" isDark={isDark} />
                            <SocialIcon icon={<Instagram size={16} />} href="https://instagram.com" label="Instagram" isDark={isDark} />
                            <SocialIcon icon={<Youtube size={16} />} href="https://youtube.com" label="YouTube" isDark={isDark} />
                        </div>
                    </div>

                    {/* For Job Seekers */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>For Job Seekers</h4>
                        <ul className="space-y-3.5">
                            <FooterLink to="/browse" icon={<Briefcase size={13} />} label="Browse Jobs" />
                            <FooterLink to="/companies" icon={<Building2 size={13} />} label="Companies" />
                            <FooterLink to="/resume-builder" icon={<FileText size={13} />} label="Resume Builder" />
                            <FooterLink to="/learning" icon={<GraduationCap size={13} />} label="Learning Center" />
                            <FooterLink to="/challenge" icon={<Zap size={13} />} label="100 Days Challenge" />
                        </ul>
                    </div>

                    {/* For Recruiters */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>For Recruiters</h4>
                        <ul className="space-y-3.5">
                            <FooterLink to="/post-job" label="Post a Job" />
                            <FooterLink to="/recruiter" label="Recruiter Dashboard" />
                            <FooterLink to="/pipeline" label="Candidate Pipeline" />
                            <FooterLink to="/dashboard" label="Analytics" />
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>Company</h4>
                        <ul className="space-y-3.5">
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="#" label="Careers" badge="Hiring" />
                            <FooterLink to="#" label="Blog" />
                            <FooterLink to="#" label="Privacy Policy" />
                            <FooterLink to="#" label="Terms of Service" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>Get In Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: 'var(--bg-card)' }}
                                >
                                    <MapPin size={14} className="text-indigo-400" />
                                </div>
                                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>123 Innovation Drive,<br />Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: 'var(--bg-card)' }}
                                >
                                    <Phone size={14} className="text-indigo-400" />
                                </div>
                                <a href="tel:+15551234567" className="text-sm transition-colors hover:text-indigo-400" style={{ color: 'var(--text-secondary)' }}>+1 (555) 123-4567</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: 'var(--bg-card)' }}
                                >
                                    <Mail size={14} className="text-indigo-400" />
                                </div>
                                <a href="mailto:support@skillbuildai.com" className="text-sm transition-colors hover:text-indigo-400" style={{ color: 'var(--text-secondary)' }}>support@skillbuildai.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--border-color)' }}
                >
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        &copy; {currentYear} SkillBuildAi. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <Link to="#" className="hover:text-indigo-400 transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-indigo-400 transition-colors">Terms</Link>
                        <Link to="#" className="hover:text-indigo-400 transition-colors">Cookies</Link>
                        <span className="hidden md:inline" style={{ color: 'var(--border-color)' }}>|</span>
                        <span className="hidden md:inline text-xs" style={{ color: 'var(--text-muted)' }}>
                            Crafted with ❤️ for ambitious careers
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/* ─── Reusable Sub-components ─── */

const SocialIcon = ({ icon, href = '#', label, isDark }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-indigo-600/20 hover:border-indigo-500/30 hover:text-indigo-400 transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', color: 'var(--text-muted)' }}
    >
        {icon}
    </a>
);

const FooterLink = ({ to, icon, label, badge }) => (
    <li>
        <Link
            to={to}
            className="group flex items-center gap-2 text-sm transition-colors duration-200 hover:text-indigo-400"
            style={{ color: 'var(--text-secondary)' }}
        >
            {icon && <span className="group-hover:text-indigo-400 transition-colors" style={{ color: 'var(--text-muted)' }}>{icon}</span>}
            <span>{label}</span>
            {badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full leading-none">
                    {badge}
                </span>
            )}
            <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200 ml-auto" />
        </Link>
    </li>
);

export default Footer;
