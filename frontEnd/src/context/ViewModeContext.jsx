import React, { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export const ViewModeProvider = ({ children }) => {
    const [isRecruiterView, setIsRecruiterView] = useState(() => {
        const savedMode = localStorage.getItem('isRecruiterView');
        return savedMode === 'true';
    });

    const toggleViewMode = () => {
        setIsRecruiterView(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem('isRecruiterView', isRecruiterView);
    }, [isRecruiterView]);

    return (
        <ViewModeContext.Provider value={{ isRecruiterView, toggleViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
};
