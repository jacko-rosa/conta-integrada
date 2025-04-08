'use client'

import { HeaderComponent } from '@/app/components/header/home/header.componten';
import { RegisterForm } from '@/app/components/home/register/register-form.component';
import { AuthorizationValidation } from '@/app/form-validators/authorization.validator';
import { AuthenticationWebService } from '@/app/web-services/home/authentication.web-service';
import { UserMapper } from '@/mappers/user.mapper';
import { Routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const defaultValue = {
  name: '',
  lastName: '',
  document: '',
  email: '',
  password: '',
}

export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(defaultValue);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(defaultValue);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function register(event: React.FormEvent<HTMLFormElement>) {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const form = new FormData(event.currentTarget)
      const dto = UserMapper.formToDto(form);
      await AuthenticationWebService.registerService(dto);
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
    const errors = AuthorizationValidation.validateFormSignUp(name, value, label, formErrors);
    setFormErrors(errors);
  }

  function disableRegister(): boolean {
    return Object.keys(formErrors).length > 0 || Object.keys(formValues).length < Object.keys(defaultValue).length || isSubmitting;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '40vw' }}>
      <RegisterForm
        formValues={formValues}
        formErrors={formErrors}
        apiError={apiError}
        handleInputChange={handleInputChange}
        handleRegister={register}
        disableRegister={disableRegister}
      >
        <HeaderComponent />
      </RegisterForm>
    </div>
  );
};