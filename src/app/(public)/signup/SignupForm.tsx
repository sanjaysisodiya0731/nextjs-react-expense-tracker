"use client";
import React, { useState } from "react";
import { signupUser } from "../../../services/auth";
import { useRouter } from "next/navigation";

type formDataType = {
    name: string;
    email: string;
    password: string;
}

export default function SignupForm() {

    const router = useRouter();

    // State to manage form data
    const [formData, setFormData] = useState<formDataType>({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState('');

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError('');

        // Call the signup service
        await signupUser(formData)
            .then((response) => {
                console.log("Signup successful:", response);
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                })
                // Redirect to login page after successful signup
                router.push('/login');
            })
            .catch((error) => {
                setSubmitError(error?.data?.message || "Signup failed!");
            })
            .finally(() => {
                setLoading(false);
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {submitError && <p className="text-danger">{submitError}</p>}
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Your Name" 
                value={formData.name}
                name="name"
                onChange={handleInputChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" placeholder="you@example.com" 
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Create a password" 
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                { loading ? "Signing up..." : "Sign Up" }
            </button>
        </form>
    )
}