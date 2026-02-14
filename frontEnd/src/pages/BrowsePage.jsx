import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

const categories = ['Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 'Management', 'Finance', 'Healthcare', 'Education', 'Engineering'];
const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo'];

const BrowsePage = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state?.searchQuery) {
            setSearchQuery(location.state.searchQuery);
        }

        // Also check if category was passed in URL params
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
    }, [location]);

    useEffect(() => {
        // Fetch jobs from backend
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('keyword', searchQuery);
                if (selectedCategory) params.append('category', selectedCategory);
                if (selectedLocation) params.append('location', selectedLocation);

                const res = await fetch(`${import.meta.env.VITE_API_URL}/job/get?${params.toString()}`);
                const data = await res.json();

                if (data.success) {
                    setJobs(data.jobs || []);
                }
            } catch (err) {
                console.error('Failed to fetch jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchQuery, selectedCategory, selectedLocation]);

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Layout for Filter Sidebar and Job Grid */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-72 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-white font-serif">Filter Jobs</h2>

                        <div className="mb-8">
                            <h3 className="font-semibold mb-4 text-lg text-gray-300 flex items-center gap-2">Category</h3>
                            <label className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                                <input type="radio" name="category" value="" checked={selectedCategory === ''} onChange={(e) => setSelectedCategory(e.target.value)} className="w-4 h-4 accent-brand-purple" />
                                <span className="text-gray-300 font-medium">All Categories</span>
                            </label>
                            {categories.map((cat, idx) => (
                                <label key={idx} className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                                    <input type="radio" name="category" value={cat} checked={selectedCategory === cat} onChange={(e) => setSelectedCategory(e.target.value)} className="w-4 h-4 accent-brand-purple" />
                                    <span className="text-gray-300">{cat}</span>
                                </label>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-semibold mb-4 text-lg text-gray-300 flex items-center gap-2">Location</h3>
                            {locations.map((loc, idx) => (
                                <label key={idx} className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                                    <input type="radio" name="location" value={loc} checked={selectedLocation === loc} onChange={(e) => setSelectedLocation(e.target.value)} className="w-4 h-4 accent-brand-purple" />
                                    <span className="text-gray-300">{loc}</span>
                                </label>
                            ))}
                        </div>

                        {(selectedCategory || selectedLocation) && (
                            <button onClick={() => { setSelectedCategory(''); setSelectedLocation(''); }} className="w-full mt-6 bg-white/5 text-gray-300 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/5">Clear Filters</button>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-white font-serif">{loading ? 'Loading...' : `${jobs.length} Jobs Found`}</h2>
                            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-64" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {jobs.map(job => (<JobCard key={job._id} job={job} />))}
                        </div>

                        {jobs.length === 0 && !loading && (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-xl">No jobs found matching your criteria.</p>
                                <button onClick={() => { setSearchQuery(''); setSelectedCategory(''); setSelectedLocation(''); }} className="text-indigo-400 mt-4 underline hover:text-indigo-300">Reset Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BrowsePage;
