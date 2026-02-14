import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import StudentApplicationsView from '../components/StudentApplicationsView';
import { Plus, Users, Briefcase, TrendingUp, Search, MoreHorizontal, MapPin, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useViewMode } from '../context/ViewModeContext';

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const { isStudentView } = useViewMode();

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Conditionally render based on view mode */}
                {isStudentView ? (
                    <StudentApplicationsView />
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
                                <p className="text-gray-400">Manage your job postings and candidate pipeline.</p>
                            </div>
                            <button
                                onClick={() => navigate('/post-job')}
                                className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2"
                            >
                                <Plus size={20} /> Post New Job
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <StatCard icon={<Briefcase size={24} />} title="Active Jobs" value="12" change="+2 this week" color="blue" />
                            <StatCard icon={<Users size={24} />} title="Total Candidates" value="843" change="+124 this week" color="purple" />
                            <StatCard icon={<TrendingUp size={24} />} title="Views" value="12.5k" change="+15% this week" color="green" />
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Active Jobs List */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold text-white">Active Job Postings</h2>
                                    <button className="text-gray-400 hover:text-white text-sm">View All</button>
                                </div>

                                {[
                                    { title: 'Senior React Developer', active: 142, new: 12, loc: 'Remote', salary: '$120k - $150k' },
                                    { title: 'UX Designer', active: 89, new: 5, loc: 'New York', salary: '$90k - $110k' },
                                    { title: 'Product Manager', active: 215, new: 28, loc: 'San Francisco', salary: '$140k - $180k' },
                                    { title: 'Backend Engineer', active: 56, new: 2, loc: 'Remote', salary: '$130k - $160k' }
                                ].map((job, i) => (
                                    <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-2">
                                                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.loc}</span>
                                                    <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-white"><MoreHorizontal size={20} /></button>
                                        </div>
                                        <div className="flex gap-4 border-t border-white/5 pt-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-white">{job.active}</span>
                                                <span className="text-xs text-gray-400 uppercase tracking-wide">Total<br />Applicants</span>
                                            </div>
                                            <div className="w-px bg-white/10 mx-2"></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-green-400">+{job.new}</span>
                                                <span className="text-xs text-gray-400 uppercase tracking-wide">New<br />Today</span>
                                            </div>
                                            <div className="ml-auto">
                                                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white hover:text-black transition-all">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Candidates / Pipeline Preview */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-white">Recent Applicants</h2>
                                    <button onClick={() => navigate('/pipeline')} className="text-gray-400 hover:text-white text-sm">View Pipeline</button>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden">
                                    <div className="space-y-6">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                                                    {['JD', 'AS', 'MK', 'RL', 'TP'][i - 1]}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white text-sm truncate">Sarah Jenks</h4>
                                                    <p className="text-xs text-gray-500 truncate">Applied for Senior React Developer</p>
                                                </div>
                                                <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                                                    Review
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:border-white/30 transition-all">
                                        View All 843 Candidates
                                    </button>
                                </div>

                                {/* Quick Actions */}
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-all">
                                            <Users size={20} className="text-purple-400 mb-2" />
                                            <span className="text-sm font-bold block text-gray-200">Team Members</span>
                                        </button>
                                        <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-all">
                                            <TrendingUp size={20} className="text-green-400 mb-2" />
                                            <span className="text-sm font-bold block text-gray-200">Analytics</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

const StatCard = ({ icon, title, value, change, color }) => {
    const colorClasses = {
        blue: 'text-blue-400 bg-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        green: 'text-green-400 bg-green-500/10'
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    {icon}
                </div>
                <span className="bg-white/5 px-2 py-1 rounded text-xs text-green-400 font-bold border border-white/5">{change}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-400 text-sm">{title}</p>
        </div>
    );
};

export default RecruiterDashboard;
