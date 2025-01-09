import React, { useState, useEffect } from 'react';
import { Skeleton, Box, Typography } from '@mui/material';

const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call or delay
        setTimeout(() => setLoading(false), 2000); // 2 seconds delay for loading
    }, []);

    return (
        <Box>
            {loading ? (
                <Skeleton variant="text" width="60%" />
            ) : (
                <Typography variant="h5">This is the About Page</Typography>
            )}
        </Box>
    );
};

export default About;
