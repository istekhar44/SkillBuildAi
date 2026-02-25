import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare, Phone, Calendar, Star, FileText } from 'lucide-react';

const CandidatePipelineSection = ({ title = 'Candidate Pipeline' }) => {
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

    const columnColors = {
        applied: 'bg-blue-400',
        screening: 'bg-purple-400',
        interview: 'bg-orange-400',
        offer: 'bg-green-400'
    };

    return (
        <div className="mt-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-gray-400 text-sm mt-1">Drag and drop candidates between stages</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {Object.entries(columns).map(([key, val]) => (
                            <span key={key} className="flex items-center gap-1 capitalize">
                                <span className={`w-2 h-2 rounded-full ${columnColors[key]}`}></span>
                                {key} ({val.length})
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-5 overflow-x-auto pb-6" style={{ minHeight: '420px' }}>
                {Object.entries(columns).map(([colId, candidates]) => (
                    <div
                        key={colId}
                        className="w-[300px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, colId)}
                    >
                        {/* Column Header */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl rounded-t-2xl">
                            <h3 className="font-bold text-gray-200 capitalize flex items-center gap-2 text-sm">
                                <span className={`w-2 h-2 rounded-full ${columnColors[colId]}`}></span>
                                {colId}
                                <span className="text-gray-500 text-xs ml-1 bg-black/20 px-2 py-0.5 rounded-full">{candidates.length}</span>
                            </h3>
                            <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal size={14} /></button>
                        </div>

                        {/* Cards */}
                        <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scrollbar-pipeline">
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

                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {c.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                        <div className="flex gap-2 text-gray-500">
                                            <button className="hover:text-blue-400 p-1 hover:bg-white/5 rounded transition-colors"><MessageSquare size={12} /></button>
                                            <button className="hover:text-green-400 p-1 hover:bg-white/5 rounded transition-colors"><Phone size={12} /></button>
                                            <button className="hover:text-purple-400 p-1 hover:bg-white/5 rounded transition-colors"><FileText size={12} /></button>
                                        </div>
                                        <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                            <Calendar size={10} /> 2d ago
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {candidates.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-xl text-gray-600 text-sm">
                                    Drop candidates here
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .custom-scrollbar-pipeline::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar-pipeline::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default CandidatePipelineSection;
