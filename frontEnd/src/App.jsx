import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CompaniesPage from './pages/CompaniesPage';
import { LoginPage, RegisterPage, AboutPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import ResumeBuilder from './pages/ResumeBuilder';
import LearningPage from './pages/LearningPage';
import ChallengePage from './pages/ChallengePage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJob from './pages/PostJob';
import CandidatePipeline from './pages/CandidatePipeline';
import MockTestPage from './pages/MockTestPage';
import CodingChallengePage from './pages/CodingChallengePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />   
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/challenge" element={<ChallengePage />} />
      <Route path="/challenge/:day" element={<CodingChallengePage />} />
      <Route path="/recruiter" element={<RecruiterDashboard />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/pipeline" element={<CandidatePipeline />} />
      <Route path="/mock-test/:companySlug" element={<MockTestPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Fallback route or others can be added here */}
    </Routes>
  );
};

export default App;