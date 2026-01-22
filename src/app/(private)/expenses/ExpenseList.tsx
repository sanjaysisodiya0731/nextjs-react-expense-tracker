"use client";
import React, { useState, useEffect } from 'react';
import { getMonthlyReport } from '../../../services/expense';
import { formateDate } from '../../../utils/DateFormate';
import ClientLoader from '../../components/shared/ClientLoader';

// Define type for expense
type ExpenseType = {
    id: string;
    amount: number;
    category: string;
    spent_at: string;
    note: string;
};

export default function ExpenseList() {
    // set state to manage expenses
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination state (optional, can be extended later)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [limit, setlimit] = useState<number>(10);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                // localStorage से token निकाला
                const data = localStorage.getItem("user");
                const parsedData = JSON.parse(data || "{}");

                if (parsedData?.token) {
                    const result = await getMonthlyReport("2025-08",parsedData.token,currentPage, limit);
                    setExpenses(result.data); // set the result of the API to state
                    setTotalPages(result.last_page || 1);
                    setTotal(result.total || 0);
                }
            } catch (error) {
                console.error("Failed to fetch expenses:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchExpenses();
    }, [currentPage, limit]);
    
    if (loading) {
        return <ClientLoader/>;
    }

    return (
    <div className="card shadow-sm">
        <div className="card-body p-0">
            <table className="table mb-0">
                <thead className="table-light">
                    <tr>
                        <th>SN</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount (₹)</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        expenses.length == 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">No expenses found for this month.</td>
                            </tr>
                        ) : (
                            expenses.map( (expense,index) => (
                                <tr key={expense.id}>
                                    <td>{(currentPage - 1) * limit + (index + 1)}</td>
                                    <td>{formateDate(expense.spent_at)}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.note}</td>
                                </tr>
                            ))
                        )
                    }
                </tbody>    
            </table>
        </div>
        {/* Pagination */}
        <div className="card-footer d-flex justify-content-between align-items-center">
            <span className="text-muted">Showing {total} expenses</span>
            {/* Limit Per Page Dropdown*/}
            <div>
                <select className="form-select form-select-sm d-inline w-auto me-2"
                value={limit}
                onChange={(e) => {
                    setlimit(parseInt(e.target.value));
                    setCurrentPage(1); // Reset to first page when limit changes
                }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-muted"> Per Page</span>
            </div>        
            <nav>
                <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >Previous</button>
                    </li>
                    {
                        Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                            </li>
                        ))
                    }
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >Next</button>
                    </li>
                </ul>
            </nav>
        </div> 
    </div>
    );
}