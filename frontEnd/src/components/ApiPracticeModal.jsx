import React, { useState, useRef } from 'react';
import { X, Play, RotateCcw, Copy, CheckCircle, Loader2, BookOpen, Code2, Zap } from 'lucide-react';

const challenges = [
    {
        id: 1,
        title: 'Basic Fetch — GET Request',
        difficulty: 'Easy',
        diffColor: 'text-green-400 bg-green-500/15',
        description: 'Use the fetch API to make a GET request and display the response.',
        hint: 'fetch() returns a Promise. Use .then() or async/await to handle it.',
        starterCode: `// Challenge 1: Fetch a random user from an API
// Use fetch() to GET data from the URL below
// and log the user's name and email.

const API_URL = "https://jsonplaceholder.typicode.com/users/1";

async function getUser() {
    // Write your code here
    const response = await fetch(API_URL);
    const data = await response.json();
    
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("City:", data.address.city);
}

getUser();`,
        expectedOutput: 'Name:',
    },
    {
        id: 2,
        title: 'POST Request with Fetch',
        difficulty: 'Medium',
        diffColor: 'text-yellow-400 bg-yellow-500/15',
        description: 'Send data to a server using fetch with the POST method.',
        hint: 'Set method to "POST", add headers for Content-Type, and stringify the body.',
        starterCode: `// Challenge 2: Create a new post using POST request
// Send a POST request to the URL below 
// with a JSON body containing title and body.

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function createPost() {
    const newPost = {
        title: "My First Post",
        body: "Learning API requests is awesome!",
        userId: 1,
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    });

    const data = await response.json();
    console.log("Post created!");
    console.log("ID:", data.id);
    console.log("Title:", data.title);
}

createPost();`,
        expectedOutput: 'Post created!',
    },
    {
        id: 3,
        title: 'Handle Loading & Errors',
        difficulty: 'Medium',
        diffColor: 'text-yellow-400 bg-yellow-500/15',
        description: 'Implement proper loading states and error handling for API calls.',
        hint: 'Use try/catch blocks and check response.ok for HTTP errors.',
        starterCode: `// Challenge 3: Handle loading and error states
// Implement a function that:
// 1. Shows a loading state
// 2. Fetches data
// 3. Handles errors gracefully

async function fetchWithErrorHandling(url) {
    console.log("⏳ Loading...");
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(\`HTTP Error: \${response.status}\`);
        }
        
        const data = await response.json();
        console.log("✅ Success! Got", data.length, "items");
        console.log("First item:", data[0].title);
        return data;
    } catch (error) {
        console.log("❌ Error:", error.message);
        return null;
    } finally {
        console.log("🏁 Request complete");
    }
}

// Test with valid URL
fetchWithErrorHandling("https://jsonplaceholder.typicode.com/posts");`,
        expectedOutput: 'Loading',
    },
    {
        id: 4,
        title: 'Fetch Multiple APIs (Promise.all)',
        difficulty: 'Hard',
        diffColor: 'text-red-400 bg-red-500/15',
        description: 'Fetch data from multiple endpoints simultaneously using Promise.all.',
        hint: 'Promise.all() takes an array of promises and resolves when all are done.',
        starterCode: `// Challenge 4: Fetch from multiple APIs at once
// Use Promise.all to fetch users and posts simultaneously

async function fetchMultiple() {
    console.log("⏳ Fetching users and posts...");
    
    try {
        const [usersRes, postsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/posts"),
        ]);

        const users = await usersRes.json();
        const posts = await postsRes.json();

        console.log("👥 Total Users:", users.length);
        console.log("📝 Total Posts:", posts.length);
        
        // Show first user's posts
        const firstUser = users[0];
        const userPosts = posts.filter(p => p.userId === firstUser.id);
        console.log("\\n" + firstUser.name + "'s posts:");
        userPosts.slice(0, 3).forEach(p => {
            console.log("  •", p.title.substring(0, 40) + "...");
        });
    } catch (error) {
        console.log("❌ Error:", error.message);
    }
}

fetchMultiple();`,
        expectedOutput: 'Total Users',
    },
    {
        id: 5,
        title: 'Weather App — Real API',
        difficulty: 'Hard',
        diffColor: 'text-red-400 bg-red-500/15',
        description: 'Build a mini weather fetcher using a public weather API.',
        hint: 'This uses wttr.in which returns weather data in JSON format.',
        starterCode: `// Challenge 5: Fetch live weather data
// Use the free wttr.in API to get weather info

async function getWeather(city) {
    console.log("🌤️ Fetching weather for " + city + "...");
    
    try {
        const response = await fetch(
            \`https://wttr.in/\${city}?format=j1\`
        );
        const data = await response.json();
        
        const current = data.current_condition[0];
        
        console.log("\\n📍 Weather in " + city);
        console.log("🌡️ Temperature: " + current.temp_C + "°C");
        console.log("💨 Wind: " + current.windspeedKmph + " km/h");
        console.log("💧 Humidity: " + current.humidity + "%");
        console.log("☁️ Condition: " + current.weatherDesc[0].value);
        console.log("🌡️ Feels Like: " + current.FeelsLikeC + "°C");
    } catch (error) {
        console.log("❌ Could not fetch weather:", error.message);
    }
}

getWeather("Delhi");`,
        expectedOutput: 'Weather in',
    },
];

const ApiPracticeModal = ({ isOpen, onClose }) => {
    const [activeChallenge, setActiveChallenge] = useState(0);
    const [codes, setCodes] = useState(challenges.map(c => c.starterCode));
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const textareaRef = useRef(null);

    if (!isOpen) return null;

    const currentChallenge = challenges[activeChallenge];
    const currentCode = codes[activeChallenge];

    const updateCode = (newCode) => {
        const newCodes = [...codes];
        newCodes[activeChallenge] = newCode;
        setCodes(newCodes);
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('');
        setShowHint(false);

        const logs = [];
        const originalConsoleLog = console.log;

        // Override console.log to capture output
        console.log = (...args) => {
            logs.push(args.map(a => {
                if (typeof a === 'object') return JSON.stringify(a, null, 2);
                return String(a);
            }).join(' '));
        };

        try {
            // Create an async wrapper and evaluate the code
            const asyncFn = new Function(`
                return (async () => {
                    ${currentCode}
                })();
            `);
            await asyncFn();

            // Wait a bit for async operations to resolve
            await new Promise(resolve => setTimeout(resolve, 2000));

            setOutput(logs.length > 0 ? logs.join('\n') : '✅ Code executed successfully (no console output).');
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        } finally {
            console.log = originalConsoleLog;
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        updateCode(challenges[activeChallenge].starterCode);
        setOutput('');
        setShowHint(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newCode = currentCode.substring(0, start) + '    ' + currentCode.substring(end);
            updateCode(newCode);
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-[1300px] h-[92vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
                style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    animation: 'practiceSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ─── Header ─── */}
                <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Code2 size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                API Practice Lab
                            </h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Write, run & test real API code in your browser
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/10 hover:text-red-400"
                        style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    {/* Left Sidebar — Challenge List */}
                    <div className="w-[280px] border-r flex-shrink-0 flex flex-col"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                    >
                        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Challenges
                            </p>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {challenges.map((ch, idx) => (
                                <button
                                    key={ch.id}
                                    onClick={() => { setActiveChallenge(idx); setOutput(''); setShowHint(false); }}
                                    className={`w-full text-left px-4 py-3.5 border-b transition-all ${idx === activeChallenge
                                        ? 'border-l-[3px] border-l-indigo-500'
                                        : 'border-l-[3px] border-l-transparent hover:border-l-indigo-500/30'
                                        }`}
                                    style={{
                                        borderBottomColor: 'var(--border-light)',
                                        backgroundColor: idx === activeChallenge ? 'var(--bg-card-hover, var(--bg-secondary))' : 'transparent',
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold" style={{ color: idx === activeChallenge ? 'var(--accent, #6366f1)' : 'var(--text-primary)' }}>
                                            {ch.title}
                                        </span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ch.diffColor}`}>
                                        {ch.difficulty}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side — Editor + Output */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Challenge Info Bar */}
                        <div className="px-6 py-4 border-b flex items-start justify-between gap-4"
                            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                        {currentChallenge.title}
                                    </h3>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${currentChallenge.diffColor}`}>
                                        {currentChallenge.difficulty}
                                    </span>
                                </div>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {currentChallenge.description}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                                style={{
                                    color: showHint ? '#f59e0b' : 'var(--text-muted)',
                                    backgroundColor: showHint ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-card)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <BookOpen size={14} />
                                {showHint ? 'Hide Hint' : 'Show Hint'}
                            </button>
                        </div>

                        {/* Hint Banner */}
                        {showHint && (
                            <div className="px-6 py-3 text-sm flex items-start gap-2"
                                style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}
                            >
                                <Zap size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                                <p style={{ color: '#f59e0b' }}><strong>Hint:</strong> {currentChallenge.hint}</p>
                            </div>
                        )}

                        {/* Code Editor + Output Split */}
                        <div className="flex-1 flex flex-col md:flex-row min-h-0">
                            {/* Code Editor */}
                            <div className="flex-1 flex flex-col min-h-0 border-r" style={{ borderColor: 'var(--border-color)' }}>
                                {/* Editor Toolbar */}
                                <div className="flex items-center justify-between px-4 py-2 border-b"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                                        </div>
                                        <span className="text-xs ml-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                                            challenge-{currentChallenge.id}.js
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={copyCode} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                                            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                                        >
                                            {copied ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                        <button onClick={resetCode} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                                            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                                        >
                                            <RotateCcw size={12} /> Reset
                                        </button>
                                    </div>
                                </div>

                                {/* Textarea */}
                                <div className="flex-1 relative min-h-0">
                                    <textarea
                                        ref={textareaRef}
                                        value={currentCode}
                                        onChange={(e) => updateCode(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        spellCheck={false}
                                        className="w-full h-full resize-none border-none outline-none font-mono text-sm leading-relaxed p-5"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            tabSize: 4,
                                        }}
                                    />
                                </div>

                                {/* Run Button */}
                                <div className="px-4 py-3 border-t flex items-center justify-between"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                                >
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>Run Code</kbd> to execute
                                    </p>
                                    <button
                                        onClick={runCode}
                                        disabled={isRunning}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 text-sm"
                                    >
                                        {isRunning ? (
                                            <><Loader2 size={16} className="animate-spin" /> Running...</>
                                        ) : (
                                            <><Play size={16} /> Run Code</>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Output Panel */}
                            <div className="w-full md:w-[380px] flex flex-col min-h-0"
                                style={{ backgroundColor: 'var(--bg-primary)' }}
                            >
                                <div className="px-4 py-2 border-b flex items-center gap-2"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className={`w-2 h-2 rounded-full ${output ? (output.includes('❌') ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-500'}`}></div>
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                        Console Output
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-5 font-mono text-sm whitespace-pre-wrap"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {isRunning ? (
                                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                                            <Loader2 size={14} className="animate-spin" />
                                            Executing code...
                                        </div>
                                    ) : output ? (
                                        <div>
                                            {output.split('\n').map((line, i) => (
                                                <div key={i} className="py-0.5" style={{
                                                    color: line.includes('❌') ? '#ef4444' : line.includes('✅') ? '#22c55e' : line.includes('⏳') ? '#f59e0b' : line.includes('🏁') ? '#6366f1' : 'var(--text-primary)'
                                                }}>
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center" style={{ color: 'var(--text-muted)' }}>
                                            <Code2 size={32} className="mb-3 opacity-30" />
                                            <p className="text-sm font-medium">No output yet</p>
                                            <p className="text-xs mt-1 opacity-70">Click "Run Code" to see results</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation */}
            <style>{`
                @keyframes practiceSlideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ApiPracticeModal;
