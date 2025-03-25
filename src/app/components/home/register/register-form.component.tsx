'use client';

import { signUp } from '@/services/autentication/authentication.service';
import { Routes } from '@/utils/routes';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import style from './register-form.module.css';

export const SignUpFormArguments = [
    { label: 'Name', name: 'name', type: 'text', placeHolder: 'Type your Name' },
    { label: 'Last Name', name: 'lastName', type: 'text', placeHolder: 'Type your Last Name' },
    { label: 'Document (CPF/CNPJ)', name: 'document', type: 'text', placeHolder: 'Type your CPF or CNPJ' },
    { label: 'Email', name: 'email', type: 'email', placeHolder: 'Type your Email' },
    { label: 'Password', name: 'password', type: 'password', placeHolder: 'Type your Password', hide: true },
    { label: 'Confirm Password', name: 'password2', type: 'password', placeHolder: 'Retype your Password', hide: true },
];

export default function RegisterForm({ children }: { children: JSX.Element }) {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await signUp(formData);
            console.log('Sign-up response:', response);
            router.push(Routes.DASBOARD.MAIN.href);
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className={style.registerForm} >
            {children}
            {inputsFromArguments()}
            <Button type="submit" variant="contained" style={{ marginTop: '16px' }}>
                Register
            </Button>
        </Box>
    );
}

function inputsFromArguments() {
    return SignUpFormArguments.map((field, index) => {
        return (
            <TextField
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                className={style.textField}
            />
        );
    });
}