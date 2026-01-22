import api from "../lib/axios";

export const monthlyReport = async (month,token) => {
    const response = await api.get(`/reports/monthly${month ? `?month=${month}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}