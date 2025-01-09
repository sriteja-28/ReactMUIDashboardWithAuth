import React, { useState, useEffect } from 'react';
import { Skeleton, Box, Typography } from '@mui/material';

const ErrorPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <Box>
            {loading ? (
                <Skeleton variant="text" width="80%" />
            ) : (
                <>
                    <Box textAlign={'center'}>
                        <Typography variant="h3"  color="error">
                            404 - Page Not Found
                        </Typography>
                        <Typography variant="body" color="primary">
                            Oops! The page you are looking for does not exist.
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ErrorPage;
