import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); 
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = { username: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const { data: users } = await axios.get('http://localhost:3001/users');
            const user = users.find(
                (u) => u.username === formData.username && u.password === formData.password
            );

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id);
                navigate('/dashboard');
            } else {
                setErrors({
                    username: '',
                    password: 'Invalid credentials',
                });
            }
        } catch (error) {
            console.error(error);
            alert('Error during login');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <Typography textAlign="center" mt={2}>
                Don't have an account?{' '}
                <Link href="/register" underline="hover">
                    Register
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginPage;
