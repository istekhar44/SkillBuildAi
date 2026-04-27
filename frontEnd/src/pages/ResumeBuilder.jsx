import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Loader2, UploadCloud, FileText, CheckCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

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
    const [atsMode, setAtsMode] = useState('auto'); // 'auto' or 'jd'

    // --- New Upload State ---
    const [uploadMode, setUploadMode] = useState('editor'); // 'editor' or 'pdf'
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [parsedPdfText, setParsedPdfText] = useState('');
    const [isParsingPdf, setIsParsingPdf] = useState(false);

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

    // --- PDF Parsing ---
    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please select a valid PDF file.');
            return;
        }

        setUploadedFileName(file.name);
        setIsParsingPdf(true);
        setParsedPdfText('');
        setAtsResult(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageStrings = textContent.items.map(item => item.str);
                fullText += pageStrings.join(' ') + '\n\n';
            }

            setParsedPdfText(fullText.trim());
        } catch (error) {
            console.error('Error parsing PDF:', error);
            alert('Could not reading the PDF file. Please try a different document.');
            setUploadedFileName(null);
        } finally {
            setIsParsingPdf(false);
        }
    };

    // --- ATS Analysis (Gemini) ---
    const GEMINI_MODELS = [
        'gemini-2.0-flash',
        'gemini-2.0-flash-lite',
        'gemini-1.5-pro'
    ];

    const callGeminiAPI = async (apiKey, model, userQuery, systemPrompt) => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        const data = await response.json();
        return { response, data };
    };

    const resetAtsCheck = () => {
        setAtsResult(null);
    };

    const runATSCheck = async (mode = 'auto') => {
        if (mode === 'jd' && !jobDescription) {
            alert("Please paste the job description first to analyze.");
            return;
        }

        if (uploadMode === 'pdf' && !parsedPdfText) {
            alert("Please upload a PDF resume or switch to 'Use Editor Data'.");
            return;
        }

        // For editor mode, check if there's any data
        if (uploadMode === 'editor') {
            const hasData = resumeData.personal.name || resumeData.personal.email || resumeData.skills || resumeData.experience.length > 0 || resumeData.education.length > 0 || resumeData.projects.length > 0;
            if (!hasData) {
                alert("Please fill in some resume details in the editor or upload a PDF first.");
                return;
            }
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

        const resumeSourceText = uploadMode === 'pdf'
            ? parsedPdfText
            : JSON.stringify(resumeData, null, 2);

        // Different prompts based on mode
        const autoScanPrompt = `You are an expert ATS (Applicant Tracking System) reviewer. Analyze this resume for its overall ATS compatibility and quality WITHOUT any specific job description.
Evaluate the resume on these criteria:
- **Formatting & Structure** (20%): Proper sections (Contact, Summary, Skills, Experience, Education, Projects), clean layout, no fancy formatting that confuses ATS parsers.
- **Keyword Optimization** (25%): Industry-relevant keywords, technical skills properly listed, action verbs used in descriptions.
- **Content Quality** (25%): Quantified achievements, clear descriptions, relevant experience and projects.
- **Section Completeness** (15%): All critical sections present and filled out (contact info, skills, experience/projects, education).
- **Overall ATS Friendliness** (15%): Standard fonts, no tables/graphics that break parsing, proper headings.

Output your response ONLY in raw HTML format using standard semantic tags (<h2>, <h3>, <ul>, <li>, <p>, <strong>).
Do not use Markdown formatting like ** or ##. Do not wrap the output in \`\`\`html code blocks.
Include these sections:
1. Overall ATS Score formatted exactly as: <div class="text-4xl font-bold mb-2" style="color: {score >= 70 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'}">ATS Score: X%</div><p class="text-gray-400 text-sm mb-4">{rating text like 'Excellent', 'Good', 'Needs Improvement', 'Poor'}</p>
2. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">📊 Score Breakdown</h2> followed by a list showing each criterion score.
3. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">✅ Strengths</h2> followed by a <ul> list of what the resume does well.
4. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">⚠️ Issues Found</h2> followed by a <ul> list of problems that hurt ATS score.
5. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">💡 Improvement Tips</h2> followed by specific, actionable suggestions.
6. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">🔑 Recommended Keywords</h2> followed by a list of keywords that should be added based on the skills/experience shown.
Make sure the text is readable on a dark theme (default text color is light). Use color classes like text-green-400, text-yellow-400, text-red-400 for visual emphasis.`;

        const jdMatchPrompt = `You are an expert ATS (Applicant Tracking System) reviewer. Analyze the resume against the job description.
Output your response ONLY in raw HTML format using standard semantic tags (<h2>, <h3>, <ul>, <li>, <p>, <strong>).
Do not use Markdown formatting like ** or ##. Do not wrap the output in \`\`\`html code blocks.
Include these sections:
1. Match Score formatted exactly as: <div class="text-4xl font-bold mb-2" style="color: {score >= 70 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'}">Match Score: X%</div>
2. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">Missing Keywords</h2> followed by a <ul> list.
3. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">Matching Keywords</h2> followed by a <ul> list.
4. <h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">Critical Feedback</h2> followed by <p> and <ul> as needed.
Make sure the text is readable on a dark theme (default text color is light).`;

        const systemPrompt = mode === 'auto' ? autoScanPrompt : jdMatchPrompt;
        const userQuery = mode === 'auto'
            ? `RESUME:\n${resumeSourceText}`
            : `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resumeSourceText}`;

        try {
            let lastError = null;

            // Try each model until one succeeds
            for (const model of GEMINI_MODELS) {
                try {
                    const { response, data } = await callGeminiAPI(apiKey, model, userQuery, systemPrompt);

                    if (response.ok) {
                        let htmlContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";
                        // Clean up any accidental markdown blocks
                        htmlContent = htmlContent.replace(/```html/gi, '').replace(/```/g, '').trim();
                        setAtsResult(htmlContent);
                        return; // Success — exit
                    }

                    // If quota exceeded (429) or model not found (404), try next model
                    if (response.status === 429 || response.status === 404) {
                        console.warn(`Model ${model} failed (${response.status}), trying next...`);
                        lastError = data.error?.message || `Error ${response.status} for ${model}`;
                        continue;
                    }

                    // Other errors — throw immediately
                    throw new Error(data.error?.message || 'Failed to fetch from Gemini API');
                } catch (modelError) {
                    lastError = modelError.message;
                    // Only continue if it was a retryable error, otherwise rethrow
                    if (!modelError.message?.includes('429') && !modelError.message?.includes('quota') && !modelError.message?.includes('not found')) {
                        throw modelError;
                    }
                }
            }

            // All models exhausted
            throw new Error(lastError || 'All Gemini models are unavailable. Please check your API key quota.');
        } catch (error) {
            setAtsResult(`<div class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-4">
                <strong>Analysis failed:</strong><br/>${error.message}
                <p class="mt-3 text-xs text-gray-400">Tip: Your Gemini API key may have exceeded its free tier quota. Try generating a new API key from <a href="https://aistudio.google.com/apikey" target="_blank" class="underline text-indigo-400">Google AI Studio</a>.</p>
            </div>`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Resume Builder</h1>
                        <p className="text-gray-400 mt-1">Create an ATS-optimized resume with AI assistance.</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
                        <button
                            onClick={() => { setUploadMode('editor'); setAtsMode('auto'); setShowAtsModal(true); }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 md:px-5 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                        >
                            <span className="text-lg">🎯</span> ATS Score
                        </button>
                        <button
                            onClick={generatePDF}
                            className="bg-white text-black px-4 py-2.5 md:px-5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2"
                        >
                            <span className="text-lg">📥</span> Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* === TOP ROW: UPLOAD EXISTING RESUME === */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden xl:col-span-2">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-white tracking-wide flex items-center gap-2"><UploadCloud size={20} className="text-indigo-400" /> Optimize Existing Resume</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-white font-bold mb-2">Have a resume already?</h3>
                                <p className="text-gray-400 text-sm mb-6">Upload your PDF resume to instantly check its ATS score — no job description needed.</p>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            handlePdfUpload(e);
                                            setUploadMode('pdf');
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {isParsingPdf ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                                            <span className="text-gray-300 font-medium tracking-wide">Extracting text safely...</span>
                                        </div>
                                    ) : uploadedFileName ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                                                <CheckCircle size={24} />
                                            </div>
                                            <span className="text-white font-bold text-lg">{uploadedFileName}</span>
                                            <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">Click to replace file</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <UploadCloud size={32} className="text-indigo-400" />
                                            </div>
                                            <div>
                                                <span className="text-white font-bold text-lg block">Drop PDF here or click</span>
                                                <span className="text-sm mt-1 block">Maximum file size 5MB</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col h-full justify-center space-y-4">
                                <button
                                    onClick={() => {
                                        setUploadMode('pdf');
                                        setAtsMode('auto');
                                        setShowAtsModal(true);
                                    }}
                                    disabled={!parsedPdfText}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-lg ${parsedPdfText ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}
                                >
                                    <span className="text-xl">🎯</span> Get ATS Score
                                </button>
                                {!parsedPdfText && <p className="text-center text-xs text-gray-500">Please upload a PDF first to enable analysis.</p>}
                            </div>
                        </div>
                    </div>

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
                                            className={`w-full p-3 border border-blue-200 rounded-xl focus:ring-1 focus:ring-blue-300 text-gray-800 placeholder-gray-400 outline-none transition-all ${field === 'portfolio' ? 'md:col-span-2' : ''}`}
                                            style={{ backgroundColor: '#E7F5FE' }}
                                        />
                                    ))}
                                    <textarea
                                        name="summary"
                                        placeholder="Professional Summary..."
                                        value={resumeData.personal.summary}
                                        onChange={handlePersonalChange}
                                        className="md:col-span-2 w-full p-3 border border-blue-200 rounded-xl focus:ring-1 focus:ring-blue-300 text-gray-800 placeholder-gray-400 outline-none h-24 resize-none transition-all"
                                        style={{ backgroundColor: '#E7F5FE' }}
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
                                    className="w-full p-3 border border-blue-200 rounded-xl h-24 resize-none focus:ring-1 focus:ring-blue-300 text-gray-800 placeholder-gray-400 outline-none"
                                    style={{ backgroundColor: '#E7F5FE' }}
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
                                                    <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={item[f] || ''} onChange={(e) => updateListItem('experience', idx, f, e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-300" style={{ backgroundColor: '#E7F5FE' }} />
                                                ))}
                                            </div>
                                            <textarea placeholder="Achievements..." value={item.description || ''} onChange={(e) => updateListItem('experience', idx, 'description', e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm h-20 resize-none text-gray-800 focus:outline-none focus:border-blue-300" style={{ backgroundColor: '#E7F5FE' }} />
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
                                            <input placeholder="Project Title" value={item.title || ''} onChange={(e) => updateListItem('projects', idx, 'title', e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm mb-2 text-gray-800 focus:outline-none focus:border-blue-300" style={{ backgroundColor: '#E7F5FE' }} />
                                            <textarea placeholder="Description" value={item.description || ''} onChange={(e) => updateListItem('projects', idx, 'description', e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm h-16 resize-none text-gray-800 focus:outline-none focus:border-blue-300" style={{ backgroundColor: '#E7F5FE' }} />
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
                                                    <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={item[f] || ''} onChange={(e) => updateListItem('education', idx, f, e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-300" style={{ backgroundColor: '#E7F5FE' }} />
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
                                <div className="space-y-6 animate-fade-in-up">

                                    {/* Data Source Toggle */}
                                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 w-full">
                                        <button
                                            onClick={() => setUploadMode('editor')}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${uploadMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            <FileText size={16} /> Use Editor Data
                                        </button>
                                        <button
                                            onClick={() => setUploadMode('pdf')}
                                            disabled={!parsedPdfText}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${uploadMode === 'pdf' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'} ${!parsedPdfText ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            title={!parsedPdfText ? 'Upload a PDF from the main screen first' : 'Use Uploaded PDF'}
                                        >
                                            {parsedPdfText ? <CheckCircle size={16} className="text-green-400" /> : <UploadCloud size={16} />} Use Uploaded PDF
                                        </button>
                                    </div>

                                    {/* Analysis Mode Toggle */}
                                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 w-full">
                                        <button
                                            onClick={() => setAtsMode('auto')}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${atsMode === 'auto' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            🎯 Quick ATS Scan
                                        </button>
                                        <button
                                            onClick={() => setAtsMode('jd')}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${atsMode === 'jd' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            📄 Match with Job
                                        </button>
                                    </div>

                                    {atsMode === 'auto' ? (
                                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                                            <p className="text-sm text-indigo-300 flex items-start gap-2">
                                                <span className="text-lg mt-0.5">💡</span>
                                                <span><strong>Quick ATS Scan</strong> automatically evaluates your resume on formatting, keywords, structure, and ATS-friendliness — no job description needed.</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <textarea
                                            className="w-full p-4 bg-black/50 border border-white/10 rounded-xl h-48 focus:ring-1 focus:ring-white/50 outline-none resize-none text-sm text-gray-300 placeholder-gray-600"
                                            placeholder="Paste job description to match against..."
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                        />
                                    )}
                                </div>
                            )}
                            {isAnalyzing && (
                                <div className="text-center py-10 text-white">
                                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" />
                                    <p className="font-bold text-lg">{atsMode === 'auto' ? 'Scanning resume for ATS compatibility...' : 'Matching resume against job description...'}</p>
                                    <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
                                </div>
                            )}
                            {atsResult && <div dangerouslySetInnerHTML={{ __html: atsResult }} className="prose prose-sm prose-invert max-w-none" />}
                        </div>
                        <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-3xl">
                            {!atsResult && !isAnalyzing ? (
                                <button
                                    onClick={() => runATSCheck(atsMode)}
                                    className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {atsMode === 'auto' ? <><span>🎯</span> Scan ATS Score</> : <><span>📄</span> Run Match Analysis</>}
                                </button>
                            ) : atsResult ? (
                                <button onClick={resetAtsCheck} className="w-full py-3.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    <span>🔄</span> Try Again
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }`}</style>
            <Footer />
        </div>
    );
};

export default ResumeBuilder;
