"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlyReport } from "../../../services/reports"
import { useAuth } from "../../../context/AuthContext";
import ClientLoader from '../../components/shared/ClientLoader';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Report Type - Monthly
interface BreakDownItem {
    category: string;
    total: number;
}

interface ReportDataType {
    month : string;
    grand_total: number;
    breakdown: BreakDownItem[];
}

export default function ReportsPage() {
    const { user } = useAuth(); // getting user + token from context

    // state to hold data
    const [month, setMonth] = useState<string>( () => {
        // default current month
        return new Date().toISOString().slice(0, 7); // e.g. 2025-08
    });
    const [reportData, setreportData] = useState<ReportDataType | null>({
        month: '',
        grand_total: 0,
        breakdown: []
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await monthlyReport(month, user?.token || '');
            console.log(data);
            setreportData(data);
        } catch (err) {
            setError('Failed to fetch report. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <ClientLoader/>;
    }

    return (
        <div>
            <h3 className="mb-3">Expenses Monthly Report</h3>

            <div className="card mb-3">
                <div className="card-body">
                    <form className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">Select Month</label>
                            <input type="month" className="form-control" 
                            name="month"
                            value={month}
                            onChange={
                                (e) => setMonth(e.target.value)
                            }
                            />
                        </div>
                        <div className="col-md-4 align-self-end">
                            <button type="button" className="btn btn-primary"
                            onClick={handleGenerateReport}>
                             {loading ? "Loading..." : "Generate"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <p className="text-muted mb-2">Chart will render here.</p>
                    <div className="bg-light border rounded d-flex align-items-center justify-content-center" style={{ height: 320 }}>
                        {!reportData && !loading && !error && (
                            <span className="text-secondary">[Select month and generate report]</span>
                        )}

                        {
                            reportData?.breakdown && reportData?.breakdown?.length > 0 && (
                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                    <Pie
                                        data={reportData?.breakdown}
                                        dataKey="total"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                        isAnimationActive={true}
                                        animationBegin={0}
                                        animationDuration={400}
                                        animationEasing="ease-out" 
                                    >
                                        {reportData?.breakdown.map((entry: any, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
