'use client'

import { HeaderComponent } from '../../components/header/header.componten';
import { HomeComponent } from '../../components/home/home.component';

export function HomePage() {
    return (
        <div>
            <HeaderComponent />
            <HomeComponent />
        </div>
    );
};