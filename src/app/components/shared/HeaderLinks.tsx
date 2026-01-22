'use client';

import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

export default function Headerlinks() {
    const { user, logout } = useAuth(); // Get user and logout function from AuthContext
    return (
        <>
        {
            user ? (
                <>
                <span className="text-white">Welcome, {user?.user?.name}</span>
                <Link className="btn btn-outline-light btn-sm mx-2" href="/profile">Edit Profile</Link>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
                </>
            )
            : (
                <>
                <Link className="btn btn-outline-light btn-sm" href="/login">Login</Link>
                <Link className="btn btn-light btn-sm" href="/signup">Signup</Link>
                </>
            )
        }
        </>
    );
}