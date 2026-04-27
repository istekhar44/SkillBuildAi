import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const PostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        jobType: 'Full Time',
        location: '',
        salary: '',
        description: '',
        requirements: '',
        experience: 0,
        position: 1,
        companyId: '',
        category: 'Software Development'
    });

    useEffect(() => {
        // Fetch user's companies
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${API}/api/company/get`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setCompanies(data.companies || []);
                    if (data.companies && data.companies.length > 0) {
                        setFormData(prev => ({ ...prev, companyId: data.companies[0]._id }));
                    }
                }
            } catch (err) {
                console.error('Failed to fetch companies:', err);
            }
        };
        fetchCompanies();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API}/api/job/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                alert('Job Posted Successfully!');
                navigate('/recruiter');
            } else {
                setError(data.message || 'Failed to post job');
            }
        } catch (err) {
            setError('Failed to post job. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xl font-bold">
                        {step}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
                        <p className="text-gray-400">Reach thousands of premium candidates.</p>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</div>}

                {companies.length === 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-3 rounded-lg mb-4">
                        You need to create a company first. <button onClick={() => navigate('/companies')} className="underline font-bold">Create Company</button>
                    </div>
                )}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/5 rounded-full mb-10 flex">
                        <div className={`h-full bg-indigo-500 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
                    </div>

                    <form className="space-y-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in-up">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Company</label>
                                    <select name="companyId" value={formData.companyId} onChange={handleInputChange} className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white outline-none transition-all">
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
                                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Senior Product Designer" className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Job Type</label>
                                        <select name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-gray-300 outline-none transition-all appearance-none cursor-pointer">
                                            <option>Full Time</option>
                                            <option>Contract</option>
                                            <option>Freelance</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Location</label>
                                        <input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Remote / New York" className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Salary (Annual)</label>
                                        <input name="salary" type="number" value={formData.salary} onChange={handleInputChange} placeholder="e.g. 100000" className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Experience (Years)</label>
                                        <input name="experience" type="number" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 3" className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in-up">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white outline-none transition-all">
                                        <option>Software Development</option>
                                        <option>Data Science</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                        <option>Sales</option>
                                        <option>Management</option>
                                        <option>Finance</option>
                                        <option>Healthcare</option>
                                        <option>Education</option>
                                        <option>Engineering</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Job Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the role responsibilities..." className="w-full p-4 bg-black/40 border border-white/10 rounded-xl h-48 focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Key Requirements (comma-separated)</label>
                                    <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="React, Node.js, 3+ years experience..." className="w-full p-4 bg-black/40 border border-white/10 rounded-xl h-32 focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Number of Positions</label>
                                    <input name="position" type="number" value={formData.position} onChange={handleInputChange} min="1" className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white outline-none transition-all" />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in-up text-center py-10">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                                    <Sparkles size={40} className="text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Ready to Post?</h3>
                                <p className="text-gray-400 max-w-md mx-auto">Your job "{formData.title}" will be visible to thousands of active candidates immediately.</p>

                                <div className="bg-white/5 rounded-xl p-4 max-w-sm mx-auto mt-6 text-left border border-white/10">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Post Duration</span>
                                        <span className="text-white">30 Days</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Feature Listing</span>
                                        <span className="text-green-400">Included</span>
                                    </div>
                                    <div className="border-t border-white/10 my-2"></div>
                                    <div className="flex justify-between font-bold">
                                        <span className="text-white">Total Cost</span>
                                        <span className="text-white">$0.00 (Beta)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-8 border-t border-white/10">
                            {step > 1 ? (
                                <button type="button" onClick={() => setStep(s => s - 1)} className="text-gray-400 hover:text-white font-bold px-6 py-3 transition-colors">Back</button>
                            ) : <div></div>}

                            {step < 3 ? (
                                <button type="button" onClick={() => setStep(s => s + 1)} disabled={!formData.companyId} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50">Next Step</button>
                            ) : (
                                <button type="button" onClick={handleSubmit} disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                                    {loading ? 'Posting...' : 'Post Job Now'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default PostJob;
