import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        // Set a small delay to simulate loading
        setTimeout(() => setIsLoading(false), 1000);

        // Record the login time if not already recorded
        if (isLoggedIn && !localStorage.getItem('loginTime')) {
            const loginTime = new Date().toISOString();
            localStorage.setItem('loginTime', loginTime);
        }
    }, [isLoggedIn]);

    // Function to record logout time and save log entry
    const recordLogoutTime = async () => {
        const loginTime = localStorage.getItem('loginTime');
        const logoutTime = new Date().toISOString();

        // Ensure userId and loginTime exist before making the log entry
        if (loginTime && userId) {
            const logEntry = {
                userId,      // Log the userId from localStorage
                loginTime,
                logoutTime,
            };

            try {
                // Make a POST request to the JSON server to save the log
                await axios.post('http://localhost:3001/logs', logEntry);
                console.log('Log saved successfully:', logEntry);
            } catch (error) {
                console.error('Error saving log:', error);
            }

            // Clean up localStorage after logging out
            localStorage.removeItem('loginTime');
        }
    };

    // Attach the logout handler to the `beforeunload` event
    useEffect(() => {
        window.addEventListener('beforeunload', recordLogoutTime);

        return () => {
            window.removeEventListener('beforeunload', recordLogoutTime);
        };
    }, [recordLogoutTime]);

    // Show a loading spinner while determining access
    if (isLoading) {
        return <CircularProgress />;
    }

    // Render the children if logged in, otherwise redirect to login
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
