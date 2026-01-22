import Link from 'next/link';

export default function Home() {
    return (
        <main className="container py-5">
            <div className="text-center">
                <h1 className="mb-3">Welcome to Expense Tracker</h1>
                <p className="text-muted mb-4">
                    Track your expenses, see monthly insights, and export reports.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <Link className="btn btn-outline-secondary" href="/login">Login</Link>
                    <Link className="btn btn-outline-success" href="/signup">Signup</Link>
                </div>
            </div>
        </main>
    );
}
