import Link from 'next/link';
import Headerlinks from './HeaderLinks';

export default function Header() {    
    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link className="navbar-brand" href="/dashboard">Expense Tracker</Link>

            <div className="d-flex gap-3">
                {/* client component */}
                <Headerlinks />
            </div>
        </nav>
    );
}