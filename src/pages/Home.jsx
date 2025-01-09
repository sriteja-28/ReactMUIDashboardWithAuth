import React, { useState, useEffect } from 'react';
import { Skeleton, Box, Typography } from '@mui/material';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call or delay
        setTimeout(() => setLoading(false), 2000); // 2 seconds delay for loading
    }, []);

    return (
        <Box>
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
                <Typography variant="h4">Welcome to the Home Page</Typography>
            )}
        </Box>
    );
};

export default Home;
