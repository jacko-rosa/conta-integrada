'use client';

import { Routes } from '@/utils/routes';
import { Box, Button, Link, TextField } from '@mui/material';
import { JSX } from 'react';
import style from './sign-in.module.css';

interface LoginFormProps {
    children: JSX.Element;
    formValues: { [key: string]: string };
    formErrors: { [key: string]: string };
    apiError: string | null;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) => void;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    disableLogin: () => boolean;
}

export function LoginForm({
    children,
    formValues,
    formErrors,
    apiError,
    handleInputChange,
    handleLogin,
    disableLogin,
}: LoginFormProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleLogin(event);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} method='POST' className={style.loginForm}>
            {children}

            {apiError && <p style={{ color: 'red', margin: '1vh' }}>{apiError}</p>}

            <TextField label="Document (CPF/CNPJ)"
                name="document"
                type="text"
                className={style.textField}
                value={formValues['document']}
                onChange={(e) => handleInputChange(e, 'Document (CPF/CNPJ)')}
                error={!!formErrors['document']}
                helperText={formErrors['document']}
            />

            <TextField label="Password"
                name="password"
                type="password"
                className={style.textField}
                value={formValues['password']}
                onChange={(e) => handleInputChange(e, 'Password')}
                error={!!formErrors['password']}
                helperText={formErrors['password']}
            />

            <Button type="submit" variant="contained" style={{ marginTop: '2vh' }} disabled={disableLogin()}>
                Login
            </Button>

            <Link href={Routes.HOME.REGISTER.href}>
                Do not have an account, so <strong>register</strong>
            </Link>
        </Box>
    );
}