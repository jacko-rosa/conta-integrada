'use client'
import { Routes } from '@/utils/routes';
import Image from 'next/image';
import { redirect } from "next/navigation";
import styles from './home.module.css';

export function HomeComponent() {
    const altImgOverView = `Ilustração minimalista de um sistema de controle financeiro com cores suaves de verde e 
    azul. Elementos incluem uma planilha com categorias de renda e despesas, um gráfico de balanço, um bloco de notas 
    com um lápis e um painel de controle financeiro digital com gráficos e tabelas.`
    const srcImgOverView = `/unnamed2.png`;

    function OnClickLogin() {
        
        redirect(Routes.HOME.LOGIN.href)
    }

    function OnClickRegister() {

    }

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
                        <button onClick={() => redirect(Routes.HOME.LOGIN.href)}> Login</button>
                        <button onClick={() => redirect(Routes.HOME.REGISTER.href)}> register</button>
                    </div>
                </section>
                <div className={styles.overviewImage}>
                    <Image src={srcImgOverView} alt={altImgOverView} fill={true} />
                </div>
            </div>
        </div>
    );
};