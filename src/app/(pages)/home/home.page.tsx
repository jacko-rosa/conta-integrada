'use client'

import { HeaderComponent } from '../../components/header/home/header.componten';
import { HomeComponent } from '../../components/home/home.component';

export function HomePage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'98vw' , maxWidth: '2500px', paddingTop: '1vh'}}>
            <HeaderComponent />
            <HomeComponent />
        </div>
    );
};