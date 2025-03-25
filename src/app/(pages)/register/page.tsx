'use client'

import { HeaderComponent } from '@/app/components/header/home/header.componten';
import RegisterForm from '@/app/components/home/register/register-form.component';

export default function SignUpPage() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '40vw'}}>
        <RegisterForm>
          <HeaderComponent />
        </RegisterForm>
      </div>
    </>
  );
};