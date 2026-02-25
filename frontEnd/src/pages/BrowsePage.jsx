import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { jobListings as staticJobs, categories, locations } from '../data/jobs';
import { MapPin, Briefcase, Clock, Search, SlidersHorizontal } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const BrowsePage = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usingApi, setUsingApi] = useState(false);

    useEffect(() => {
        if (location.state?.searchQuery) {
            setSearchQuery(location.state.searchQuery);
        }
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
    }, [location]);

    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('keyword', searchQuery);
                if (selectedCategory) params.append('category', selectedCategory);
                if (selectedLocation) params.append('location', selectedLocation);
                params.append('limit', '50');

                const res = await fetch(`${API}/api/job/get?${params.toString()}`);
                const data = await res.json();

                if (data.success && data.jobs?.length > 0) {
                    setJobs(data.jobs);
                    setUsingApi(true);
                } else {
                    // Fallback to static data if API returns empty
                    setJobs([]);
                    setUsingApi(false);
                }
            } catch (err) {
                console.error('Failed to fetch jobs from API:', err);
                setUsingApi(false);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchJobs, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, selectedCategory, selectedLocation]);

    // Use static data as fallback if API returned nothing
    const displayJobs = usingApi ? jobs : staticJobs.filter(job => {
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        const matchesLocation = !selectedLocation || job.location === selectedLocation;
        const matchesSearch = !searchQuery ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesLocation && matchesSearch;
    });

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-72 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-white font-serif flex items-center gap-2"><SlidersHorizontal size={20} /> Filter Jobs</h2>

                        <div className="mb-8">
                            <h3 className="font-semibold mb-4 text-lg text-gray-300 flex items-center gap-2"><Briefcase size={16} /> Category</h3>
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
                            <h3 className="font-semibold mb-4 text-lg text-gray-300 flex items-center gap-2"><MapPin size={16} /> Location</h3>
                            <label className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                                <input type="radio" name="location" value="" checked={selectedLocation === ''} onChange={(e) => setSelectedLocation(e.target.value)} className="w-4 h-4 accent-brand-purple" />
                                <span className="text-gray-300 font-medium">All Locations</span>
                            </label>
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
                            <h2 className="text-3xl font-bold text-white font-serif">{loading ? 'Loading...' : `${displayJobs.length} Jobs Found`}</h2>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-64" />
                            </div>
                        </div>
                        {!usingApi && !loading && (
                            <div className="mb-4 text-xs text-yellow-400/60 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2">
                                Showing sample jobs. Connect your backend for live data.
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {displayJobs.map(job => {
                                const isApiJob = !!job._id;
                                const jobId = job._id || job.id;
                                const companyName = isApiJob ? (job.company?.name || 'Company') : job.company;
                                const salary = isApiJob ? `₹${(job.salary / 100000).toFixed(0)} LPA` : job.salary;
                                const experience = isApiJob ? `${job.experienceLevel} yrs` : job.experience;
                                const type = isApiJob ? job.jobType : job.type;
                                const postedDate = isApiJob ? new Date(job.createdAt).toLocaleDateString() : job.postedDate;
                                const skills = isApiJob ? (job.requirements || []) : (job.skills || []);
                                const logo = isApiJob ? null : job.logo;

                                return (
                                    <div key={jobId} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center overflow-hidden">
                                                {logo ? (
                                                    <>
                                                        <img src={logo} alt={companyName} className="w-full h-full object-contain p-1.5" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                                        <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-white font-bold text-lg">{companyName[0]}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-white font-bold text-lg">{companyName[0]}</span>
                                                )}
                                            </div>
                                            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full font-bold border border-indigo-500/30">{type}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{job.title}</h3>
                                        <p className="text-gray-400 text-sm mb-3">{companyName}</p>
                                        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{job.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {skills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-md">{skill}</span>
                                            ))}
                                        </div>
                                        <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {postedDate}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-sm font-bold text-green-400">{salary}</span>
                                            <span className="text-xs text-gray-500">{experience}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {!loading && displayJobs.length === 0 && (
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
