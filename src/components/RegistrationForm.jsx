import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Link, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/users');
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);
    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            surname: '',
            dateOfBirth: '',
            gender: '',
            contact: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required')
                .matches(/^[A-Za-z0-9_]+$/, 'Only letters, numbers, and underscores are allowed')
                .test(
                    'is-unique',
                    'Username already exists',
                    (value) => !users.some((user) => user.username === value)
                ),
            firstName: Yup.string()
                .required('First name is required')
                .matches(/^[A-Za-z]+$/, 'Only letters are allowed'),
            surname: Yup.string()
                .required('Surname is required')
                .matches(/^[A-Za-z]+$/, 'Only letters are allowed'),
            dateOfBirth: Yup.date()
                .required('Date of birth is required')
                .max(new Date(), 'Date of birth cannot be in the future'),
            gender: Yup.string().required('Gender is required'),
            contact: Yup.string()
                .required('Contact is required')
                .matches(
                    /^(?:\d{10}|\w+@\w+\.\w{2,3})$/,
                    'Enter a valid mobile number or email address'
                ),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .matches(
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    'Password must include at least one uppercase letter and one special character'
                ),
            confirmPassword: Yup.string()
                .required('Please re-type your password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            try {
                const userExists = users.some((user) => user.contact === values.contact);
                if (userExists) {
                    formik.setFieldError('contact', 'User with this contact already exists');
                    return;
                }
                const newId = users.length > 0 ? Math.max(...users.map((user) => Number(user.id))) + 1 : 1;
                const newUser = { id: String(newId), ...values };
                delete newUser.confirmPassword;
                await axios.post('http://localhost:3001/users', newUser);
                alert('Registration successful!');
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');
            } catch (error) {
                console.error(error);
                alert('Error during registration');
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Create a new account
                </Typography>
                <Typography variant="body1" gutterBottom>
                    It's quick and easy.
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Re-type Password"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Surname"
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                />
                    <TextField
                    fullWidth
                    margin="normal"
                    label="Mobile Number or Email Address"
                    name="contact"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                    helperText={formik.touched.contact && formik.errors.contact}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    select
                    label="Gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <Button fullWidth variant="contained" color="primary" type="submit">
                    Register
                </Button>
            </form>
            <Typography textAlign="center" mt={2}>
                Already have an account?{' '}
                <Link href="/login" underline="hover">
                    Login
                </Link>
            </Typography>
        </Box>
    );
};

export default RegistrationForm;
