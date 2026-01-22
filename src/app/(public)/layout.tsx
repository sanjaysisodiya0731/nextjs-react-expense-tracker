import type { Metadata } from 'next';

import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export const metadata: Metadata = {
    title: 'Auth - Expense Tracker',
    description: 'Login & Signup',
};

export default function AuthLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            <Header />
            <main className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}