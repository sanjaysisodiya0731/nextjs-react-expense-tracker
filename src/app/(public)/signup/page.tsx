import Link from 'next/link';
import SignupForm from './SignupForm';

export default function SignupPage() {
  return (
    <div className="card shadow-sm">
        <div className="card-body">
            <h4 className="mb-3">Signup</h4>
            {/* Client Component */}
            <SignupForm />
            <p className="mt-3 mb-0">
                Already have an account? <Link href="/login">Login</Link>
            </p>
        </div>
    </div>
  );
}

