import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { companies } from '../data/companies';
import { MapPin, Briefcase, Search } from 'lucide-react';

const CompaniesPage = () => {
    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            {/* Header / Hero for Companies (Crystal) */}
            <div className="relative py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">Top Companies</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Explore thousands of companies hiring now. Find the perfect workplace that matches your ambition and culture.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
                        <Search className="text-gray-400 ml-4" size={24} />
                        <input
                            type="text"
                            placeholder="Search companies by name or industry..."
                            className="bg-transparent border-none outline-none text-white px-4 py-3 flex-1 placeholder-gray-500 text-lg"
                        />
                        <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Companies Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {companies.map((company) => (
                        <div key={company.id} className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/10 group cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                            {/* Card Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-inner border border-white/10 bg-gradient-to-br from-gray-800 to-black overflow-hidden`}>
                                    {company.logoUrl ? (
                                        <img
                                            src={company.logoUrl}
                                            alt={company.name}
                                            className="w-full h-full object-contain p-2"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <span style={{ display: company.logoUrl ? 'none' : 'flex' }} className="w-full h-full items-center justify-center">
                                        {company.logo}
                                    </span>
                                </div>
                                <span className="bg-white/10 border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                                    {company.jobsOpen} Jobs
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{company.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 font-medium tracking-wide uppercase">{company.industry}</p>

                            <div className="flex items-center text-gray-500 text-sm gap-2 mt-auto border-t border-white/5 pt-4">
                                <MapPin size={16} className="text-indigo-400" />
                                <span>{company.location}</span>
                            </div>

                            <a href={company.careerUrl} target="_blank" rel="noopener noreferrer" className="block w-full mt-6 py-3 border border-white/10 text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-sm shadow-lg text-center">
                                View Details
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CompaniesPage;
