import type { Metadata } from 'next';

import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Sidebar from '../components/shared/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard - Expense Tracker',
  description: 'App Pages',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 col-lg-10 p-3">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}