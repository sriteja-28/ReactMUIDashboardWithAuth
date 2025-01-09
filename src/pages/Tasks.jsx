import React, { useState, useEffect } from 'react';
import { Table, Box, TableBody, Skeleton, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    const handleNavigateToDashboard = () => {
        navigate('/dashboard'); 
    };

    return (
        <Box>
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height={500} />
            ) : (
                <div>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Button to navigate to the dashboard */}
                    <Button variant="contained" color="primary" onClick={handleNavigateToDashboard}>
                        Go to Dashboard
                    </Button>
                </div>
            )}
        </Box>

    );
};

export default Tasks;
