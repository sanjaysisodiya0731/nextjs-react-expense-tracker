import api from "../lib/axios";

// Add Expense
export const addExpense = async (expenseData, token) => {
    try {
        console.log("Adding expense with data:", token);
        const response = await api.post("/expenses", expenseData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        throw error; // Re-throw the error for further handling
    }
};

// Get All Expenses expenses?month=2025-08 here month is optional
export const getMonthlyReport = async (month, token, currentPage, limit) => {
    try {
        const response = await api.get(`/expenses${month ? `?month=${month}` : ''}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: currentPage || 1,
                per_page: limit || 5
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching monthly report:", error);
        throw error; // Re-throw the error for further handling
    }
}

// Get Expense export as CSV export/csv?month=2025-08 here month is optional
export const exportCSV = async (month,token) => {
    const response = await api.get(`/export/csv${month ? `?month=${month}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob' // Important for file download
    });
    return response.data;
}

export const exportPDF = async (month,token) => {
    const response = await api.get(`/export/pdf${month ? `?month=${month}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob' // Important for file download
    });
    return response.data;
}