'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/reports', label: 'Reports' },
    { href: '/export', label: 'Export' },
]

export default function Sidebar() {
    const pathName = usePathname();
    return (
        <aside className="bg-light border-end vh-100 p-3">
            <ul className="nav flex-column">
                {
                    links.map( (link) => (
                        <li key={link.href} className={`nav-item mb-1 rounded ${pathName===link.href ? 'bg-dark' : ''}`}>
                            <Link className={`nav-link d-block px-3 py-2 rounded ${pathName===link.href ? 'text-white fw-semibold': 'text-dark fw-normal'}`} href={link.href}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    );
}