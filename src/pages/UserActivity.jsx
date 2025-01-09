import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Skeleton, Box, Typography, Paper } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserActivity = () => {
    const [loading, setLoading] = useState(true);
    const [weeklyLogs, setWeeklyLogs] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    const fullWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().toLocaleString('en-us', { weekday: 'long' });

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/logs?userId=${userId}`);
                const logs = response.data;

                const weekData = fullWeek.reduce((acc, day) => {
                    acc[day] = 0; // Initialize all days to 0
                    return acc;
                }, {});

                logs.forEach((log) => {
                    const login = new Date(log.loginTime);
                    const logout = new Date(log.logoutTime);
                    const duration = (logout - login) / (1000 * 60 * 60);

                    const dayName = login.toLocaleString('en-us', { weekday: 'long' });
                    if (weekData[dayName] !== undefined) {
                        weekData[dayName] += duration;
                    }
                });

                const formattedWeeklyLogs = fullWeek.map((day) => ({
                    day: day === today ? 'Today' : day,
                    duration: weekData[day],
                }));

                setWeeklyLogs(formattedWeeklyLogs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        if (userId) fetchLogs();
    }, [userId]);

    // Calculate the average daily use
    const totalDuration = weeklyLogs.reduce((sum, log) => sum + log.duration, 0);
    const avgDailyUseInMinutes = (totalDuration / fullWeek.length) * 60;

    // Format time as hours and minutes
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.round(minutes % 60);
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
        }
        return `${remainingMinutes} min`;
    };

    const chartData = {
        labels: weeklyLogs.map((log) => log.day),
        datasets: [
            {
                label: 'Time Spent (hours)',
                data: weeklyLogs.map((log) => log.duration),
                backgroundColor: weeklyLogs.map((log) =>
                    log.day === 'Today' ? 'rgba(75, 192, 192, 0.8)' : 'rgba(153, 102, 255, 0.6)'
                ),
                borderColor: weeklyLogs.map((log) =>
                    log.day === 'Today' ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)'
                ),
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
            }}
        >
            {loading ? (
                <Skeleton variant="rectangular" width="80%" height={400} />
            ) : (
                <Paper
                    elevation={3}
                    sx={{
                        padding: '16px',
                        borderRadius: '8px',
                        maxWidth: '600px', // Reduced width
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ marginBottom: '20px', fontWeight: 600 }}
                    >
                        Weekly Spend Analysis
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ marginBottom: '30px', color: '#00796b' }}
                    >
                        Average Daily Use: {formatTime(avgDailyUseInMinutes)}
                    </Typography>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const duration = context.raw;
                                            return `Time Spent: ${duration.toFixed(2)} hours`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Days of the Week',
                                        font: { size: 14, weight: 'bold' },
                                    },
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                                y: {
                                    ticks: {
                                        display: false, // Hide vertical ticks
                                    },
                                    grid: {
                                        drawTicks: false, // Hide gridlines
                                    },
                                    title: {
                                        display: false,
                                    },
                                },
                            },
                        }}
                    />
                </Paper>
            )}
        </Box>
    );
};

export default UserActivity;
