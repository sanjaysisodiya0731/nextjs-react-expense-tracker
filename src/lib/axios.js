import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/project/demo_practice/React_Js/NextJS/ProjectPractice/expense-tracker-api/public/api", // Laravel API का base URL
    withCredentials: true, // अगर Sanctum या Auth cookie use कर रहे हैं
});

export default api;