"use client";

import { getCurrentUser, updateProfile } from "../../../services/auth";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { showSuccess, showError } from "../../../utils/toaster"

type formDateType = {
    name: string;
    email: string;
    profileImage: File | null;
};

export default function ProfilePage() {
    const [formData, setFormData] = useState<formDateType>({
        name: "",
        email: "",
        profileImage: null,
    });

    // Token handling (better: move to AuthContext later)
    let data = localStorage.getItem('user');
    let parsedData = JSON.parse(data || '{}');
    const token = parsedData.token || '';

    // Fetch current user data on component mount
    useEffect(() => {
        try {
            async function fetchUserData() {
                const user = await getCurrentUser(token || '');
                console.log("Fetched user data:", user);
                if (user) {
                    setFormData({
                        name: user.data.name || "",
                        email: user.data.email || "",
                        profileImage: null,
                    });
                }
            }
            fetchUserData();

        } catch (error: any) {
            showError(error.message || "Get profile.");
        }
    }, []);

    // Form submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);

        try {
            const response = await updateProfile(
            {
                name: formData.name
            },
            token
            );
            showSuccess("Profile updated successfully.");
        } catch (error: any) {
            showError(error.message || "Failed updating profile.");
        }
    };
    return (
        <>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3">Edit Profile</h4>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name <span className="text-danger">*</span></label>
                            <input
                            name={formData.name}
                            value={formData.name}
                            onChange={
                                (e) => setFormData(
                                    {
                                        ...formData,
                                        name:  e.target.value
                                    }
                                )
                            } 
                            type="text" className="form-control" id="name" placeholder="Enter your full name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span> (Read Only)</label>
                            <input type="text" 
                            name={formData.email}
                            value={formData.email}
                            className="form-control" id="email" placeholder="Enter your email" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label">Profile Image</label>
                            <input type="file" className="form-control" id="profileImage" />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Update</button>
                        <Link href="/dashboard" className="btn btn-secondary">Cancel</Link>
                    </form>
                </div>
            </div>
        </>
    );
}