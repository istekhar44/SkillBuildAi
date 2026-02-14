import React, { createContext, useContext, useState } from 'react';

const ViewModeContext = createContext();

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
};

export const ViewModeProvider = ({ children }) => {
    // 'recruiter' or 'student'
    const [viewMode, setViewMode] = useState('recruiter');

    const toggleViewMode = () => {
        setViewMode(prev => prev === 'recruiter' ? 'student' : 'recruiter');
    };

    const value = {
        viewMode,
        setViewMode,
        toggleViewMode,
        isRecruiterView: viewMode === 'recruiter',
        isStudentView: viewMode === 'student'
    };

    return (
        <ViewModeContext.Provider value={value}>
            {children}
        </ViewModeContext.Provider>
    );
};
