import React, { useState } from 'react';
import { X, MapPin, Briefcase, Clock, DollarSign, Send, CheckCircle, Building2, GraduationCap } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const JobApplyModal = ({ isOpen, onClose, job }) => {
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [form, setForm] = useState({ fullname: '', email: '', phone: '', resume: null, coverLetter: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !job) return null;

    const isApiJob = !!job._id;
    const companyName = isApiJob ? (job.company?.name || 'Company') : job.company;
    const salary = isApiJob ? `₹${(job.salary / 100000).toFixed(0)} LPA` : job.salary;
    const experience = isApiJob ? `${job.experienceLevel} yrs` : job.experience;
    const type = isApiJob ? job.jobType : job.type;
    const postedDate = isApiJob ? new Date(job.createdAt).toLocaleDateString() : job.postedDate;
    const skills = isApiJob ? (job.requirements || []) : (job.skills || []);
    const logo = isApiJob ? null : job.logo;

    const handleChange = (e) => {
        if (e.target.name === 'resume') {
            setForm({ ...form, resume: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // If API job, try to submit to backend
            if (isApiJob) {
                const formData = new FormData();
                formData.append('fullname', form.fullname);
                formData.append('email', form.email);
                formData.append('phone', form.phone);
                if (form.resume) formData.append('resume', form.resume);
                formData.append('coverLetter', form.coverLetter);

                const res = await fetch(`${API}/api/application/apply/${job._id}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });
                const data = await res.json();
                if (!data.success) {
                    setError(data.message || 'Application failed');
                    setLoading(false);
                    return;
                }
            }
            // For static jobs or successful API submission
            setSuccess(true);
        } catch (err) {
            console.error(err);
            // Show success anyway for static jobs demo
            if (!isApiJob) {
                setSuccess(true);
            } else {
                setError('Failed to submit application. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowApplyForm(false);
        setSuccess(false);
        setError('');
        setForm({ fullname: '', email: '', phone: '', resume: null, coverLetter: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl scrollbar-hide"
                style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                    animation: 'jobModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Company Logo */}
                <div className="relative p-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/10 hover:text-red-400"
                        style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                        >
                            {logo ? (
                                <>
                                    <img src={logo} alt={companyName} className="w-full h-full object-contain p-1.5"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                    />
                                    <span className="w-full h-full items-center justify-center font-bold text-xl"
                                        style={{ color: 'var(--text-primary)', display: 'none' }}>{companyName[0]}</span>
                                </>
                            ) : (
                                <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{companyName[0]}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{job.title}</h2>
                            <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                <Building2 size={14} /> {companyName}
                            </p>
                        </div>
                    </div>

                    {/* Quick Info Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}>
                            <MapPin size={12} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}>
                            <Briefcase size={12} /> {type}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}>
                            <GraduationCap size={12} /> {experience}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500"
                            style={{ border: '1px solid rgba(34,197,94,0.15)' }}>
                            <DollarSign size={12} /> {salary}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
                            <Clock size={12} /> {postedDate}
                        </span>
                    </div>
                </div>

                {/* Body */}
                {!showApplyForm ? (
                    <div className="p-6">
                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Job Description</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{job.description}</p>
                        </div>

                        {/* Skills */}
                        {skills.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-500"
                                            style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Highlights */}
                        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Key Highlights</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={14} className="text-green-500 shrink-0" /> Competitive Salary
                                </div>
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={14} className="text-green-500 shrink-0" /> Health Insurance
                                </div>
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={14} className="text-green-500 shrink-0" /> Learning Budget
                                </div>
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={14} className="text-green-500 shrink-0" /> Flexible Hours
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <button
                            onClick={() => setShowApplyForm(true)}
                            className="w-full py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 hover:brightness-110"
                            style={{ backgroundColor: 'var(--btn-apply-bg)', color: 'var(--btn-apply-text)', boxShadow: '0 4px 14px var(--btn-apply-shadow)' }}
                        >
                            <Send size={18} /> Apply for this Job
                        </button>
                    </div>
                ) : (
                    /* Apply Form */
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Apply Now</h3>
                            <button type="button" onClick={() => { setShowApplyForm(false); setError(''); }}
                                className="text-xs font-medium px-3 py-1 rounded-lg transition-colors"
                                style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                            >
                                ← Back to Details
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl text-center">
                                <CheckCircle size={32} className="mx-auto mb-2" />
                                <p className="font-bold">Application Submitted! 🎉</p>
                                <p className="text-sm mt-1 opacity-80">You'll hear back from {companyName} soon.</p>
                            </div>
                        )}

                        {!success && (
                            <>
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                                    <input
                                        type="text" name="fullname" value={form.fullname} onChange={handleChange} required
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                                    <input
                                        type="email" name="email" value={form.email} onChange={handleChange} required
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Phone Number *</label>
                                    <input
                                        type="tel" name="phone" value={form.phone} onChange={handleChange} required
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Resume (PDF) *</label>
                                    <div className="relative">
                                        <input
                                            type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-500/20 file:text-indigo-500 file:cursor-pointer"
                                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                                        />
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Cover Letter (optional)</label>
                                    <textarea
                                        name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={3}
                                        placeholder="Tell us why you're a great fit for this role..."
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
                                        style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit" disabled={loading}
                                    className="w-full py-3.5 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 hover:brightness-110"
                                    style={{ backgroundColor: 'var(--btn-apply-bg)', color: 'var(--btn-apply-text)', boxShadow: '0 4px 14px var(--btn-apply-shadow)' }}
                                >
                                    {loading ? (
                                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                                    ) : (
                                        <><Send size={16} /> Submit Application</>
                                    )}
                                </button>
                            </>
                        )}
                    </form>
                )}
            </div>

            {/* Animation */}
            <style>{`
                @keyframes jobModalSlideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default JobApplyModal;
