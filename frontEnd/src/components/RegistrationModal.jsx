import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const RegistrationModal = ({ isOpen, onClose, context }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'student',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('fullname', form.fullname);
            formData.append('email', form.email);
            formData.append('password', form.password);
            formData.append('phoneNumber', form.phoneNumber);
            formData.append('role', form.role);

            const res = await fetch(`${API}/api/user/register`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    navigate('/login');
                }, 1500);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative theme-card rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide animate-fade-in-up">
                {/* Header */}
                <div className="sticky top-0 theme-bg-nav backdrop-blur-md z-10 flex items-center justify-between p-6 pb-4 border-b theme-border-light">
                    <div>
                        <h2 className="text-2xl font-bold theme-text">Register Now</h2>
                        {context && (
                            <p className="text-indigo-400 text-sm mt-1">
                                Applying for: <span className="font-semibold">{context}</span>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full theme-bg-secondary flex items-center justify-center theme-text-muted hover:text-indigo-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl text-sm text-center">
                            🎉 Registration Successful! Redirecting to login...
                        </div>
                    )}

                    {/* Fullname */}
                    <div>
                        <label className="block theme-text-secondary font-medium mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={form.fullname}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 theme-bg-input border theme-border-light rounded-xl theme-text placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block theme-text-secondary font-medium mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 theme-bg-input border theme-border-light rounded-xl theme-text placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block theme-text-secondary font-medium mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 theme-bg-input border theme-border-light rounded-xl theme-text placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block theme-text-secondary font-medium mb-1 text-sm">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 theme-bg-input border theme-border-light rounded-xl theme-text placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>



                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Registering...' : success ? '✓ Registered!' : 'Register'}
                    </button>

                    <p className="text-center theme-text-muted text-sm">
                        Already have an account?{' '}
                        <span
                            onClick={() => { onClose(); navigate('/login'); }}
                            className="text-indigo-500 cursor-pointer hover:underline font-bold"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
