'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../services/auth"; // Adjust the import path as necessary
import { useAuth } from "../../../context/AuthContext";
import { showSuccess } from "../../../utils/toaster"
import { Alert } from 'react-bootstrap';

export default function LoginForm() {
    const { login } = useAuth(); // Get the login function from AuthContext
    const router = useRouter();
    // State to manage form data
    type formFieldsType = {
        email: string;
        password: string;
    }
    const formFields:formFieldsType = {
        email: '',
        password: ''
    }
    const [formData,setFormData] = useState(formFields);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [show, setShow] = useState(true);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError('');
        console.log("Form submmitted:", formData);

        // call the login service
        loginUser(formData)
        .then((response) => {
            console.log("Login successful:", response.data.user);
            setFormData({
                email: '',
                password: ''
            });
            login(response.data); // context me user set karo
            showSuccess("Login successfully");
        })
        .catch((error) => {
            setSubmitError(error?.data?.message || "Your credential is not correct,Try again!");
        })
        .finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        // check if user is already logged in
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setFormData({
                email: user.email || '',
                password: ''
            });
            // Redirect to expenses page if user is already logged in
            if (user) {
                login(user); // Set user in context
                router.push('/dashboard'); // Redirect to expenses page
            }
        }
    },[]);

    return (
        <form onSubmit={handleSubmit}>
            {
            submitError && 
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>{submitError}</Alert>
            }
            <div className="mb-3">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="you@example.com" 
                value={formData.email}
                onChange={(e)=>(
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                )}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="••••••••" 
                value={formData.password}
                onChange={(e)=>(
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                )}/>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}