// src/app/components/home/sign-up/sign-up.component.tsx
import React from 'react';
import styles from './sign-up.module.css';

const SignUp: React.FC = () => {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="Nome" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default SignUp;