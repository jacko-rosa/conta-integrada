'use client'

import { ImagesArguments } from '@/utils/images';
import { Routes } from '@/utils/routes';
import Image from 'next/image';
import { redirect } from "next/navigation";
import styles from './home.module.css';
import { Button } from '@mui/material';

export function HomeComponent() {
    return (
        <div className={styles.homeComponent}>
            <div className={styles.main}>
                <section className={styles.batatinha}>
                    <div className={styles.overviewContent}>
                        <div className={styles.content}>
                            <h2>Bem-vindo à Conta Integrada!</h2>
                        </div>
                        <div className={styles.content}>
                            <p>A solução financeira para simplificar para suas necessidades.</p>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={() => redirect(Routes.HOME.LOGIN.href)} variant="contained" color="secondary"> Login</Button>
                        <Button onClick={() => redirect(Routes.HOME.REGISTER.href)} variant="contained" color="primary"> register</Button>
                    </div>
                </section>
                <div className={styles.overviewImage}>
                    <Image src={ImagesArguments.planejamento_inanceiro.src} alt={ImagesArguments.planejamento_inanceiro.alt} fill={true} />
                </div>
            </div>
        </div>
    );
};