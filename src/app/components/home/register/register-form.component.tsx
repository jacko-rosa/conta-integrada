'use client';

import { UserMapper } from '@/mappers/user.mapper';
import { signUp } from '@/services/autentication/authentication.service';
import { Routes } from '@/utils/routes';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import style from './register-form.module.css';

export default function RegisterForm({ children }: { children: JSX.Element }) {
    const router = useRouter();
    const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const dto = UserMapper.formToDto(new FormData(event.currentTarget));
            const response = await signUp(dto);
            console.log('Sign-up response:', response); // TODO set on cookies/storage
            router.push(Routes.DASBOARD.MAIN.href);
        } catch (error) {
            // TODO show toast error
            console.error('Error during sign-up:', error);
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string): void {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        validateForm(name, value, label);
    }

    function validateForm(name: string, value: string, label: string): void {
        const errors: { [key: string]: string } = { ...formErrors };
        if (!value) {
            errors[name] = `${label} is required`;
        } else {
            delete errors[name];
        }
        setFormErrors(errors);
    }

    function disableSubmit(): boolean {
        return Object.keys(formErrors).length > 0 || Object.keys(formValues).length < 6
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className={style.registerForm}>
            {children}

            <TextField label="Name"
                name="name"
                type="text"
                placeholder="Type your Name"
                className={style.textField}
                value={formValues['name']}
                onChange={(e) => handleInputChange(e, 'Name')}
                error={!!formErrors['name']}
                helperText={formErrors['name']}
            />

            <TextField label="Last Name"
                name="lastName"
                type="text"
                placeholder="Type your Last Name"
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
                placeholder="Type your CPF/CNPJ"
                className={style.textField}
                value={formValues['document']}
                onChange={(e) => handleInputChange(e, 'Document (CPF/CNPJ)')}
                error={!!formErrors['document']}
                helperText={formErrors['document']}
            />

            <TextField label="Email"
                name="email"
                type="text"
                placeholder="Type your Email"
                className={style.textField}
                value={formValues['email']}
                onChange={(e) => handleInputChange(e, 'Email')}
                error={!!formErrors['email']}
                helperText={formErrors['email']}
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

            <TextField label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Retype your Password"
                className={style.textField}
                value={formValues['confirmPassword']}
                onChange={(e) => handleInputChange(e, 'Confirm Password')}
                error={!!formErrors['confirmPassword']}
                helperText={formErrors['confirmPassword']}
            />

            <Button type="submit" variant="contained" style={{ marginTop: '16px' }} disabled={disableSubmit()}>
                Register
            </Button>
        </Box>
    );
}