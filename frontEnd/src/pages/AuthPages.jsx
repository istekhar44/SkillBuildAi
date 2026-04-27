import React, { useState, useEffect, useCallback, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import loginIllustration from '../assets/login_illustration.png';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011';

// Hook to load Google Identity Services and render the button
const useGoogleSignIn = ({ onSuccess, onError, buttonRef, isDark }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Load Google Identity Services script
    useEffect(() => {
        if (!GOOGLE_CLIENT_ID) return;
        if (document.getElementById('google-gsi-script')) {
            setScriptLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.id = 'google-gsi-script';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => setScriptLoaded(true);
        script.onerror = () => onError?.('Failed to load Google Sign-In');
        document.head.appendChild(script);
    }, [onError]);

    // Initialize Google Sign-In and render button
    useEffect(() => {
        if (!scriptLoaded || !window.google || !GOOGLE_CLIENT_ID || !buttonRef.current) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: onSuccess,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            theme: isDark ? 'filled_black' : 'outline',
            size: 'large',
            width: buttonRef.current.offsetWidth,
            text: 'continue_with',
            shape: 'pill',
        });
    }, [scriptLoaded, onSuccess, isDark, buttonRef]);

    return { scriptLoaded };
};

// Shared left panel component
const AuthLeftPanel = ({ isDark }) => (
    <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{
            background: isDark
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
                : 'var(--bg-primary)',
        }}
    >
        {/* Decorative bubbles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-40"
            style={{ background: isDark ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
        />
        <div className="absolute top-20 right-10 w-8 h-8 rounded-full opacity-30"
            style={{ background: isDark ? '#6366f1' : '#2563eb' }}
        />
        <div className="absolute bottom-32 left-16 w-5 h-5 rounded-full opacity-25"
            style={{ background: isDark ? '#8b5cf6' : '#3b82f6' }}
        />
        <div className="absolute top-12 left-1/3 w-4 h-4 rounded-full opacity-20"
            style={{ background: isDark ? '#a78bfa' : '#60a5fa' }}
        />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25"
            style={{ background: isDark ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
        />
        <div className="absolute top-1/2 -left-6 w-12 h-12 rounded-full opacity-20"
            style={{ background: isDark ? '#6366f1' : '#93c5fd' }}
        />
        <div className="absolute top-[15%] right-[20%] w-6 h-6 rounded-full opacity-25"
            style={{ background: isDark ? '#818cf8' : '#60a5fa' }}
        />
        <div className="absolute bottom-[15%] right-[10%] w-10 h-10 rounded-full opacity-20"
            style={{ background: isDark ? '#a78bfa' : '#93c5fd' }}
        />
        <div className="absolute bottom-[45%] left-[8%] w-3 h-3 rounded-full opacity-30"
            style={{ background: isDark ? '#c4b5fd' : '#3b82f6' }}
        />
        <div className="absolute top-[40%] right-[5%] w-16 h-16 rounded-full opacity-15"
            style={{ background: isDark ? 'linear-gradient(135deg, #6366f1, #a78bfa)' : 'linear-gradient(135deg, #2563eb, #93c5fd)' }}
        />
        {/* Decorative diagonal lines */}
        <div className="absolute top-1/4 right-1/4 w-4 h-0.5 rotate-45 opacity-20" style={{ background: isDark ? '#818cf8' : '#3b82f6' }} />
        <div className="absolute top-1/3 left-1/3 w-6 h-0.5 -rotate-45 opacity-20" style={{ background: isDark ? '#6366f1' : '#2563eb' }} />
        <div className="absolute bottom-1/4 right-1/3 w-5 h-0.5 rotate-12 opacity-15" style={{ background: isDark ? '#a78bfa' : '#60a5fa' }} />

        <div className="relative z-10 flex flex-col items-center px-12 py-16 max-w-lg">
            {/* Large circular background behind illustration */}
            <div className="relative mb-8">
                <div className="absolute inset-0 w-80 h-80 rounded-full -translate-x-4 -translate-y-4"
                    style={{
                        background: isDark
                            ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)'
                    }}
                />
                <img
                    src={loginIllustration}
                    alt="SkillBridge AI Illustration"
                    className="relative z-10 w-72 h-72 object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
                />
            </div>

            <h2 className="text-3xl font-bold mb-3 text-center"
                style={{ color: isDark ? '#e0e7ff' : '#1e3a5f' }}
            >
                Turn your ideas into reality.
            </h2>
            <p className="text-center text-sm leading-relaxed"
                style={{ color: isDark ? '#a5b4fc' : '#4a6fa5' }}
            >
                Start for free and get attractive offers from the community
            </p>
        </div>
    </div>
);

export const LoginPage = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { isDark } = useTheme();
    const googleBtnRef = useRef(null);

    // Google Sign-In callback
    const handleGoogleSuccess = useCallback(async (response) => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/user/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    credential: response.credential,
                    role: loginForm.role,
                }),
            });
            const data = await res.json();

            if (data.success) {
                login(data.user);
                if (data.user.role === 'recruiter') {
                    navigate('/recruiter');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Google login failed');
            }
        } catch (err) {
            setError('Google login failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [loginForm.role, login, navigate]);

    const handleGoogleError = useCallback((msg) => {
        setError(msg || 'Google Sign-In failed to load');
    }, []);

    useGoogleSignIn({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        buttonRef: googleBtnRef,
        isDark,
    });

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(loginForm)
            });
            const data = await res.json();

            if (data.success) {
                login(data.user);
                if (data.user.role === 'recruiter') {
                    navigate('/recruiter');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Theme-aware colors
    const bg = isDark ? 'var(--bg-primary)' : 'var(--bg-primary)';
    const cardBg = isDark ? 'var(--bg-card)' : '#fff';
    const inputBg = isDark ? 'var(--bg-input)' : '#f8fafc';
    const inputBorder = isDark ? 'var(--border-color)' : '#dbe5f1';
    const textMain = isDark ? 'var(--text-primary)' : 'var(--text-primary)';
    const textSub = isDark ? 'var(--text-secondary)' : 'var(--text-muted)';
    const textLabel = isDark ? 'var(--text-secondary)' : 'var(--text-secondary)';
    const textInput = isDark ? 'var(--text-primary)' : 'var(--text-primary)';
    const accent = isDark ? '#818cf8' : '#2563eb';
    const accentGradient = isDark
        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
        : 'linear-gradient(135deg, #2563eb, #4f46e5)';
    const dividerColor = isDark ? 'var(--border-color)' : '#e2e8f0';
    const logoBg = isDark ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'linear-gradient(135deg, #2563eb, #4f46e5)';

    return (
        <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: bg }}>
            <NavBar />
            <div className="flex flex-1">
                {/* Left Panel - Illustration */}
                <AuthLeftPanel isDark={isDark} />

                {/* Right Panel - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative overflow-hidden"
                    style={{ backgroundColor: bg }}
                >
                    {/* Right panel bubbles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#6366f1' : '#93c5fd' }}
                    />
                    <div className="absolute bottom-16 -left-8 w-24 h-24 rounded-full opacity-15 pointer-events-none"
                        style={{ background: isDark ? '#8b5cf6' : '#60a5fa' }}
                    />
                    <div className="absolute top-[30%] right-[5%] w-6 h-6 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#a78bfa' : '#3b82f6' }}
                    />
                    <div className="absolute bottom-[20%] right-[15%] w-4 h-4 rounded-full opacity-25 pointer-events-none"
                        style={{ background: isDark ? '#818cf8' : '#93c5fd' }}
                    />
                    <div className="absolute top-[60%] left-[8%] w-3 h-3 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#c4b5fd' : '#60a5fa' }}
                    />
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: logoBg }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L12 8M12 16L12 22M2 12L8 12M16 12L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="12" cy="12" r="3" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: textMain }}>
                            Login to your Account
                        </h1>
                        <p className="text-center mb-8 text-sm" style={{ color: textSub }}>
                            See what is going on with your career
                        </p>

                        {error && (
                            <div className="border p-3 rounded-lg mb-5 text-sm text-center"
                                style={{
                                    backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2',
                                    borderColor: isDark ? 'rgba(239,68,68,0.2)' : '#fecaca',
                                    color: isDark ? '#fca5a5' : '#dc2626'
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Google Sign In - rendered by Google Identity Services */}
                        <div ref={googleBtnRef} className="w-full mb-6 flex justify-center" style={{ minHeight: '44px' }}>
                            {!GOOGLE_CLIENT_ID && (
                                <div className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium opacity-50 cursor-not-allowed"
                                    style={{ borderColor: inputBorder, color: textLabel, backgroundColor: cardBg }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                                    </svg>
                                    Google Client ID not set
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                            <span className="text-xs" style={{ color: textSub }}>or Sign in with Email</span>
                            <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Email</label>
                            <input
                                type="email"
                                placeholder="mail@abc.com"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="flex gap-6 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="student" checked={loginForm.role === 'student'} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })} className="w-4 h-4 accent-indigo-500" />
                                <span className="text-sm" style={{ color: textLabel }}>Student</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="recruiter" checked={loginForm.role === 'recruiter'} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })} className="w-4 h-4 accent-indigo-500" />
                                <span className="text-sm" style={{ color: textLabel }}>Recruiter</span>
                            </label>
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-4 h-4 rounded accent-indigo-500"
                                />
                                <span className="text-xs" style={{ color: textSub }}>Remember Me</span>
                            </label>
                            <button className="text-xs font-semibold hover:underline" style={{ color: accent }}>
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 mb-6"
                            style={{ background: accentGradient }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Register link */}
                        <p className="text-center text-sm" style={{ color: textSub }}>
                            Not Registered Yet?{' '}
                            <span
                                onClick={() => navigate('/register')}
                                className="font-bold cursor-pointer hover:underline"
                                style={{ color: accent }}
                            >
                                Create an account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'student',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isDark } = useTheme();
    const { login } = useAuth();
    const googleBtnRef = useRef(null);

    const handleInputChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    // Google Sign-Up callback
    const handleGoogleSuccess = useCallback(async (response) => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/user/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    credential: response.credential,
                    role: registerForm.role,
                }),
            });
            const data = await res.json();

            if (data.success) {
                login(data.user);
                if (data.user.role === 'recruiter') {
                    navigate('/recruiter');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Google sign-up failed');
            }
        } catch (err) {
            setError('Google sign-up failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [registerForm.role, login, navigate]);

    const handleGoogleError = useCallback((msg) => {
        setError(msg || 'Google Sign-In failed to load');
    }, []);

    useGoogleSignIn({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        buttonRef: googleBtnRef,
        isDark,
    });

    const handleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('fullname', registerForm.fullname);
            formData.append('email', registerForm.email);
            formData.append('password', registerForm.password);
            formData.append('phoneNumber', registerForm.phoneNumber);
            formData.append('role', registerForm.role);

            const res = await fetch(`${API_URL}/api/user/register`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                alert('Registration Successful! Please login.');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Theme-aware colors
    const bg = isDark ? 'var(--bg-primary)' : 'var(--bg-primary)';
    const cardBg = isDark ? 'var(--bg-card)' : '#fff';
    const inputBg = isDark ? 'var(--bg-input)' : '#f8fafc';
    const inputBorder = isDark ? 'var(--border-color)' : '#dbe5f1';
    const textMain = isDark ? 'var(--text-primary)' : 'var(--text-primary)';
    const textSub = isDark ? 'var(--text-secondary)' : 'var(--text-muted)';
    const textLabel = isDark ? 'var(--text-secondary)' : 'var(--text-secondary)';
    const textInput = isDark ? 'var(--text-primary)' : 'var(--text-primary)';
    const accent = isDark ? '#818cf8' : '#2563eb';
    const accentGradient = isDark
        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
        : 'linear-gradient(135deg, #2563eb, #4f46e5)';
    const dividerColor = isDark ? 'var(--border-color)' : '#e2e8f0';
    const logoBg = isDark ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'linear-gradient(135deg, #2563eb, #4f46e5)';

    return (
        <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: bg }}>
            <NavBar />
            <div className="flex flex-1">
                {/* Left Panel - Illustration */}
                <AuthLeftPanel isDark={isDark} />

                {/* Right Panel - Register Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative overflow-hidden"
                    style={{ backgroundColor: bg }}
                >
                    {/* Right panel bubbles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#6366f1' : '#93c5fd' }}
                    />
                    <div className="absolute bottom-16 -left-8 w-24 h-24 rounded-full opacity-15 pointer-events-none"
                        style={{ background: isDark ? '#8b5cf6' : '#60a5fa' }}
                    />
                    <div className="absolute top-[30%] right-[5%] w-6 h-6 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#a78bfa' : '#3b82f6' }}
                    />
                    <div className="absolute bottom-[20%] right-[15%] w-4 h-4 rounded-full opacity-25 pointer-events-none"
                        style={{ background: isDark ? '#818cf8' : '#93c5fd' }}
                    />
                    <div className="absolute top-[60%] left-[8%] w-3 h-3 rounded-full opacity-20 pointer-events-none"
                        style={{ background: isDark ? '#c4b5fd' : '#60a5fa' }}
                    />
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: logoBg }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L12 8M12 16L12 22M2 12L8 12M16 12L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="12" cy="12" r="3" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: textMain }}>
                            Create your Account
                        </h1>
                        <p className="text-center mb-6 text-sm" style={{ color: textSub }}>
                            Join SkillBridge AI and start building your career
                        </p>

                        {error && (
                            <div className="border p-3 rounded-lg mb-4 text-sm text-center"
                                style={{
                                    backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2',
                                    borderColor: isDark ? 'rgba(239,68,68,0.2)' : '#fecaca',
                                    color: isDark ? '#fca5a5' : '#dc2626'
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Google Sign Up - rendered by Google Identity Services */}
                        <div ref={googleBtnRef} className="w-full mb-5 flex justify-center" style={{ minHeight: '44px' }}>
                            {!GOOGLE_CLIENT_ID && (
                                <div className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium opacity-50 cursor-not-allowed"
                                    style={{ borderColor: inputBorder, color: textLabel, backgroundColor: cardBg }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                                    </svg>
                                    Google Client ID not set
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                            <span className="text-xs" style={{ color: textSub }}>or Sign up with Email</span>
                            <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                        </div>

                        {/* Fullname */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="John Doe"
                                value={registerForm.fullname}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="mail@abc.com"
                                value={registerForm.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={registerForm.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1.5" style={{ color: textLabel }}>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="+91 XXXXX XXXXX"
                                value={registerForm.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                style={{ borderColor: inputBorder, color: textInput, backgroundColor: inputBg }}
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="flex gap-6 mb-5">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="student" checked={registerForm.role === 'student'} onChange={handleInputChange} className="w-4 h-4 accent-indigo-500" />
                                <span className="text-sm" style={{ color: textLabel }}>Student</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="recruiter" checked={registerForm.role === 'recruiter'} onChange={handleInputChange} className="w-4 h-4 accent-indigo-500" />
                                <span className="text-sm" style={{ color: textLabel }}>Recruiter</span>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 mb-5"
                            style={{ background: accentGradient }}
                        >
                            {loading ? 'Registering...' : 'Create Account'}
                        </button>

                        {/* Login link */}
                        <p className="text-center text-sm" style={{ color: textSub }}>
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                className="font-bold cursor-pointer hover:underline"
                                style={{ color: accent }}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export const AboutPage = () => (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <NavBar />
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4">About Job Finder</h1>
                <p className="text-lg text-gray-400">Your trusted partner in finding the perfect career opportunity.</p>
            </div>
            {/* Simplified About content based on previous App.jsx */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed">At Job Finder, our mission is to connect talented individuals...</p>
            </div>
        </div>
        <Footer />
    </div>
);
