import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {
    Briefcase, Users, MapPin, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp,
    DollarSign, Building2, Plus, GripVertical, Mail, FileText, X, ArrowRight, Sparkles, Star,
    MoreHorizontal, MessageSquare, Phone, Calendar
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

// Pipeline stages config
const PIPELINE_STAGES = [
    { id: 'pending', label: 'Applied', dotColor: 'bg-blue-400', headerBg: 'bg-blue-500/10', borderActive: 'border-blue-500/30' },
    { id: 'screening', label: 'Screening', dotColor: 'bg-purple-400', headerBg: 'bg-purple-500/10', borderActive: 'border-purple-500/30' },
    { id: 'interview', label: 'Interview', dotColor: 'bg-amber-400', headerBg: 'bg-amber-500/10', borderActive: 'border-amber-500/30' },
    { id: 'accepted', label: 'Offer', dotColor: 'bg-green-400', headerBg: 'bg-green-500/10', borderActive: 'border-green-500/30' },
    { id: 'rejected', label: 'Rejected', dotColor: 'bg-red-400', headerBg: 'bg-red-500/10', borderActive: 'border-red-500/30' },
];

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applicantsLoading, setApplicantsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Post Job modal state
    const [showPostJob, setShowPostJob] = useState(false);
    const [demoCandidates, setDemoCandidates] = useState([
        { _id: 'd1', status: 'pending', createdAt: '2026-02-28', applicant: { fullname: 'Aarav Sharma', email: 'aarav.s@gmail.com' } },
        { _id: 'd2', status: 'pending', createdAt: '2026-02-27', applicant: { fullname: 'Priya Patel', email: 'priya.p@outlook.com' } },
        { _id: 'd3', status: 'pending', createdAt: '2026-02-26', applicant: { fullname: 'James Wilson', email: 'james.w@yahoo.com' } },
        { _id: 'd4', status: 'pending', createdAt: '2026-03-01', applicant: { fullname: 'Sara Johnson', email: 'sara.j@gmail.com' } },
        { _id: 'd5', status: 'pending', createdAt: '2026-03-02', applicant: { fullname: 'Ravi Kumar', email: 'ravi.k@hotmail.com' } },
        { _id: 'd6', status: 'pending', createdAt: '2026-02-25', applicant: { fullname: 'Emily Chen', email: 'emily.c@gmail.com' } },
        { _id: 'd7', status: 'pending', createdAt: '2026-02-24', applicant: { fullname: 'Arjun Reddy', email: 'arjun.r@gmail.com' } },
        { _id: 'd8', status: 'screening', createdAt: '2026-02-20', applicant: { fullname: 'Sophia Martinez', email: 'sophia.m@gmail.com' } },
        { _id: 'd9', status: 'screening', createdAt: '2026-02-19', applicant: { fullname: 'Michael Brown', email: 'michael.b@outlook.com' } },
        { _id: 'd10', status: 'screening', createdAt: '2026-02-18', applicant: { fullname: 'Neha Gupta', email: 'neha.g@gmail.com' } },
        { _id: 'd11', status: 'screening', createdAt: '2026-02-17', applicant: { fullname: 'David Lee', email: 'david.l@yahoo.com' } },
        { _id: 'd12', status: 'screening', createdAt: '2026-02-16', applicant: { fullname: 'Ananya Singh', email: 'ananya.s@gmail.com' } },
        { _id: 'd13', status: 'interview', createdAt: '2026-02-15', applicant: { fullname: 'Chris Taylor', email: 'chris.t@gmail.com' } },
        { _id: 'd14', status: 'interview', createdAt: '2026-02-14', applicant: { fullname: 'Meera Iyer', email: 'meera.i@outlook.com' } },
        { _id: 'd15', status: 'interview', createdAt: '2026-02-13', applicant: { fullname: 'Alex Rodriguez', email: 'alex.r@gmail.com' } },
        { _id: 'd16', status: 'interview', createdAt: '2026-02-12', applicant: { fullname: 'Kavya Nair', email: 'kavya.n@gmail.com' } },
        { _id: 'd17', status: 'accepted', createdAt: '2026-02-10', applicant: { fullname: 'Daniel Kim', email: 'daniel.k@gmail.com' } },
        { _id: 'd18', status: 'accepted', createdAt: '2026-02-09', applicant: { fullname: 'Ishita Joshi', email: 'ishita.j@yahoo.com' } },
        { _id: 'd19', status: 'accepted', createdAt: '2026-02-08', applicant: { fullname: 'Ryan Thompson', email: 'ryan.t@gmail.com' } },
        { _id: 'd20', status: 'rejected', createdAt: '2026-02-07', applicant: { fullname: 'Pooja Verma', email: 'pooja.v@outlook.com' } },
    ]);
    const [postStep, setPostStep] = useState(1);
    const [companies, setCompanies] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState('');
    const [formData, setFormData] = useState({
        title: '', jobType: 'Full Time', location: '', salary: '',
        description: '', requirements: '', experience: 0, position: 1,
        companyId: '', category: 'Software Development'
    });

    // Pipeline drag state
    const [draggedCard, setDraggedCard] = useState(null);
    const [dragOverCol, setDragOverCol] = useState(null);

    // ─── Fetch admin jobs ───
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API}/api/job/getadminjobs`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setJobs(data.jobs || []);
                    if (data.jobs?.length > 0) setSelectedJob(data.jobs[0]);
                }
            } catch (err) {
                console.error('Failed to fetch admin jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // ─── Fetch applicants when a job is selected ───
    useEffect(() => {
        if (!selectedJob) return;
        const fetchApplicants = async () => {
            setApplicantsLoading(true);
            try {
                const res = await fetch(`${API}/api/application/${selectedJob._id}/applicants`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setApplicants(data.job?.applications || []);
                } else {
                    setApplicants([]);
                }
            } catch (err) {
                console.error('Failed to fetch applicants:', err);
                setApplicants([]);
            } finally {
                setApplicantsLoading(false);
            }
        };
        fetchApplicants();
    }, [selectedJob]);

    // ─── Fetch companies for post job form ───
    useEffect(() => {
        if (!showPostJob) return;
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${API}/api/company/get`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setCompanies(data.companies || []);
                    if (data.companies?.length > 0) {
                        setFormData(prev => ({ ...prev, companyId: data.companies[0]._id }));
                    }
                }
            } catch (err) {
                console.error('Failed to fetch companies:', err);
            }
        };
        fetchCompanies();
    }, [showPostJob]);

    const handleStatusUpdate = async (applicationId, status) => {
        try {
            const res = await fetch(`${API}/api/application/status/${applicationId}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setStatusMsg(`Status updated to ${status}`);
                setApplicants(prev => prev.map(app =>
                    app._id === applicationId ? { ...app, status } : app
                ));
            } else {
                setStatusMsg(data.message || 'Failed to update status');
            }
        } catch (err) {
            setStatusMsg('Error updating status');
        }
        setTimeout(() => setStatusMsg(''), 3000);
    };

    // ─── Post Job Submit ───
    const handlePostJob = async () => {
        setPostLoading(true);
        setPostError('');
        try {
            const res = await fetch(`${API}/api/job/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setStatusMsg('Job posted successfully!');
                setShowPostJob(false);
                setPostStep(1);
                setFormData({ title: '', jobType: 'Full Time', location: '', salary: '', description: '', requirements: '', experience: 0, position: 1, companyId: '', category: 'Software Development' });
                // Refresh jobs
                const jobsRes = await fetch(`${API}/api/job/getadminjobs`, { credentials: 'include' });
                const jobsData = await jobsRes.json();
                if (jobsData.success) {
                    setJobs(jobsData.jobs || []);
                    if (jobsData.jobs?.length > 0) setSelectedJob(jobsData.jobs[0]);
                }
            } else {
                setPostError(data.message || 'Failed to post job');
            }
        } catch (err) {
            setPostError('Failed to post job. Please try again.');
        } finally {
            setPostLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ─── Drag & Drop ───
    const onDragStart = (e, application) => {
        setDraggedCard(application);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => { e.target.style.opacity = '0.4'; }, 0);
    };
    const onDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedCard(null);
        setDragOverCol(null);
    };
    const onDragOver = (e, stageId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverCol(stageId);
    };
    const onDragLeave = () => setDragOverCol(null);
    const onDrop = (e, targetStageId) => {
        e.preventDefault();
        setDragOverCol(null);
        if (!draggedCard || (draggedCard.status || 'pending') === targetStageId) return;
        // Demo candidates: update local state instantly
        if (draggedCard._id?.startsWith('d')) {
            setDemoCandidates(prev => prev.map(c =>
                c._id === draggedCard._id ? { ...c, status: targetStageId } : c
            ));
            setStatusMsg(`Moved to ${targetStageId}`);
            setTimeout(() => setStatusMsg(''), 2000);
        } else {
            handleStatusUpdate(draggedCard._id, targetStageId);
        }
    };

    // Use real applicants if available, otherwise show demo candidates
    const pipelineCandidates = applicants.length > 0 ? applicants : demoCandidates;

    // Group applicants by pipeline stage
    const groupedApplicants = PIPELINE_STAGES.reduce((acc, stage) => {
        acc[stage.id] = pipelineCandidates.filter(app => (app.status || 'pending') === stage.id);
        return acc;
    }, {});

    const statusColors = {
        pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        accepted: 'bg-green-500/10 text-green-400 border-green-500/20',
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    if (loading) {
        return (
            <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <NavBar />
                <div className="flex items-center justify-center py-20 text-gray-400 text-lg">Loading recruiter dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
                        <p className="text-gray-400">Manage your job postings and review applicants.</p>
                    </div>
                    <button
                        onClick={() => setShowPostJob(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                    >
                        <Plus size={18} /> Post a Job
                    </button>
                </div>

                {statusMsg && (
                    <div className={`p-3 rounded-xl text-sm font-bold text-center mb-6 ${statusMsg.includes('updated') || statusMsg.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                        {statusMsg}
                    </div>
                )}

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400"><Briefcase size={20} /></div>
                            <span className="text-gray-400 text-sm">Total Jobs</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{jobs.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-green-500/10 text-green-400"><Users size={20} /></div>
                            <span className="text-gray-400 text-sm">Total Applicants</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{applicants.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><CheckCircle size={20} /></div>
                            <span className="text-gray-400 text-sm">Accepted</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{applicants.filter(a => a.status === 'accepted').length}</p>
                    </div>
                </div>

                {/* Trusted Companies Slider */}
                <div className="mb-8 overflow-hidden">
                    <p className="text-xs text-gray-500 uppercase tracking-widest text-center mb-4 font-bold">Trusted by top companies worldwide</p>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
                        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
                        <div className="flex animate-marquee gap-8 whitespace-nowrap">
                            {[
                                { name: 'Google', icon: '🔍' },
                                { name: 'Microsoft', icon: '🪟' },
                                { name: 'Amazon', icon: '📦' },
                                { name: 'Apple', icon: '🍎' },
                                { name: 'Meta', icon: '🌐' },
                                { name: 'Netflix', icon: '🎬' },
                                { name: 'Tesla', icon: '⚡' },
                                { name: 'Adobe', icon: '🎨' },
                                { name: 'Spotify', icon: '🎵' },
                                { name: 'Salesforce', icon: '☁️' },
                                { name: 'Google', icon: '🔍' },
                                { name: 'Microsoft', icon: '🪟' },
                                { name: 'Amazon', icon: '📦' },
                                { name: 'Apple', icon: '🍎' },
                                { name: 'Meta', icon: '🌐' },
                                { name: 'Netflix', icon: '🎬' },
                                { name: 'Tesla', icon: '⚡' },
                                { name: 'Adobe', icon: '🎨' },
                                { name: 'Spotify', icon: '🎵' },
                                { name: 'Salesforce', icon: '☁️' },
                            ].map((company, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3 shrink-0 hover:bg-white/10 transition-colors">
                                    <span className="text-xl">{company.icon}</span>
                                    <span className="text-sm font-bold text-gray-300">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 25s linear infinite;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl w-full flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Briefcase size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Job Postings Yet</h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">You haven't posted any jobs yet. Create your first job posting to start receiving applicants.</p>
                        <button onClick={() => setShowPostJob(true)} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1">
                            <Plus size={20} /> Post Your First Job
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Job List */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-white mb-4">Your Job Postings</h2>
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
                                        <span className="flex items-center gap-1"><Users size={10} /> {job.applications?.length || 0} applicants</span>
                                    </div>
                                    <span className="inline-block mt-2 text-[10px] text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Applicants Panel */}
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Applicants for: {selectedJob?.title}</h2>
                                    <p className="text-sm text-gray-400">{selectedJob?.company?.name}</p>
                                </div>
                                <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{applicants.length} applicant{applicants.length !== 1 ? 's' : ''}</span>
                            </div>

                            {applicantsLoading ? (
                                <div className="text-center py-10 text-gray-400">Loading applicants...</div>
                            ) : applicants.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">No applicants for this job yet.</div>
                            ) : (
                                <div className="space-y-3">
                                    {applicants.map((application) => {
                                        const applicant = application.applicant;
                                        return (
                                            <div key={application._id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                                                            {applicant?.fullname ? applicant.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-sm">{applicant?.fullname || 'Applicant'}</h4>
                                                            <p className="text-xs text-gray-400">{applicant?.email || ''}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${statusColors[application.status] || statusColors.pending}`}>
                                                        {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 mt-3">
                                                    {applicant?.profile?.resume && (
                                                        <a href={applicant.profile.resume} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 font-bold hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">View Resume</a>
                                                    )}
                                                    {application.status !== 'accepted' && (
                                                        <button onClick={() => handleStatusUpdate(application._id, 'accepted')} className="text-xs text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 hover:bg-green-500/20">Accept</button>
                                                    )}
                                                    {application.status !== 'rejected' && (
                                                        <button onClick={() => handleStatusUpdate(application._id, 'rejected')} className="text-xs text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/20">Reject</button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════ */}
                {/*   APPLICATION PIPELINE — Kanban Drag & Drop               */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ArrowRight size={20} className="text-indigo-400" />
                                Application Pipeline
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">Drag and drop candidates between stages to update their status</p>
                        </div>
                        {selectedJob && (
                            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                {selectedJob.title}
                            </span>
                        )}
                    </div>

                    {applicantsLoading ? (
                        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl text-gray-400">Loading pipeline...</div>
                    ) : (
                        <div className="flex gap-4 overflow-x-auto pb-6 min-h-[300px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                            {PIPELINE_STAGES.map((stage) => {
                                const candidates = groupedApplicants[stage.id] || [];
                                const isOver = dragOverCol === stage.id;
                                return (
                                    <div
                                        key={stage.id}
                                        className={`w-[240px] shrink-0 rounded-2xl border transition-all flex flex-col ${isOver
                                            ? `bg-white/10 ${stage.borderActive} shadow-lg`
                                            : 'bg-white/[0.03] border-white/10'
                                            }`}
                                        onDragOver={(e) => onDragOver(e, stage.id)}
                                        onDragLeave={onDragLeave}
                                        onDrop={(e) => onDrop(e, stage.id)}
                                    >
                                        <div className={`p-3.5 border-b border-white/5 rounded-t-2xl ${stage.headerBg}`}>
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${stage.dotColor}`} />
                                                    {stage.label}
                                                </h3>
                                                <span className="text-[10px] text-gray-400 bg-black/20 px-2 py-0.5 rounded-full font-bold">{candidates.length}</span>
                                            </div>
                                        </div>

                                        <div className="p-3 space-y-2 flex-1 overflow-y-auto" style={{ maxHeight: '320px', scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                                            {candidates.map((application) => {
                                                const applicant = application.applicant;
                                                return (
                                                    <div
                                                        key={application._id}
                                                        draggable
                                                        onDragStart={(e) => onDragStart(e, application)}
                                                        onDragEnd={onDragEnd}
                                                        className="bg-black/30 hover:bg-white/10 border border-white/5 rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all hover:border-white/15 group"
                                                    >
                                                        <div className="flex items-center gap-2.5 mb-2">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                                {applicant?.fullname ? applicant.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <h4 className="font-bold text-xs text-white truncate">{applicant?.fullname || 'Applicant'}</h4>
                                                                <p className="text-[10px] text-gray-500 truncate">{applicant?.email || ''}</p>
                                                            </div>
                                                            <GripVertical size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                                        </div>
                                                        <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                                                            {applicant?.profile?.resume && (
                                                                <a href={applicant.profile.resume} target="_blank" rel="noopener noreferrer"
                                                                    className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 hover:bg-indigo-500/20 flex items-center gap-1"
                                                                    onClick={(e) => e.stopPropagation()}>
                                                                    <FileText size={10} /> Resume
                                                                </a>
                                                            )}
                                                            {applicant?.email && (
                                                                <a href={`mailto:${applicant.email}`}
                                                                    className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 hover:bg-white/10 flex items-center gap-1"
                                                                    onClick={(e) => e.stopPropagation()}>
                                                                    <Mail size={10} /> Email
                                                                </a>
                                                            )}
                                                            <span className="text-[9px] text-gray-600 ml-auto flex items-center gap-1">
                                                                <Clock size={9} />
                                                                {application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {candidates.length === 0 && (
                                                <div className={`text-center py-8 border-2 border-dashed rounded-xl text-xs transition-all ${isOver ? 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5' : 'border-white/5 text-gray-600'}`}>
                                                    {isOver ? 'Drop here' : 'No candidates'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/*   POST JOB MODAL                                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {showPostJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gray-900 z-10 rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">{postStep}</div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Post a New Job</h2>
                                    <p className="text-xs text-gray-400">Step {postStep} of 3</p>
                                </div>
                            </div>
                            <button onClick={() => { setShowPostJob(false); setPostStep(1); setPostError(''); }} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="px-6 pt-4">
                            <div className="w-full h-1 bg-white/5 rounded-full">
                                <div className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ${postStep === 1 ? 'w-1/3' : postStep === 2 ? 'w-2/3' : 'w-full'}`} />
                            </div>
                        </div>

                        {postError && <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">{postError}</div>}

                        {companies.length === 0 && (
                            <div className="mx-6 mt-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-3 rounded-lg text-sm">
                                You need to create a company first before posting a job.
                            </div>
                        )}

                        <div className="p-6">
                            {/* Step 1: Basic Info */}
                            {postStep === 1 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Company</label>
                                        <select name="companyId" value={formData.companyId} onChange={handleInputChange} className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white outline-none transition-all">
                                            <option value="">Select a Company</option>
                                            {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                            {companies.length > 0 && <option disabled>──────────────</option>}
                                            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Adobe', 'Spotify', 'Salesforce', 'IBM', 'Oracle', 'Intel', 'NVIDIA', 'Uber', 'Airbnb', 'Twitter / X', 'LinkedIn', 'Stripe', 'Shopify'].map(name => (
                                                <option key={name} value={name}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Job Title</label>
                                        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Senior Product Designer" className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-600 outline-none transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Job Type</label>
                                            <select name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-gray-300 outline-none transition-all appearance-none cursor-pointer">
                                                <option>Full Time</option><option>Contract</option><option>Freelance</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Location</label>
                                            <input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Remote" className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-600 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Salary (Annual)</label>
                                            <input name="salary" type="number" value={formData.salary} onChange={handleInputChange} placeholder="e.g. 100000" className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-600 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Experience (Years)</label>
                                            <input name="experience" type="number" value={formData.experience} onChange={handleInputChange} className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Details */}
                            {postStep === 2 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white outline-none transition-all">
                                            {['Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 'Management', 'Finance', 'Healthcare', 'Education', 'Engineering'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Job Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the role responsibilities..." className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl h-40 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-600 outline-none transition-all resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Key Requirements (comma-separated)</label>
                                        <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="React, Node.js, 3+ years experience..." className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl h-28 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-600 outline-none transition-all resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Number of Positions</label>
                                        <input name="position" type="number" value={formData.position} onChange={handleInputChange} min="1" className="w-full p-3.5 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-indigo-500/50 text-white outline-none transition-all" />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review & Submit */}
                            {postStep === 3 && (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                                        <Sparkles size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ready to Post?</h3>
                                    <p className="text-gray-400 text-sm max-w-md mx-auto">Your job "{formData.title}" will be visible to thousands of active candidates immediately.</p>

                                    <div className="bg-white/5 rounded-xl p-4 max-w-sm mx-auto mt-6 text-left border border-white/10">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Post Duration</span>
                                            <span className="text-white">30 Days</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Feature Listing</span>
                                            <span className="text-green-400">Included</span>
                                        </div>
                                        <div className="border-t border-white/10 my-2" />
                                        <div className="flex justify-between font-bold">
                                            <span className="text-white">Total Cost</span>
                                            <span className="text-white">$0.00 (Beta)</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6 mt-6 border-t border-white/10">
                                {postStep > 1 ? (
                                    <button type="button" onClick={() => setPostStep(s => s - 1)} className="text-gray-400 hover:text-white font-bold px-6 py-3 transition-colors">Back</button>
                                ) : <div />}

                                {postStep < 3 ? (
                                    <button type="button" onClick={() => setPostStep(s => s + 1)} disabled={!formData.companyId || !formData.title} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50">Next Step</button>
                                ) : (
                                    <button type="button" onClick={handlePostJob} disabled={postLoading} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                                        {postLoading ? 'Posting...' : 'Post Job Now'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default RecruiterDashboard;
