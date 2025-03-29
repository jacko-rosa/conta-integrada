'use client';

import { RegisterValidation } from '@/app/form-validator/register.validator';
import { UserMapper } from '@/mappers/user.mapper';
import { loginUp } from '@/services/autentication/authentication.service';
import { Routes } from '@/utils/routes';
import { Box, Button, Link, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import style from './sign-in.module.css';

const defaultValue = {
    document: '',
    password: '',
}

export default function LoginForm({ children }: { children: JSX.Element }) {
    const router = useRouter();
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(defaultValue);
    const [formValues, setFormValues] = useState<{ [key: string]: string }>(defaultValue);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const dto = UserMapper.formToDto(new FormData(event.currentTarget));
            const token = await loginUp(dto);
            sessionStorage.setItem('userToken', token);
            router.push(Routes.DASBOARD.MAIN.href);
        } catch (error) {
            // TODO show toast error
            console.error('Error during sign-up:', error);
        }
    }

    async function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
        const errors = RegisterValidation.validateFormSignIn(name, value, label, formErrors);
        setFormErrors(errors);

    }

    function disableSubmit(): boolean {
        return Object.keys(formErrors).length > 0 || Object.keys(formValues).length < 2;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className={style.loginForm}>
            {children}

            <TextField
                label="Document (CPF/CNPJ)"
                name="document"
                type="text"
                placeholder="Type your CPF/CNPJ"
                className={style.textField}
                value={formValues['document']}
                onChange={(e) => handleInputChange(e, 'Document (CPF/CNPJ)')}
                error={!!formErrors['document']}
                helperText={formErrors['document']}
            />

            <TextField label="Password"
                name="password"
                type="password"
                placeholder="Type your Password"
                className={style.textField}
                value={formValues['password']}
                onChange={(e) => handleInputChange(e, 'Password')}
                error={!!formErrors['password']}
                helperText={formErrors['password']}
            />

            <Button type="submit" variant="contained" style={{ marginTop: '16px' }} disabled={disableSubmit()}>
                Login
            </Button>
            <Link href={Routes.HOME.REGISTER.href}>
                Do not have an account, so <strong>register</strong>
            </Link>
        </Box>
    );
}