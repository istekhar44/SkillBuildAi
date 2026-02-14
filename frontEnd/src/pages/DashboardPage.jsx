import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        first: { label: "Loading...", value: "0", color: "text-blue-400 bg-blue-500/10" },
        second: { label: "Loading...", value: "0", color: "text-purple-400 bg-purple-500/10" },
        third: { label: "Loading...", value: "0", color: "text-green-400 bg-green-500/10" },
    });
    const [tableData, setTableData] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default to user role, but allow toggle for demo if needed (though real data is tied to user)
    // For "workable" app, we should enforce user role view.
    const userType = user?.role === 'recruiter' ? 'recruiter' : 'student';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const reqOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include' // Important for cookies
                };

                if (userType === 'student') {
                    // 1. Fetch Student Applications for stats
                    const appRes = await fetch(`${API_URL}/application/get`, reqOptions);
                    const appData = await appRes.json();
                    const applications = appData.application || [];

                    // 2. Fetch All Jobs for "Recommended"
                    const jobRes = await fetch(`${API_URL}/job/get`, reqOptions);
                    const jobData = await jobRes.json();
                    const jobs = jobData.jobs || [];

                    // Calculate Stats
                    const appsSent = applications.length;
                    const interviews = applications.filter(app => app.status === 'accepted').length;
                    // 'accepted' might mean shortlisted or interviewed depending on business logic. 
                    // Using it for "Interviews Scheduled" as an approximation or rename label.

                    setStats({
                        first: { label: "Applications Sent", value: appsSent, color: "text-blue-400 bg-blue-500/10" },
                        second: { label: "Accepted", value: interviews, color: "text-green-400 bg-green-500/10" }, // Changed from Interviews
                        third: { label: "Profile Views", value: "N/A", color: "text-purple-400 bg-purple-500/10" },
                    });

                    setRecommendedJobs(jobs.slice(0, 5)); // Show top 5
                } else {
                    // Recruiter
                    // 1. Fetch Recruiter Applications
                    const appRes = await fetch(`${API_URL}/application/recruiter/get`, reqOptions);
                    const appData = await appRes.json();
                    const applications = appData.applications || [];

                    // 2. Fetch Posted Jobs for count
                    const jobRes = await fetch(`${API_URL}/job/getadminjobs`, reqOptions);
                    const jobData = await jobRes.json();
                    const myJobs = jobData.jobs || [];

                    // Stats
                    const activeJobs = myJobs.length;
                    const newApplicants = applications.filter(app => app.status === 'pending').length;
                    const shortlisted = applications.filter(app => app.status === 'accepted').length;

                    setStats({
                        first: { label: "Active Jobs", value: activeJobs, color: "text-blue-400 bg-blue-500/10" },
                        second: { label: "New Applicants", value: newApplicants, color: "text-orange-400 bg-orange-500/10" },
                        third: { label: "Shortlisted", value: shortlisted, color: "text-green-400 bg-green-500/10" },
                    });

                    setTableData(applications);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, userType]);

    // Handle Status Update (Recruiter)
    const handleStatusUpdate = async (id, status) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            await fetch(`${API_URL}/application/status/${id}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
            });
            // Refresh logic could go here, or simple optimistic update:
            setTableData(prev => prev.map(app => app._id === id ? { ...app, status } : app));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {userType === 'student' ? 'Candidate Dashboard' : 'Recruiter Dashboard'}
                        </h1>
                        <p className="text-gray-400">Welcome, {user?.fullname}</p>
                    </div>
                    {/* Access Toggle Removed: Enforcing Role View */}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {Object.values(stats).map((stat, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color} border border-white/5`}>
                                <div className="w-6 h-6 bg-current opacity-50 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {userType === 'student' ? (
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/10">
                                <h2 className="font-bold text-xl mb-6 text-white">Recommended Jobs</h2>
                                <div className="space-y-4">
                                    {recommendedJobs.length > 0 ? recommendedJobs.map(job => (
                                        <div key={job._id} className="flex gap-4 p-4 border border-white/5 bg-black/20 rounded-2xl hover:border-white/20 hover:bg-white/5 cursor-pointer transition-all group">
                                            <div className="w-12 h-12 bg-gray-800 rounded-xl shrink-0 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">logo</div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h4>
                                                <p className="text-sm text-gray-400">{job.location} • {job.jobType}</p>
                                            </div>
                                            <button onClick={() => navigate(`/jobs/${job._id}`)} className="text-white text-sm font-bold bg-white/10 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">View</button>
                                        </div>
                                    )) : <p className="text-gray-500">No jobs found.</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="font-bold text-xl text-white">Recent Applications</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="text-gray-500 font-bold border-b border-white/10 uppercase text-xs tracking-wider">
                                            <tr>
                                                <th className="p-4">Candidate</th>
                                                <th className="p-4">Role</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.length > 0 ? tableData.map(app => (
                                                <tr key={app._id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                    <td className="p-4 font-bold text-white">{app.applicant?.fullname || 'Unknown'}</td>
                                                    <td className="p-4">{app.job?.title || 'Unknown'}</td>
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border-green-500/20' : app.status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/20' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'}`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 flex gap-2">
                                                        <button onClick={() => handleStatusUpdate(app._id, 'accepted')} className="text-green-400 hover:text-green-300 font-bold text-xs">Accept</button>
                                                        <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="text-red-400 hover:text-red-300 font-bold text-xs">Reject</button>
                                                    </td>
                                                </tr>
                                            )) : <tr><td colSpan="4" className="p-4 text-center">No applications found.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div>
                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 text-white p-8 rounded-3xl shadow-2xl mb-6 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="font-bold text-2xl mb-2">{userType === 'student' ? 'Upgrade your Resume' : 'Post a Job'}</h3>
                                <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                                    {userType === 'student'
                                        ? 'Get AI insights to improve your ATS score today.'
                                        : 'Reach thousands of qualified candidates effortlessly.'}
                                </p>
                                <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-200 transition-colors w-full">
                                    {userType === 'student' ? 'Check ATS Score' : 'Create Listing'}
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
