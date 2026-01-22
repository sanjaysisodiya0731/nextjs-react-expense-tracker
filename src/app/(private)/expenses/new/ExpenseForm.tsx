"use client";

import React, {useState} from 'react';
import { addExpense } from '../../../../services/expense'
import { useRouter } from "next/navigation";
import { showSuccess } from "../../../../utils/toaster"

// Form fields type
type ExpenseFormFields = {
    amount: number | string;
    category: string;
    spent_at: string;
    note: string;
}

export default function ExpenseForm() {

    const router = useRouter();
    
    //Initial form state   
    const [ formData, setFormData ] = useState<ExpenseFormFields>({
        amount: '',
        category: 'food',
        spent_at: '',
        note: ''
    });

    // UI states to manage loading and error
    const [ loading, setLoading ] = useState(false);
    const [ submitError, setSubmitError ] = useState<string>('');
    
    // Token handling (better: move to AuthContext later)
    let data = localStorage.getItem('user');
    let parsedData = JSON.parse(data || '{}');
    const token = parsedData.token || '';

    // handler for form input changes
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    // Form submit handler
    const handleSubmit  = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError('');
        // Call the addExpense service
        addExpense(formData, token || '')
            .then((response) => {
                console.log("Expense added successfully:", response);
                setFormData({
                    amount: '',
                    category: 'food',
                    spent_at: '',
                    note: ''
                });

                showSuccess("Expense added successfully!");
                // Redirect to expenses page after successful addition
                router.push('/expenses');
            })
            .catch((error: any) => {
                setSubmitError(error?.data?.message || "Failed to add expense!");
            })
            .finally(() => {
                setLoading(false);
            }
        );
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Amount (₹)</label>
                    <input type="number" min="0" step="1" className="form-control" placeholder="e.g., 500" 
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Category</label>
                    <select className="form-select"
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    >
                        <option value='food'>Food</option>
                        <option value='transport'>Transport</option>
                        <option value='bills'>Bills</option>
                        <option value='shopping'>Shopping</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" 
                    name='spent_at'
                    value={formData.spent_at}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Note (Optional)</label>
                    <input type="text" className="form-control" placeholder="e.g., Lunch at cafe" 
                    name='note'
                    value={formData.note}
                    onChange={handleChange}
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-success mt-3" disabled={loading}>
            { loading ? "Adding..." : "Add Expense" }
            </button>
        </form>
    )
}