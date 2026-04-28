import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Building2, MapPin, Users, Briefcase, Search } from 'lucide-react';
import { companies as staticCompanies } from '../data/companies';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [usingApi, setUsingApi] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const params = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
                const res = await fetch(`${API}/api/company/public${params}`);
                const data = await res.json();

                if (data.success && data.companies?.length > 0) {
                    setCompanies(data.companies);
                    setUsingApi(true);
                } else {
                    setUsingApi(false);
                    setCompanies([]);
                }
            } catch (err) {
                console.error('Failed to fetch companies:', err);
                setUsingApi(false);
                setCompanies([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchCompanies, 300);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    // Merge API and static companies, avoiding duplicates by name
    const combinedCompanies = usingApi 
        ? [...companies, ...staticCompanies.filter(sc => !companies.some(c => c.name.toLowerCase() === sc.name.toLowerCase()))]
        : staticCompanies;

    const displayCompanies = combinedCompanies.filter(c =>
        !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.industry && c.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white font-serif">Explore Companies</h1>
                        <p className="text-gray-400 mt-2">Discover top companies hiring right now</p>
                    </div>
                    <div className="relative mt-4 md:mt-0">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-72"
                        />
                    </div>
                </div>

                {/* {!usingApi && !loading && (
                    // <div className="mb-4 text-xs text-yellow-400/60 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2">
                    //     Showing sample companies. Connect your backend for live data.
                    // </div>
                )} */}

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading companies...</div>
                ) : displayCompanies.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl">No companies found matching your search.</p>
                        <button onClick={() => setSearchTerm('')} className="text-indigo-400 mt-4 underline">Clear Search</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayCompanies.map((company) => {
                            const isApi = !!company._id;
                            const companyId = company._id || company.id;
                            const name = company.name;
                            const location = company.location || 'Not specified';
                            const description = company.description || company.industry || '';
                            const logoUrl = isApi ? company.logo : company.logoUrl;
                            const website = company.website || company.careerUrl || '#';

                            return (
                                <div key={companyId} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center overflow-hidden">
                                            {logoUrl ? (
                                                <img src={logoUrl} alt={name} className="w-full h-full object-contain p-2" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                            ) : null}
                                            <span style={{ display: logoUrl ? 'none' : 'flex' }} className="w-full h-full items-center justify-center text-white font-bold text-xl">{name[0]}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
                                            <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin size={12} /> {location}</p>
                                        </div>
                                    </div>
                                    {description && <p className="text-xs text-gray-500 mb-4 line-clamp-2">{description}</p>}
                                    <a href={website} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                                        View Details
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CompaniesPage;
