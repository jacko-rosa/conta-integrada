'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

export function HeaderComponent() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    function defineIcon() {
        if (isDarkMode) {
            return (
                <SunIcon className={`${styles.dark_theme} ${styles.themeToggle}`} onClick={toggleTheme} title="Alternar para tema claro" />
            )
        } else {
            return (
                <MoonIcon className={`${styles.light_theme} ${styles.themeToggle}`} onClick={toggleTheme} title="Alternar para tema escuro" />
            )
        }
    }

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('dark-theme');
        setIsDarkMode(!isDarkMode);
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Conta Integrada</h1>
            {defineIcon()}
        </header>
    );
}