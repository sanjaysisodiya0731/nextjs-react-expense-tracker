"use client";
import { forgotPassword } from "@/services/auth";
import { useState } from "react";
import { showSuccess,showError  } from "../../../utils/toaster"
import { useRouter } from "next/navigation";
import { isValidEmail } from "../../../utils/Comman";

export default function ForgotPasswordPage() {
    // Set up state for email input
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate email format
        if (!isValidEmail(email)) {
            showError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Call the forgot password service
        try {
            const response = await forgotPassword(email);
            console.log("Forgot password request successful:", response);
            setEmail(email);
            showSuccess("Password reset link sent to your email. Please check your inbox.");

            // You can also redirect the user to another page if needed
            router.push('/login');
        } catch (error: any) {
            showError(error.message || "Failed to send reset link.");
            setEmail(email);
        } finally {
            setLoading(false);
        }  
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-2xl font-bold">Forgot Password</h1>
            <form
            onSubmit={handleSubmit} 
            className="w-full max-w-sm bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="form-label"
                    >
                        Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                type="submit"
                className="btn btn-primary w-full" disabled={loading}
                >
                { loading ? 'Sending...' : 'Send Reset Link' }
                </button>
            </form>
        </div>
    )
}