'use client';

import { HeaderComponent } from '@/app/components/header/home/header.componten';
import { LoginForm } from '@/app/components/home/login/sign-in.component';
import { AuthorizationValidation } from '@/app/form-validators/authorization.validator';
import { loginService } from '@/app/web-services/home/authentication.web-service';
import { UserMapper } from '@/mappers/user.mapper';
import { Routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const defaultValue = {
  document: '',
  password: '',
};

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(defaultValue);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(defaultValue);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const form = new FormData(event.currentTarget)
      const dto = UserMapper.formToDto(form);
      await loginService(dto);
      router.push(Routes.DASBOARD.MAIN.href);
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Unespected error');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError(null);
    const errors = AuthorizationValidation.validateFormSignIn(name, value, label, formErrors);
    setFormErrors(errors);
  }

  function disableLogin(): boolean {
    return Object.keys(formErrors).length > 0 || Object.keys(formValues).length < Object.keys(defaultValue).length || isSubmitting;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '40vw' }}>
      <LoginForm
        formValues={formValues}
        formErrors={formErrors}
        apiError={apiError}
        handleInputChange={handleInputChange}
        handleLogin={login}
        disableLogin={disableLogin}
      >
        <HeaderComponent />
      </LoginForm>
    </div>
  );
}