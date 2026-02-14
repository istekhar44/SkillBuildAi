import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ArrowLeft, MoreHorizontal, MessageSquare, Phone, Calendar, Star, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CandidatePipeline = () => {
    const navigate = useNavigate();

    // Mock Data
    const [columns, setColumns] = useState({
        applied: [
            { id: 1, name: 'Sarah Jenks', role: 'Senior React Dev', rating: 4.8, tags: ['React', 'Node'] },
            { id: 2, name: 'Mike Ross', role: 'UX Designer', rating: 4.2, tags: ['Figma', 'UI'] }
        ],
        screening: [
            { id: 3, name: 'Jessica Pearson', role: 'Product Manager', rating: 4.9, tags: ['Agile', 'Strategy'] }
        ],
        interview: [
            { id: 4, name: 'Harvey Specter', role: 'Legal Counsel', rating: 5.0, tags: ['Corporate', 'Contract'] }
        ],
        offer: []
    });

    const onDragStart = (e, id, sourceCol) => {
        e.dataTransfer.setData('id', id);
        e.dataTransfer.setData('sourceCol', sourceCol);
    };

    const onDrop = (e, targetCol) => {
        const id = e.dataTransfer.getData('id');
        const sourceCol = e.dataTransfer.getData('sourceCol');

        if (sourceCol === targetCol) return;

        const candidate = columns[sourceCol].find(c => c.id === parseInt(id));

        setColumns({
            ...columns,
            [sourceCol]: columns[sourceCol].filter(c => c.id !== parseInt(id)),
            [targetCol]: [...columns[targetCol], candidate]
        });
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            <div className="max-w-[1600px] mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/recruiter')} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Candidate Pipeline</h1>
                            <p className="text-gray-400 text-sm">Senior React Developer • Remote</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs">U{i}</div>)}
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                            + Add Candidate
                        </button>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex gap-6 overflow-x-auto pb-8 min-h-[calc(100vh-250px)]">
                    {Object.entries(columns).map(([colId, candidates]) => (
                        <div
                            key={colId}
                            className="w-[350px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, colId)}
                        >
                            {/* Column Header */}
                            <div className="p-4 border-b border-white/5 flex justify-between items-center sticky top-0 bg-white/5 backdrop-blur-xl z-10 rounded-t-2xl">
                                <h3 className="font-bold text-gray-200 capitalize flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${colId === 'applied' ? 'bg-blue-400' : colId === 'screening' ? 'bg-purple-400' : colId === 'interview' ? 'bg-orange-400' : 'bg-green-400'}`}></span>
                                    {colId}
                                    <span className="text-gray-500 text-xs ml-2 bg-black/20 px-2 py-0.5 rounded-full">{candidates.length}</span>
                                </h3>
                                <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                            </div>

                            {/* Cards Container */}
                            <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                                {candidates.map((c) => (
                                    <div
                                        key={c.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, c.id, colId)}
                                        className="bg-black/40 hover:bg-white/10 border border-white/5 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] hover:shadow-lg group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold border border-white/20">
                                                    {c.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-white">{c.name}</h4>
                                                    <p className="text-xs text-gray-500">{c.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-xs font-bold text-yellow-500 gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded">
                                                <Star size={10} fill="currentColor" /> {c.rating}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {c.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                            <div className="flex gap-2 text-gray-500">
                                                <button className="hover:text-blue-400 p-1 hover:bg-white/5 rounded"><MessageSquare size={14} /></button>
                                                <button className="hover:text-green-400 p-1 hover:bg-white/5 rounded"><Phone size={14} /></button>
                                                <button className="hover:text-purple-400 p-1 hover:bg-white/5 rounded"><FileText size={14} /></button>
                                            </div>
                                            <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <Calendar size={10} /> 2d ago
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {candidates.length === 0 && (
                                    <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-xl text-gray-600 text-sm">
                                        No candidates
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }`}</style>
            {/* Short footer for this full-height View */}
            <div className="border-t border-white/5 p-4 text-center text-xs text-gray-600 bg-premium-black">
                &copy; SkillBridge AI Recruiter Suite
            </div>
        </div>
    );
};

export default CandidatePipeline;
