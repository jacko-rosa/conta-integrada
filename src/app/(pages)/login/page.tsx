'use client'

import { HeaderComponent } from '@/app/components/header/home/header.componten';
import LoginForm from '@/app/components/home/login/sign-in.component';

export default function SignUpPage() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '40vw' }}>
        <LoginForm>
          <HeaderComponent />
        </LoginForm>
      </div>
    </>
  );
};