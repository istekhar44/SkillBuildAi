import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {
    Briefcase, Users, MapPin, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, DollarSign, Building2
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applicantsLoading, setApplicantsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Fetch admin jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API}/api/job/getadminjobs`, { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setJobs(data.jobs || []);
                    if (data.jobs?.length > 0) {
                        setSelectedJob(data.jobs[0]);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch admin jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Fetch applicants when a job is selected
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
                // Refresh applicants
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
                    <p className="text-gray-400">Manage your job postings and review applicants.</p>
                </div>

                {statusMsg && (
                    <div className={`p-3 rounded-xl text-sm font-bold text-center mb-6 ${statusMsg.includes('updated') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
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

                {jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400 mb-4">No job postings yet.</p>
                        <a href="/postjob" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Post Your First Job</a>
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
            </div>
            <Footer />
        </div>
    );
};

export default RecruiterDashboard;
