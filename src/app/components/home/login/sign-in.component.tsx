// src/app/components/home/sign-in/sign-in.component.tsx
import React from 'react';
import styles from './sign-in.module.css';

const SignIn: React.FC = () => {
  return (
    <form className={styles.form}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default SignIn;