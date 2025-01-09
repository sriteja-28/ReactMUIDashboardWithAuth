import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Tasks from './pages/Tasks';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import RegistrationForm from './components/RegistrationForm';
import UserActivity from './pages/UserActivity';
import TaskManager from './pages/TestSort';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />


                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationForm />} />


                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >

                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="userActivity" element={<UserActivity />} />
                    <Route path="taskManager" element={<TaskManager />} />
                </Route>


                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>

    );
}

export default App;
