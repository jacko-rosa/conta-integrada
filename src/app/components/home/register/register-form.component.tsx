'use client';

import { Routes } from '@/utils/routes';
import { Box, Button, Link, TextField } from '@mui/material';
import { JSX } from 'react';
import style from './register-form.module.css';

interface RegisterFormProps {
    children: JSX.Element;
    formValues: { [key: string]: string };
    formErrors: { [key: string]: string };
    apiError: string | null;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) => void;
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
    disableRegister: () => boolean;
}

export function RegisterForm({
    children,
    formValues,
    formErrors,
    apiError,
    handleInputChange,
    handleRegister,
    disableRegister,
}: RegisterFormProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleRegister(event);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} method='POST' className={style.registerForm}>
            {children}

            {apiError && <p style={{ color: 'red', margin: '1vh' }}>{apiError}</p>}

            <TextField label="Name"
                name="name"
                type="text"
                className={style.textField}
                value={formValues['name']}
                onChange={(e) => handleInputChange(e, 'Name')}
                error={!!formErrors['name']}
                helperText={formErrors['name']}
            />

            <TextField label="Last Name"
                name="lastName"
                type="text"
                className={style.textField}
                value={formValues['lastName']}
                onChange={(e) => handleInputChange(e, 'Last Name')}
                error={!!formErrors['lastName']}
                helperText={formErrors['lastName']}
            />

            <TextField
                label="Document (CPF/CNPJ)"
                name="document"
                type="text"
                className={style.textField}
                value={formValues['document']}
                onChange={(e) => handleInputChange(e, 'Document (CPF/CNPJ)')}
                error={!!formErrors['document']}
                helperText={formErrors['document']}
            />

            <TextField label="Email"
                name="email"
                type="text"
                className={style.textField}
                value={formValues['email']}
                onChange={(e) => handleInputChange(e, 'Email')}
                error={!!formErrors['email']}
                helperText={formErrors['email']}
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

            <Button type="submit" variant="contained" style={{ marginTop: '2vh' }} disabled={disableRegister()}>
                Register
            </Button>
            <Link href={Routes.HOME.LOGIN.href}>
                Has an account, so <strong>login</strong>
            </Link>
        </Box>
    );
}