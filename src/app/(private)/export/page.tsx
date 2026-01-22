"use client";

import React, { useState } from "react";
import { exportCSV, exportPDF } from "../../../services/expense";
import ClientLoader from "../../components/shared/ClientLoader";
import { useAuth } from "../../../context/AuthContext";

export default function ExportPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [month, setMonth] = useState<string>(""); // Default month
    
    const { token } = useAuth();

    // Common download helper
    const downloadFile = (fileData: BlobPart, fileName: string, fileType: string) => {
        const url = window.URL.createObjectURL(new Blob([fileData], { type: fileType }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    // CSV Export Handler
    const handleExportCSV = async () => {
        if (!month || !token) return;
        try {
            setLoading(true);
            const fileData = await exportCSV(month, token);
            downloadFile(fileData, "expenses.csv", "text/csv");
        } catch (error) {
            console.error("CSV Export Error:", error);
            alert("CSV export failed!");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 PDF Export Handler
    const handleExportPDF = async () => {
        if (!month || !token) return;
        try {
            setLoading(true);
            const fileData = await exportPDF(month, token);
            downloadFile(fileData, "expenses.pdf", "application/pdf");
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("PDF export failed!");
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return <ClientLoader />;
    }
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h3 className="mb-3">Export Data</h3>
                <p className="text-muted">Download your expenses in CSV or PDF format.</p>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Select Month</label>
                    <input type="month" className="form-control"
                    value={month} 
                    onChange={(e)=>(
                        setMonth(e.target.value) 
                    )}/>
                </div>
                <div className="d-flex gap-3">
                    <button type="button" className="btn btn-outline-primary"
                    onClick={handleExportCSV}
                    disabled={loading}
                    >
                    {loading ? "Exporting..." : "Export CSV"}
                    </button>
                    <button type="button" className="btn btn-outline-danger"
                    onClick={handleExportPDF}
                    disabled={loading}
                    >
                    {loading ? "Exporting..." : "Export PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}
