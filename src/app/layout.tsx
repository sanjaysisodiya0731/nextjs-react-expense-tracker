import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from '../context/AuthContext'
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Mini Project using Next.js + TypeScript',
}

export default function RootLayout(
    {children,}: Readonly<{children: React.ReactNode;}>
) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
            {children}
            {/* Toaster container (एक बार global) */}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
