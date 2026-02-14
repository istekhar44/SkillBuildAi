import React from 'react';

const JobCard = ({ job }) => (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer relative hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{job.logo}</div>
                <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                    <p className="text-gray-400 text-sm font-medium">{job.company}</p>
                </div>
            </div>
            {/* Bookmark Icon */}
            <div className="text-gray-500 hover:text-indigo-400 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" /></svg>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-lg text-xs font-semibold">{job.type}</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-lg text-xs font-semibold">{job.experience}</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-lg text-xs font-semibold">{job.location}</span>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{job.description}</p>

        <div className="flex items-center justify-between mt-auto">
            <span className="text-white font-bold text-lg">{job.salary}</span>
            <button className="bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors font-bold text-sm shadow-lg">Apply Now</button>
        </div>
    </div>
);

export default JobCard;
