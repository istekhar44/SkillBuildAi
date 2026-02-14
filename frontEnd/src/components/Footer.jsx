import React from 'react';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1a1a2e] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-2xl font-bold">Masterjobs</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Connecting talented individuals with the best career opportunities globally. Your dream job is just a search away.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook size={18} />} />
                            <SocialIcon icon={<Twitter size={18} />} />
                            <SocialIcon icon={<Linkedin size={18} />} />
                            <SocialIcon icon={<Instagram size={18} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">Find Jobs</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-6 text-gray-400">
                            <li className="flex items-start gap-4">
                                <MapPin className="mt-1 text-brand-yellow" size={20} />
                                <span>123 Innovation Drive,<br />Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-brand-yellow" size={20} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-brand-yellow" size={20} />
                                <span>support@masterjobs.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-6">Subscribe to get the latest job updates and career advice.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                            />
                            <button className="absolute right-2 top-2 bg-brand-purple p-2 rounded-md hover:bg-brand-yellow hover:text-gray-900 transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
                    <p>&copy; 2026 Masterjobs. All rights reserved.</p>
                    <p>Designed with ❤️ for Job Seekers</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">
        {icon}
    </a>
);

export default Footer;
