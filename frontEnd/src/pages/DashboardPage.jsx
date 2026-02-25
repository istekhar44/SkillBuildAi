import React, { useState, useEffect, useRef } from 'react';
import userAvatar from '../assets/user.jpeg';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CandidatePipelineSection from '../components/CandidatePipelineSection';
import {
    LayoutDashboard, User, Briefcase, ClipboardList, Settings,
    MapPin, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Calendar,
    Upload, Plus, Trash2, Bell, Lock, Eye, EyeOff, Star, Building2,
    GraduationCap, Code, FolderOpen, FileText, Mail, Phone, ChevronRight
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

// Default demo user for when API is unavailable
const DEMO_USER = {
    fullname: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+91 98765 43210',
    profile: {
        bio: 'Passionate full-stack developer with 3+ years of experience.',
        skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL'],
        location: 'Bangalore, India',
        education: [
            { _id: '1', degree: 'B.Tech in Computer Science', institution: 'IIT Delhi', year: '2020-2024', gpa: '8.5/10' }
        ],
        projects: [
            { _id: '1', name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Full-stack e-commerce app with payment integration' },
            { _id: '2', name: 'AI Chat Assistant', tech: 'Python, FastAPI, OpenAI', description: 'Intelligent chatbot with NLP capabilities' },
        ],
        resume: null,
    },
    notificationPrefs: {
        emailNotifs: true, appUpdates: true, jobRecommendations: false, interviewReminders: true, marketingEmails: false
    }
};

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile on mount — fallback to demo data if API unavailable
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API}/api/user/profile`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                } else {
                    setUser(DEMO_USER);
                }
            } catch (err) {
                console.error('Failed to fetch profile, using demo data:', err);
                setUser(DEMO_USER);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const refreshUser = async () => {
        try {
            const res = await fetch(`${API}/api/user/profile`, { credentials: 'include' });
            const data = await res.json();
            if (data.success) setUser(data.user);
        } catch (err) {
            console.error('Failed to refresh profile:', err);
        }
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'jobs', label: 'Job Details', icon: <Briefcase size={18} /> },
        { id: 'tracking', label: 'Application Tracking', icon: <ClipboardList size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    if (loading) {
        return (
            <div className="min-h-screen font-sans flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-gray-400 text-lg">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
                    <p className="text-gray-400">Manage your profile, track applications, and explore opportunities.</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[60vh]">
                    {activeTab === 'dashboard' && <DashboardTab user={user} />}
                    {activeTab === 'profile' && <ProfileTab user={user} refreshUser={refreshUser} />}
                    {activeTab === 'jobs' && <JobDetailsTab />}
                    {activeTab === 'tracking' && <ApplicationTrackingTab />}
                    {activeTab === 'settings' && <SettingsTab user={user} refreshUser={refreshUser} showPassword={showPassword} setShowPassword={setShowPassword} />}
                </div>

                {/* Application Pipeline */}
                <CandidatePipelineSection title="Application Pipeline" />
            </div>

            <Footer />
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  1. DASHBOARD TAB                                          */
/* ─────────────────────────────────────────────────────────── */
const DashboardTab = ({ user }) => {
    const [stats, setStats] = useState(null);
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    const DEMO_STATS = { profileCompletion: 78, totalApplications: 24, interviews: 5, pending: 2, rejected: 3 };
    const DEMO_JOBS = [
        { _id: '1', title: 'Senior React Developer', company: { name: 'Google' }, location: 'Remote', salary: 1500000 },
        { _id: '2', title: 'Full Stack Engineer', company: { name: 'Microsoft' }, location: 'Hyderabad', salary: 1200000 },
        { _id: '3', title: 'Frontend Developer', company: { name: 'Amazon' }, location: 'Bangalore', salary: 1000000 },
        { _id: '4', title: 'UX/UI Designer', company: { name: 'Figma' }, location: 'Remote', salary: 900000 },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API}/api/dashboard/stats`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) setStats(data.stats);
                else setStats(DEMO_STATS);
            } catch (err) {
                console.error('Failed to fetch stats, using demo:', err);
                setStats(DEMO_STATS);
            }
        };

        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API}/api/job/get?limit=4`, { credentials: 'include' });
                const data = await res.json();
                if (data.success && data.jobs?.length > 0) setRecommendedJobs(data.jobs);
                else setRecommendedJobs(DEMO_JOBS);
            } catch (err) {
                console.error('Failed to fetch jobs, using demo:', err);
                setRecommendedJobs(DEMO_JOBS);
            }
        };

        fetchStats();
        fetchJobs();
    }, []);

    const profileCompletion = stats?.profileCompletion || 78;
    const userName = user?.fullname || 'User';
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const statCards = [
        { label: 'Applications Sent', value: stats?.totalApplications || 0, color: 'text-blue-400 bg-blue-500/10', icon: <Briefcase size={20} /> },
        { label: 'Interviews', value: stats?.interviews || 0, color: 'text-orange-400 bg-orange-500/10', icon: <Calendar size={20} /> },
        { label: 'Offers', value: stats?.pending || 0, color: 'text-green-400 bg-green-500/10', icon: <CheckCircle size={20} /> },
        { label: 'Rejected', value: stats?.rejected || 0, color: 'text-purple-400 bg-purple-500/10', icon: <Eye size={20} /> },
    ];

    return (
        <div className="space-y-8">
            {/* Profile Completion */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={userAvatar} alt={userName} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-bold text-white">Welcome back, {userName}!</h2>
                        <p className="text-indigo-200 text-sm mt-1">Your profile is {profileCompletion}% complete</p>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-3 max-w-md">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${profileCompletion}%` }}
                            />
                        </div>
                    </div>
                    <button className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">
                        Complete Profile
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-bold">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Recommended Jobs</h2>
                    <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">Based on your profile</span>
                </div>
                <div className="space-y-3">
                    {recommendedJobs.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-8">No jobs found. Check back later!</p>
                    )}
                    {recommendedJobs.map(job => (
                        <div key={job._id} className="flex items-center gap-4 p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group">
                            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                                <Building2 size={18} className="text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors truncate">{job.title}</h4>
                                <p className="text-xs text-gray-500 truncate">{job.company?.name || 'Company'} • {job.location}</p>
                            </div>
                            <span className="text-xs text-gray-400 hidden sm:block">₹{job.salary ? `${(job.salary / 100000).toFixed(0)} LPA` : 'N/A'}</span>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  2. PROFILE TAB                                            */
/* ─────────────────────────────────────────────────────────── */
const ProfileTab = ({ user, refreshUser }) => {
    const [skills, setSkills] = useState(user?.profile?.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [bio, setBio] = useState(user?.profile?.bio || '');
    const [fullname, setFullname] = useState(user?.fullname || '');
    const [email] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phoneNumber || '');
    const [location, setLocation] = useState(user?.profile?.location || '');
    const [education, setEducation] = useState(user?.profile?.education || []);
    const [projects, setProjects] = useState(user?.profile?.projects || []);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleSaveProfile = async () => {
        setSaving(true);
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('phoneNumber', phone);
            formData.append('bio', bio);
            formData.append('skills', skills.join(','));
            formData.append('location', location);

            const res = await fetch(`${API}/api/user/profile/update`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setMessage('Profile saved successfully!');
                refreshUser();
            } else {
                setMessage(data.message || 'Failed to save profile');
            }
        } catch (err) {
            setMessage('Error saving profile');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch(`${API}/api/user/profile/update`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setMessage('Resume uploaded!');
                refreshUser();
            } else {
                setMessage(data.message || 'Upload failed');
            }
        } catch (err) {
            setMessage('Error uploading resume');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleAddEducation = async () => {
        const degree = prompt('Degree (e.g. B.Tech in Computer Science):');
        if (!degree) return;
        const institution = prompt('Institution:');
        if (!institution) return;
        const year = prompt('Year (e.g. 2020-2024):') || '';
        const gpa = prompt('GPA/CGPA (optional):') || '';

        try {
            const res = await fetch(`${API}/api/user/education`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ degree, institution, year, gpa }),
            });
            const data = await res.json();
            if (data.success) {
                setEducation(data.education);
                refreshUser();
            }
        } catch (err) {
            console.error('Add education error:', err);
        }
    };

    const handleDeleteEducation = async (id) => {
        try {
            const res = await fetch(`${API}/api/user/education/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setEducation(data.education);
                refreshUser();
            }
        } catch (err) {
            console.error('Delete education error:', err);
        }
    };

    const handleAddProject = async () => {
        const name = prompt('Project Name:');
        if (!name) return;
        const tech = prompt('Technologies (e.g. React, Node.js):') || '';
        const description = prompt('Short description:') || '';
        const link = prompt('Link (optional):') || '';

        try {
            const res = await fetch(`${API}/api/user/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, tech, description, link }),
            });
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects);
                refreshUser();
            }
        } catch (err) {
            console.error('Add project error:', err);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            const res = await fetch(`${API}/api/user/projects/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects);
                refreshUser();
            }
        } catch (err) {
            console.error('Delete project error:', err);
        }
    };

    return (
        <div className="space-y-8">
            {message && (
                <div className={`p-3 rounded-xl text-sm font-bold text-center ${message.includes('success') || message.includes('uploaded') || message.includes('saved') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Personal Details */}
            <SectionCard title="Personal Details" icon={<User size={20} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Full Name</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><User size={14} /></span>
                            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Mail size={14} /></span>
                            <input type="text" value={email} readOnly className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-400 cursor-not-allowed" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Phone</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Phone size={14} /></span>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Location</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><MapPin size={14} /></span>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bangalore, India" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell recruiters about yourself..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none" />
                </div>
                <button onClick={handleSaveProfile} disabled={saving} className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Education" icon={<GraduationCap size={20} />}>
                <div className="space-y-4">
                    {education.length === 0 && <p className="text-gray-500 text-sm">No education added yet.</p>}
                    {education.map((edu) => (
                        <div key={edu._id} className="flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                <GraduationCap size={18} className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                                <p className="text-xs text-gray-400">{edu.institution} {edu.year ? `• ${edu.year}` : ''}</p>
                                {edu.gpa && <p className="text-xs text-gray-500 mt-1">CGPA: {edu.gpa}</p>}
                            </div>
                            <button onClick={() => handleDeleteEducation(edu._id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </div>
                    ))}
                    <button onClick={handleAddEducation} className="flex items-center gap-2 text-sm text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                        <Plus size={14} /> Add Education
                    </button>
                </div>
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Skills" icon={<Code size={20} />}>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map(skill => (
                        <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-indigo-500/50 transition-colors group">
                            {skill}
                            <button onClick={() => handleRemoveSkill(skill)} className="text-gray-600 hover:text-red-400 transition-colors"><XCircle size={12} /></button>
                        </span>
                    ))}
                    {skills.length === 0 && <p className="text-gray-500 text-sm">No skills added yet.</p>}
                </div>
                <div className="flex gap-2">
                    <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} placeholder="Add a skill..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                    <button onClick={handleAddSkill} className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition-colors">Add</button>
                </div>
            </SectionCard>

            {/* Projects */}
            <SectionCard title="Projects" icon={<FolderOpen size={20} />}>
                <div className="space-y-4">
                    {projects.length === 0 && <p className="text-gray-500 text-sm">No projects added yet.</p>}
                    {projects.map((project) => (
                        <div key={project._id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/20 transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-white text-sm">{project.name}</h4>
                                    <p className="text-xs text-indigo-400 mt-0.5">{project.tech}</p>
                                    <p className="text-xs text-gray-500 mt-1">{project.description}</p>
                                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-1 block">{project.link}</a>}
                                </div>
                                <button onClick={() => handleDeleteProject(project._id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddProject} className="flex items-center gap-2 text-sm text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                        <Plus size={14} /> Add Project
                    </button>
                </div>
            </SectionCard>

            {/* Resume Upload */}
            <SectionCard title="Resume" icon={<FileText size={20} />}>
                <input type="file" ref={fileInputRef} onChange={handleResumeUpload} accept=".pdf,.doc,.docx" className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/30 transition-colors cursor-pointer group">
                    <Upload size={32} className="mx-auto text-gray-600 group-hover:text-indigo-400 transition-colors mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Drag & drop your resume or <span className="text-indigo-400 font-bold">browse</span></p>
                    <p className="text-xs text-gray-600">Supports PDF, DOC, DOCX (Max 5MB)</p>
                </div>
                {user?.profile?.resume && (
                    <div className="mt-4 flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
                        <FileText size={18} className="text-green-400" />
                        <div className="flex-1">
                            <p className="text-sm text-white font-bold">{user?.profile?.resumeOriginalname || 'Resume uploaded'}</p>
                            <p className="text-xs text-gray-500">Uploaded</p>
                        </div>
                        <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 font-bold hover:text-indigo-300">View</a>
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  3. JOB DETAILS TAB                                        */
/* ─────────────────────────────────────────────────────────── */
const JobDetailsTab = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applyLoading, setApplyLoading] = useState(false);
    const [applyMsg, setApplyMsg] = useState('');

    const DEMO_JOB_LIST = [
        {
            _id: 'd1', title: 'Senior React Developer', company: { name: 'Google' }, location: 'Remote', salary: 1500000,
            jobType: 'Full-time', experienceLevel: '3-5', description: 'We are looking for a Senior React Developer to join our growing team.',
            requirements: ['5+ years of React experience', 'Strong TypeScript skills', 'Experience with Next.js', 'CI/CD pipeline knowledge'],
        },
        {
            _id: 'd2', title: 'Full Stack Engineer', company: { name: 'Microsoft' }, location: 'Hyderabad', salary: 1200000,
            jobType: 'Full-time', experienceLevel: '2-4', description: 'Join Microsoft as a Full Stack Engineer working on enterprise cloud solutions.',
            requirements: ['Proficiency in Node.js & React', 'Cloud experience (Azure/AWS)', 'Database design skills'],
        },
        {
            _id: 'd3', title: 'Frontend Developer', company: { name: 'Amazon' }, location: 'Bangalore', salary: 1000000,
            jobType: 'Full-time', experienceLevel: '1-3', description: 'Amazon is seeking a talented Frontend Developer to build exceptional user experiences.',
            requirements: ['React/Vue.js proficiency', 'CSS/Tailwind mastery', 'Performance optimization'],
        },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API}/api/job/get?limit=10`, { credentials: 'include' });
                const data = await res.json();
                if (data.success && data.jobs?.length > 0) {
                    setJobs(data.jobs);
                    setSelectedJob(data.jobs[0]);
                } else {
                    setJobs(DEMO_JOB_LIST);
                    setSelectedJob(DEMO_JOB_LIST[0]);
                }
            } catch (err) {
                console.error('Failed to fetch jobs, using demo:', err);
                setJobs(DEMO_JOB_LIST);
                setSelectedJob(DEMO_JOB_LIST[0]);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        setApplyLoading(true);
        setApplyMsg('');
        try {
            const res = await fetch(`${API}/api/application/apply/${jobId}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setApplyMsg('Application submitted successfully!');
            } else {
                setApplyMsg(data.message || 'Failed to apply');
            }
        } catch (err) {
            setApplyMsg('Error submitting application');
        } finally {
            setApplyLoading(false);
            setTimeout(() => setApplyMsg(''), 3000);
        }
    };

    const handleSaveJob = async (jobId) => {
        try {
            const res = await fetch(`${API}/api/user/saved-jobs/${jobId}`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            alert(data.message || 'Job saved');
        } catch (err) {
            console.error('Save job error:', err);
        }
    };

    if (jobs.length === 0) {
        return <div className="text-center py-20 text-gray-400"><p className="text-xl">No jobs available yet. Check back soon!</p></div>;
    }

    return (
        <div className="space-y-4">
            {applyMsg && (
                <div className={`p-3 rounded-xl text-sm font-bold text-center ${applyMsg.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                    {applyMsg}
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Job List */}
                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-white mb-4">Available Positions</h2>
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            onClick={() => setSelectedJob(job)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedJob?._id === job._id
                                ? 'bg-indigo-600/10 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <h4 className="font-bold text-white text-sm">{job.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{job.company?.name || 'Company'}</p>
                            <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
                                <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                                <span className="flex items-center gap-1"><DollarSign size={10} /> ₹{job.salary ? `${(job.salary / 100000).toFixed(0)} LPA` : 'N/A'}</span>
                            </div>
                            <span className="inline-block mt-2 text-[10px] text-gray-600">{job.jobType}</span>
                        </div>
                    ))}
                </div>

                {/* Job Detail View */}
                {selectedJob && (
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                                <Building2 size={24} className="text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white">{selectedJob.title}</h2>
                                <p className="text-gray-400 text-sm">{selectedJob.company?.name || 'Company'}</p>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12} /> {selectedJob.location}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500"><DollarSign size={12} /> ₹{selectedJob.salary ? `${(selectedJob.salary / 100000).toFixed(0)} LPA` : 'N/A'}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} /> {selectedJob.jobType}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500"><Star size={12} /> {selectedJob.experienceLevel} yrs exp</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white text-sm mb-3">Job Description</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{selectedJob.description}</p>
                            </div>

                            {selectedJob.requirements?.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-white text-sm mb-3">Requirements</h3>
                                    <ul className="space-y-2">
                                        {selectedJob.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                <button onClick={() => handleApply(selectedJob._id)} disabled={applyLoading} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-50">
                                    {applyLoading ? 'Applying...' : 'Apply Now'}
                                </button>
                                <button onClick={() => handleSaveJob(selectedJob._id)} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                                    Save Job
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  4. APPLICATION TRACKING TAB                               */
/* ─────────────────────────────────────────────────────────── */
const ApplicationTrackingTab = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const DEMO_APPS = [
        { _id: 'a1', job: { title: 'Senior React Developer', company: { name: 'Google' } }, status: 'pending', createdAt: '2026-02-10' },
        { _id: 'a2', job: { title: 'UX Designer', company: { name: 'Design Studio' } }, status: 'accepted', createdAt: '2026-02-08' },
        { _id: 'a3', job: { title: 'Product Manager', company: { name: 'StartupXYZ' } }, status: 'pending', createdAt: '2026-02-05' },
        { _id: 'a4', job: { title: 'Backend Engineer', company: { name: 'CloudSystems' } }, status: 'rejected', createdAt: '2026-02-01' },
        { _id: 'a5', job: { title: 'Full Stack Dev', company: { name: 'WebDev Co.' } }, status: 'pending', createdAt: '2026-01-28' },
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch(`${API}/api/application/get`, { credentials: 'include' });
                const data = await res.json();
                if (data.success && data.application?.length > 0) {
                    setApplications(data.application);
                } else {
                    setApplications(DEMO_APPS);
                }
            } catch (err) {
                console.error('Failed to fetch applications, using demo:', err);
                setApplications(DEMO_APPS);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const statusConfig = {
        pending: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: <Clock size={14} />, label: 'Applied' },
        accepted: { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: <CheckCircle size={14} />, label: 'Accepted' },
        rejected: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: <XCircle size={14} />, label: 'Rejected' },
    };

    const counts = {
        pending: applications.filter(a => a.status === 'pending').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-400">Loading applications...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Status Pipeline */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Pending', count: counts.pending, color: 'blue' },
                    { label: 'Accepted', count: counts.accepted, color: 'green' },
                    { label: 'Rejected', count: counts.rejected, color: 'red' },
                ].map((s, i) => (
                    <div key={i} className="rounded-xl p-4 text-center"
                        style={{
                            backgroundColor: s.color === 'blue' ? 'rgba(59,130,246,0.05)' : s.color === 'green' ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
                            borderColor: s.color === 'blue' ? 'rgba(59,130,246,0.2)' : s.color === 'green' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                            border: '1px solid',
                        }}
                    >
                        <h3 className="text-2xl font-bold text-white">{s.count}</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Applications Table */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white">All Applications</h2>
                </div>
                {applications.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        <p>No applications yet. Start applying to jobs!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th className="px-5 py-4">Job Title</th>
                                    <th className="px-5 py-4">Company</th>
                                    <th className="px-5 py-4">Applied Date</th>
                                    <th className="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => {
                                    const config = statusConfig[app.status] || statusConfig.pending;
                                    return (
                                        <tr key={app._id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-bold text-white">{app.job?.title || 'Job'}</td>
                                            <td className="px-5 py-4 text-gray-400">{app.job?.company?.name || 'Company'}</td>
                                            <td className="px-5 py-4 text-gray-500">{new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${config.color}`}>
                                                    {config.icon} {config.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  5. SETTINGS TAB                                           */
/* ─────────────────────────────────────────────────────────── */
const SettingsTab = ({ user, refreshUser, showPassword, setShowPassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');
    const [pwdLoading, setPwdLoading] = useState(false);

    const [displayName, setDisplayName] = useState(user?.fullname || '');
    const [settingsEmail] = useState(user?.email || '');
    const [settingsPhone, setSettingsPhone] = useState(user?.phoneNumber || '');
    const [profileMsg, setProfileMsg] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);

    const [notifPrefs, setNotifPrefs] = useState(user?.notificationPrefs || {
        emailNotifs: true, appUpdates: true, jobRecommendations: false, interviewReminders: true, marketingEmails: false
    });
    const [notifMsg, setNotifMsg] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPwdMsg('Passwords do not match');
            return;
        }
        setPwdLoading(true);
        setPwdMsg('');
        try {
            const res = await fetch(`${API}/api/user/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await res.json();
            setPwdMsg(data.message);
            if (data.success) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            setPwdMsg('Error changing password');
        } finally {
            setPwdLoading(false);
            setTimeout(() => setPwdMsg(''), 3000);
        }
    };

    const handleUpdateProfile = async () => {
        setProfileLoading(true);
        setProfileMsg('');
        try {
            const formData = new FormData();
            formData.append('fullname', displayName);
            formData.append('phoneNumber', settingsPhone);

            const res = await fetch(`${API}/api/user/profile/update`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setProfileMsg('Profile updated successfully!');
                refreshUser();
            } else {
                setProfileMsg(data.message || 'Failed to update');
            }
        } catch (err) {
            setProfileMsg('Error updating profile');
        } finally {
            setProfileLoading(false);
            setTimeout(() => setProfileMsg(''), 3000);
        }
    };

    const handleNotifToggle = async (key) => {
        const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
        setNotifPrefs(updated);
        try {
            const res = await fetch(`${API}/api/user/notifications`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updated),
            });
            const data = await res.json();
            if (data.success) {
                setNotifMsg('Preferences saved');
                setTimeout(() => setNotifMsg(''), 2000);
            }
        } catch (err) {
            console.error('Notification pref update error:', err);
        }
    };

    const notifItems = [
        { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive job alerts and application updates via email' },
        { key: 'appUpdates', label: 'Application Updates', desc: 'Get notified when your application status changes' },
        { key: 'jobRecommendations', label: 'Job Recommendations', desc: 'Receive personalized job suggestions weekly' },
        { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Get reminders before scheduled interviews' },
        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive tips, guides, and promotional content' },
    ];

    return (
        <div className="space-y-8">
            {/* Change Password */}
            <SectionCard title="Change Password" icon={<Lock size={20} />}>
                {pwdMsg && (
                    <div className={`p-3 rounded-xl text-sm font-bold mb-4 ${pwdMsg.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                        {pwdMsg}
                    </div>
                )}
                <div className="space-y-4 max-w-lg">
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors pr-10"
                            />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                    </div>
                    <button onClick={handleChangePassword} disabled={pwdLoading} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-50">
                        {pwdLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </SectionCard>

            {/* Update Profile */}
            <SectionCard title="Update Profile" icon={<User size={20} />}>
                {profileMsg && (
                    <div className={`p-3 rounded-xl text-sm font-bold mb-4 ${profileMsg.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                        {profileMsg}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Display Name</label>
                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Email</label>
                        <input type="text" value={settingsEmail} readOnly className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Phone</label>
                        <input type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                    </div>
                </div>
                <button onClick={handleUpdateProfile} disabled={profileLoading} className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-50">
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </SectionCard>

            {/* Notification Preferences */}
            <SectionCard title="Notification Preferences" icon={<Bell size={20} />}>
                {notifMsg && <p className="text-xs text-green-400 mb-3">{notifMsg}</p>}
                <div className="space-y-4">
                    {notifItems.map((pref) => (
                        <div key={pref.key} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                            <div>
                                <h4 className="text-sm font-bold text-white">{pref.label}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{pref.desc}</p>
                            </div>
                            <ToggleSwitch checked={notifPrefs[pref.key]} onChange={() => handleNotifToggle(pref.key)} />
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────── */
/*  SHARED UI COMPONENTS                                       */
/* ─────────────────────────────────────────────────────────── */
const SectionCard = ({ title, icon, children }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
            <span className="text-indigo-400">{icon}</span>
            <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        {children}
    </div>
);

const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <button
            onClick={onChange}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 border ${checked
                ? 'bg-indigo-600 border-indigo-500'
                : 'bg-white/10 border-white/20'
                }`}
        >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'
                }`} />
        </button>
    );
};

export default DashboardPage;
