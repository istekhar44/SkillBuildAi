import React from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, AlertCircle, MapPin, DollarSign, Calendar } from 'lucide-react';

const StudentApplicationsView = () => {
    // Mock data for student's job applications
    const applications = [
        {
            id: 1,
            jobTitle: 'Senior React Developer',
            company: 'TechCorp Inc.',
            location: 'Remote',
            salary: '$120k - $150k',
            appliedDate: '2026-02-10',
            status: 'interview',
            statusText: 'Interview Scheduled',
            interviewDate: '2026-02-15'
        },
        {
            id: 2,
            jobTitle: 'UX Designer',
            company: 'Design Studio',
            location: 'New York',
            salary: '$90k - $110k',
            appliedDate: '2026-02-08',
            status: 'screening',
            statusText: 'Under Review'
        },
        {
            id: 3,
            jobTitle: 'Product Manager',
            company: 'StartupXYZ',
            location: 'San Francisco',
            salary: '$140k - $180k',
            appliedDate: '2026-02-05',
            status: 'applied',
            statusText: 'Application Submitted'
        },
        {
            id: 4,
            jobTitle: 'Backend Engineer',
            company: 'CloudSystems',
            location: 'Remote',
            salary: '$130k - $160k',
            appliedDate: '2026-02-01',
            status: 'rejected',
            statusText: 'Not Selected'
        },
        {
            id: 5,
            jobTitle: 'Full Stack Developer',
            company: 'WebDev Co.',
            location: 'Austin',
            salary: '$110k - $140k',
            appliedDate: '2026-01-28',
            status: 'offer',
            statusText: 'Offer Received'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'applied':
                return <Clock size={16} className="text-blue-400" />;
            case 'screening':
                return <AlertCircle size={16} className="text-purple-400" />;
            case 'interview':
                return <Calendar size={16} className="text-orange-400" />;
            case 'offer':
                return <CheckCircle size={16} className="text-green-400" />;
            case 'rejected':
                return <XCircle size={16} className="text-red-400" />;
            default:
                return <Clock size={16} className="text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'screening':
                return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'interview':
                return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'offer':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'rejected':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const statusCounts = {
        total: applications.length,
        active: applications.filter(a => ['applied', 'screening', 'interview'].includes(a.status)).length,
        offers: applications.filter(a => a.status === 'offer').length,
        interviews: applications.filter(a => a.status === 'interview').length
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
                <p className="text-gray-400">Track your job applications and their current status</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Applications" value={statusCounts.total} color="blue" />
                <StatCard title="Active" value={statusCounts.active} color="purple" />
                <StatCard title="Interviews" value={statusCounts.interviews} color="orange" />
                <StatCard title="Offers" value={statusCounts.offers} color="green" />
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">All Applications</h2>

                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Job Info */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                                            {app.jobTitle}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{app.company}</p>
                                        <div className="flex gap-4 text-xs text-gray-500 mt-2">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} /> {app.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign size={12} /> {app.salary}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="flex flex-col items-end gap-3">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(app.status)}`}>
                                    {getStatusIcon(app.status)}
                                    <span className="text-sm font-bold">{app.statusText}</span>
                                </div>

                                <div className="text-xs text-gray-500">
                                    Applied: {new Date(app.appliedDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>

                                {app.interviewDate && (
                                    <div className="text-xs text-orange-400 font-bold flex items-center gap-1">
                                        <Calendar size={12} />
                                        Interview: {new Date(app.interviewDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                )}

                                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white hover:text-black transition-all">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    const colorClasses = {
        blue: 'text-blue-400 bg-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        orange: 'text-orange-400 bg-orange-500/10',
        green: 'text-green-400 bg-green-500/10'
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-400 text-sm">{title}</p>
        </div>
    );
};

export default StudentApplicationsView;
