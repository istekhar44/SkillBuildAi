import React from 'react';
import { useNavigate } from 'react-router-dom';

// This page redirects to the Recruiter Dashboard where the pipeline is now embedded.
const CandidatePipeline = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/recruiter', { replace: true });
    }, [navigate]);

    return null;
};

export default CandidatePipeline;
