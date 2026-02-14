import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
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

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />
            <div className="max-w-md mx-auto px-6 py-12">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">Login</h1>

                    {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Email</label>
                        <input type="email" placeholder="johndoe@gmail.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Password</label>
                        <input type="password" placeholder="********" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="flex gap-6 mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" value="student" checked={loginForm.role === 'student'} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })} className="w-4 h-4 accent-indigo-500" />
                            <span className="text-gray-300">Student</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" value="recruiter" checked={loginForm.role === 'recruiter'} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })} className="w-4 h-4 accent-indigo-500" />
                            <span className="text-gray-300">Recruiter</span>
                        </label>
                    </div>
                    <button onClick={handleLogin} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 mb-4 disabled:opacity-50">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="text-center mb-4">
                        <p className="text-gray-600">Create new Account</p>
                    </div>
                    <button onClick={() => navigate('/register')} className="w-full bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10">Register</button>
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
        pancard: '',
        adharcard: '',
        phoneNumber: '',
        role: 'student',
        file: null
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setRegisterForm({ ...registerForm, file: e.target.files[0] });
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('fullname', registerForm.fullname);
            formData.append('email', registerForm.email);
            formData.append('password', registerForm.password);
            formData.append('pancard', registerForm.pancard);
            formData.append('adharcard', registerForm.adharcard);
            formData.append('phoneNumber', registerForm.phoneNumber);
            formData.append('role', registerForm.role);
            if (registerForm.file) {
                formData.append('file', registerForm.file);
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
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

    return (
        <div className="min-h-screen bg-premium-black font-sans text-white">
            <NavBar />
            <div className="max-w-md mx-auto px-6 py-12">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">Register</h1>

                    {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-gray-300 font-medium mb-1 text-sm">Fullname</label>
                            <input type="text" name="fullname" value={registerForm.fullname} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-medium mb-1 text-sm">Email</label>
                            <input type="email" name="email" value={registerForm.email} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-medium mb-1 text-sm">Password</label>
                            <input type="password" name="password" value={registerForm.password} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="********" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 font-medium mb-1 text-sm">Phone Number</label>
                                <input type="text" name="phoneNumber" value={registerForm.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="+91..." />
                            </div>
                            <div>
                                <label className="block text-gray-300 font-medium mb-1 text-sm">Profile Photo</label>
                                <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 font-medium mb-1 text-sm">PAN Card</label>
                                <input type="text" name="pancard" value={registerForm.pancard} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="ABCDE1234F" />
                            </div>
                            <div>
                                <label className="block text-gray-300 font-medium mb-1 text-sm">Aadhar Card</label>
                                <input type="text" name="adharcard" value={registerForm.adharcard} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="1234 5678 9012" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" value="student" checked={registerForm.role === 'student'} onChange={handleInputChange} className="w-4 h-4 accent-indigo-500" />
                            <span className="text-gray-300">Student</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" value="recruiter" checked={registerForm.role === 'recruiter'} onChange={handleInputChange} className="w-4 h-4 accent-indigo-500" />
                            <span className="text-gray-300">Recruiter</span>
                        </label>
                    </div>

                    <button onClick={handleRegister} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 mb-4 disabled:opacity-50">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <div className="text-center">
                        <span className="text-gray-400 text-sm">Already have an account? </span>
                        <span onClick={() => navigate('/login')} className="text-indigo-400 cursor-pointer hover:underline text-sm font-bold">Login</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export const AboutPage = () => (
    <div className="min-h-screen bg-premium-black font-sans text-white">
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
