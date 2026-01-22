import Link from 'next/link';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return(
        <div className="card shadow-sm">
            <div className="card-body">
                <h4 className="mb-3">Login</h4>
                {/* <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder="you@example.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="••••••••" />
                    </div>
                    <button type="button" className="btn btn-primary w-100">
                        Login
                    </button>
                </form> */}
                < LoginForm />
                <p className="mt-3 mb-0 ">
                New here? <Link href="/signup">Create an account</Link>
                </p>
                <p className="mt-1 mb-0 bg-light p-2 text-center">
                    <Link href="/forgot-password">Forgot Password</Link>
                </p>
            </div>
        </div>
    )
}