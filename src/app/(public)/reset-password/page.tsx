"use client";

import React, { useState } from "react";
import { resetPassword } from "@/services/auth";
import { showSuccess, showError } from "../../../utils/toaster";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Define type for form data
type ResetPasswordFormDataType = {
    email: string;
    token: string;
    password: string;
    confirmedPassword: string;
}

export default function ResetPasswordPage() {
    // Get search params
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';

    // Set up state
    const [formData, setFormData] = useState<ResetPasswordFormDataType>({
        email: email,
        token: token,
        password: '',
        confirmedPassword: '',
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const router =  useRouter();

    // Handle input changes
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Handle form submission
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        //Password and Confirm password match validation
        if(formData.password !== formData.confirmedPassword) {
            showError("Password and Confirm Password do not match.");
            return;
        }

        setLoading(true);
        try {
            const formDataToSend = {
                ...formData,
                email: formData.email,
            }
            const response = await resetPassword(formDataToSend);
            console.log("Password reset successful:", response);
            showSuccess("Password has been reset successfully.");
            setFormData({
                email: '',
                token: '',
                password: '',
                confirmedPassword: '',
            });
            // redirect the user to the login page or another page
            router.push('/login');

        } catch (error: any) {
            showError(error.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="card shadow-sm">
            <div className="card-body">
                <h4 className="mb-3">Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">New Password <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <input 
                            type={showPassword ? "text" : "password" }
                            className="form-control" placeholder="****" 
                            value={formData.password}
                            name="password"
                            onChange={handleInputChange}/>
                            <span className="input-group-text cursor-pointer"
                            onClick={()=>
                                setShowPassword(!showPassword)
                            }>
                                { showPassword ? <FaEye/> : <FaEyeSlash/> } 
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm New Password <span className="text-danger">*</span></label>
                        <div className="input-group">    
                            <input 
                            type={ showConfirmPassword ? "text" : "password" } 
                            className="form-control" placeholder="****" 
                            name="confirmedPassword"
                            value={formData.confirmedPassword}
                            onChange={handleInputChange}/>
                            <span className="input-group-text cursor-pointer"
                            onClick={
                                () => setShowConfirmPassword(!showConfirmPassword)
                            }>
                                { showConfirmPassword ? <FaEye/> : <FaEyeSlash/> } 
                            </span>
                        </div>    
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        { loading ? 'Sending...' : 'Reset Password' }
                    </button>
                </form>
            </div>
        </div>
    )
}