import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
    const [mode, setMode] = useState('system');

    const theme = useMemo(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const appliedMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode;

        return createTheme({
            palette: {
                mode: appliedMode,
            },
        });
    }, [mode]);

    const toggleMode = (newMode) => {
        setMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProviderWrapper;
