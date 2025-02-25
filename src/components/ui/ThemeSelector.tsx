import React, { useState, useEffect } from 'react';
import { Button } from './Button';

const ThemeSelector: React.FC = () => {
    const defaultTheme = 'light';
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            setTheme(theme || defaultTheme);
        } else {
            setTheme(defaultTheme);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Button onClick={toggleTheme}>
            {theme}
        </Button>
    );
};

export default ThemeSelector;