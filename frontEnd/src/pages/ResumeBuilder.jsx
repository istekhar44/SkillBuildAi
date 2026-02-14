import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Loader2 } from 'lucide-react';

const ResumeBuilder = () => {
    // --- State Management ---
    const [resumeData, setResumeData] = useState({
        personal: { name: '', email: '', phone: '', linkedin: '', portfolio: '', summary: '' },
        education: [],
        experience: [],
        projects: [],
        skills: ''
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [atsResult, setAtsResult] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [showAtsModal, setShowAtsModal] = useState(false);
    const previewRef = useRef(null);

    // --- Handlers ---
    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [name]: value }
        }));
    };

    const handleSkillsChange = (e) => {
        setResumeData(prev => ({ ...prev, skills: e.target.value }));
    };

    // Generic list handlers
    const addListItem = (section, initialData = {}) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], initialData]
        }));
    };

    const removeListItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const updateListItem = (section, index, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item)
        }));
    };

    // --- PDF Generation ---
    const generatePDF = async () => {
        if (!previewRef.current) return;

        try {
            const originalWidth = previewRef.current.style.width;
            previewRef.current.style.width = '210mm';

            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            previewRef.current.style.width = originalWidth;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = 210;
            const pdfHeight = 297;
            const imgProps = pdf.getImageProperties(imgData);
            const ratio = imgProps.height / imgProps.width;

            let finalWidth = pdfWidth;
            let finalHeight = pdfWidth * ratio;

            if (finalHeight > pdfHeight) {
                finalHeight = pdfHeight;
                finalWidth = pdfHeight / ratio;
            }

            const x = (pdfWidth - finalWidth) / 2;
            pdf.addImage(imgData, 'PNG', x, 0, finalWidth, finalHeight);
            pdf.save(`${resumeData.personal.name.replace(/\s+/g, '_') || 'resume'}_CV.pdf`);

        } catch (error) {
            console.error("PDF generation failed", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    // --- ATS Analysis (Gemini) ---
    const runATSCheck = async () => {
        if (!jobDescription) {
            alert("Please paste the job description first to analyze.");
            return;
        }

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setAtsResult(`
                <div class="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/30">
                    <strong>API Key Missing</strong><br/>
                    Please add <code>VITE_GEMINI_API_KEY</code> to your <code>.env</code> file.
                </div>
            `);
            return;
        }

        setIsAnalyzing(true);
        setAtsResult(null);

        const resumeText = JSON.stringify(resumeData, null, 2);
        const systemPrompt = `You are an expert ATS (Applicant Tracking System) reviewer. Analyze the resume against the job description. Output in HTML-ready Markdown. Provide Match Score, Missing Keywords, and Critical Feedback.`;
        const userQuery = `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME JSON:\n${resumeText}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userQuery }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                })
            });
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";

            const formattedHtml = text
                .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2 text-white">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">$1</h2>')
                .replace(/^\*\*Match Score\*\*:? (.*$)/gim, '<div class="text-3xl font-bold text-green-400 mb-4">Score: $1</div>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');

            setAtsResult(formattedHtml);
        } catch (error) {
            setAtsResult(`<p class="text-red-400">Analysis failed: ${error.message}</p>`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Resume Builder</h1>
                        <p className="text-gray-400 mt-1">Create an ATS-optimized resume with AI assistance.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAtsModal(true)}
                            className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg flex items-center gap-2"
                        >
                            <span className="text-lg">✨</span> ATS Check
                        </button>
                        <button
                            onClick={generatePDF}
                            className="bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2"
                        >
                            <span className="text-lg">📥</span> Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* === LEFT COLUMN: EDITOR FORM (Crystal Glass Look) === */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5">
                            <h2 className="font-bold text-lg text-white tracking-wide">Editor Details</h2>
                        </div>

                        <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">

                            {/* Personal Info */}
                            <section>
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['name', 'email', 'phone', 'linkedin', 'portfolio'].map((field) => (
                                        <input
                                            key={field}
                                            name={field}
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                            value={resumeData.personal[field]}
                                            onChange={handlePersonalChange}
                                            className={`w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none transition-all ${field === 'portfolio' ? 'md:col-span-2' : ''}`}
                                        />
                                    ))}
                                    <textarea
                                        name="summary"
                                        placeholder="Professional Summary..."
                                        value={resumeData.personal.summary}
                                        onChange={handlePersonalChange}
                                        className="md:col-span-2 w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none h-24 resize-none transition-all"
                                    />
                                </div>
                            </section>

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Skills */}
                            <section>
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Skills</h3>
                                <textarea
                                    placeholder="React, Node.js, Python, Leadership..."
                                    value={resumeData.skills}
                                    onChange={handleSkillsChange}
                                    className="w-full p-3 bg-black/40 border border-white/10 rounded-xl h-24 resize-none focus:ring-1 focus:ring-white/50 text-white placeholder-gray-600 outline-none"
                                />
                            </section>

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Experience */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Experience</h3>
                                    <button onClick={() => addListItem('experience')} className="text-white text-xs font-bold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/20 uppercase tracking-wider">+ Add</button>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.experience.map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/20 transition-all backdrop-blur-sm">
                                            <button onClick={() => removeListItem('experience', idx)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">×</button>
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                {['role', 'company', 'dates', 'location'].map(f => (
                                                    <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={item[f] || ''} onChange={(e) => updateListItem('experience', idx, f, e.target.value)} className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30" />
                                                ))}
                                            </div>
                                            <textarea placeholder="Achievements..." value={item.description || ''} onChange={(e) => updateListItem('experience', idx, 'description', e.target.value)} className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-sm h-20 resize-none text-white focus:outline-none focus:border-white/30" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Projects */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Projects</h3>
                                    <button onClick={() => addListItem('projects')} className="text-white text-xs font-bold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/20 uppercase tracking-wider">+ Add</button>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.projects.map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/20 transition-all backdrop-blur-sm">
                                            <button onClick={() => removeListItem('projects', idx)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">×</button>
                                            <input placeholder="Project Title" value={item.title || ''} onChange={(e) => updateListItem('projects', idx, 'title', e.target.value)} className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-sm mb-2 text-white focus:outline-none focus:border-white/30" />
                                            <textarea placeholder="Description" value={item.description || ''} onChange={(e) => updateListItem('projects', idx, 'description', e.target.value)} className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-sm h-16 resize-none text-white focus:outline-none focus:border-white/30" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Education</h3>
                                    <button onClick={() => addListItem('education')} className="text-white text-xs font-bold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/20 uppercase tracking-wider">+ Add</button>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.education.map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/20 transition-all backdrop-blur-sm">
                                            <button onClick={() => removeListItem('education', idx)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">×</button>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['school', 'degree', 'year'].map(f => (
                                                    <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={item[f] || ''} onChange={(e) => updateListItem('education', idx, f, e.target.value)} className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30" />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* === RIGHT COLUMN: PREVIEW (Glass Container) === */}
                    <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl flex justify-center items-start min-h-[600px] overflow-auto border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div
                            ref={previewRef}
                            className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-10 md:p-12 text-gray-800"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {/* Same Preview Content as Standard */}
                            <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
                                <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight mb-3">
                                    {resumeData.personal.name || 'YOUR NAME'}
                                </h1>
                                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
                                    {['email', 'phone', 'linkedin', 'portfolio'].map(f => resumeData.personal[f] && <span key={f}>• {resumeData.personal[f]}</span>)}
                                </div>
                            </header>

                            {resumeData.personal.summary && (
                                <div className="mb-8">
                                    <h3 className="text-xs uppercase tracking-widest font-bold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">Professional Summary</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">{resumeData.personal.summary}</p>
                                </div>
                            )}

                            {/* Dynamic Preview Sections */}
                            {[
                                { title: 'Skills', data: resumeData.skills, type: 'skills' },
                                { title: 'Work Experience', data: resumeData.experience, type: 'list', fields: ['role', 'company', 'dates', 'location', 'description'] },
                                { title: 'Projects', data: resumeData.projects, type: 'list', fields: ['title', 'description'] },
                                { title: 'Education', data: resumeData.education, type: 'list', fields: ['school', 'degree', 'year'] }
                            ].map((section, idx) => (
                                (section.type === 'skills' ? section.data : section.data.length > 0) && (
                                    <div key={idx} className="mb-8">
                                        <h3 className="text-xs uppercase tracking-widest font-bold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">{section.title}</h3>
                                        {section.type === 'skills' ? (
                                            <div className="flex flex-wrap gap-2">
                                                {section.data.split(',').map((s, i) => s.trim() && <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-md font-semibold border border-gray-200">{s.trim()}</span>)}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {section.data.map((item, i) => (
                                                    <div key={i}>
                                                        {section.title === 'Education' ? (
                                                            <div className="flex justify-between">
                                                                <div><div className="font-bold text-gray-900">{item.school}</div><div className="text-sm text-gray-600">{item.degree}</div></div>
                                                                <div className="text-sm font-medium text-gray-500 text-right">{item.year}</div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-between items-baseline mb-1">
                                                                    <div className="font-bold text-gray-900">{item.role || item.title}</div>
                                                                    {item.dates && <span className="text-sm font-medium text-gray-500">{item.dates}</span>}
                                                                </div>
                                                                {item.company && <div className="flex justify-between text-xs text-gray-500 mb-2"><span>{item.company}</span><span>{item.location}</span></div>}
                                                                <p className="text-sm text-gray-600 whitespace-pre-line">{item.description}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ATS Modal (Crystal) */}
            {showAtsModal && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-stone-950/90 backdrop-blur-2xl rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-white/10 animate-fade-in-up">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-3xl">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2"><span>🤖</span> ATS Resume Checker</h2>
                            <button onClick={() => setShowAtsModal(false)} className="text-gray-400 hover:text-white">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            {!atsResult && !isAnalyzing && (
                                <textarea
                                    className="w-full p-4 bg-black/50 border border-white/10 rounded-xl h-48 focus:ring-1 focus:ring-white/50 outline-none resize-none text-sm text-gray-300 placeholder-gray-600"
                                    placeholder="Paste job description..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            )}
                            {isAnalyzing && <div className="text-center py-10 text-white"><Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" />Analyzing...</div>}
                            {atsResult && <div dangerouslySetInnerHTML={{ __html: atsResult }} className="prose prose-sm prose-invert max-w-none" />}
                        </div>
                        {!atsResult && !isAnalyzing && (
                            <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-3xl">
                                <button onClick={runATSCheck} className="w-full py-3.5 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">Run Analysis</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }`}</style>
            <Footer />
        </div>
    );
};

export default ResumeBuilder;
