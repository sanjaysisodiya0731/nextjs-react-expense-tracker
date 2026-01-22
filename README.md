💰 Expense Tracker – Money Wise Mate

Money Wise Mate is a full-featured Expense Tracker application that helps users manage their income, expenses, budgets, and financial reports efficiently.

The application is built using a Laravel REST API (Backend) and Next.js + React (Frontend).

📦 Core Modules & Functionality
1️⃣ Authentication & User Management Module
🔹 Functionality

User registration and login (JWT / Session-based authentication)

Role-based access (Normal User / Admin)

Password reset via email

Profile update (name, email, avatar)

🔄 Workflow

New user signs up → Email verification

After login, all APIs are secured

User can update their profile

Admin can manage all users (block / unblock)

2️⃣ Dashboard Module
🔹 Functionality

Monthly expense summary

Income vs Expense graph

Category-wise pie chart (Food, Rent, Bills, Travel, etc.)

Recent transactions list

🔄 Workflow

User logs in → Dashboard is displayed

Current month data is fetched from backend

Data is visualized using charts and graphs

Quick add expense option is available

3️⃣ Income Management Module
🔹 Functionality

Add / update / delete income

Income categories (Salary, Freelance, Business, Investment)

Recurring income (monthly salary auto-entry)

🔄 Workflow

User fills the “Add Income” form

Income is saved in the backend (date, amount, category, note)

Dashboard is updated automatically

4️⃣ Expense Management Module
🔹 Functionality

Add / update / delete expenses

Expense categories (Food, Rent, Shopping, Travel)

Recurring expenses (EMI, Rent auto-entry)

Receipt / bill image upload

🔄 Workflow

User adds a new expense

System assigns the selected category

Dashboard and reports are updated automatically

5️⃣ Budget Management Module
🔹 Functionality

Set monthly budgets per category

Alerts when budget limit is exceeded

Budget vs Actual comparison report

🔄 Workflow

User sets a monthly budget (e.g., Food = ₹10,000)

System checks limits whenever an expense is added

Notification is triggered if the budget is exceeded

6️⃣ Reports & Analytics Module
🔹 Functionality

Date range filters (Daily / Weekly / Monthly / Yearly)

Income vs Expense analysis

Category-wise expense breakdown

Export reports (PDF, Excel, CSV)

🔄 Workflow

User selects report filters (e.g., January 2025)

Backend returns filtered data

Charts and tables are generated

Reports can be downloaded using export options

7️⃣ Recurring Transactions Module
🔹 Functionality

Automatic entry for recurring income and expenses

Due date reminders (EMI, Rent, subscriptions)

Calendar view for recurring transactions

🔄 Workflow

User sets up recurring transactions

Cron jobs create entries automatically each cycle

User receives reminders and notifications

8️⃣ Notifications Module
🔹 Functionality

Budget exceed alerts

Monthly summary emails

Due payment reminders

In-app and email notifications

🔄 Workflow

Event is triggered (e.g., budget exceeded)

Backend generates notifications

User receives alerts on dashboard and email

9️⃣ Multi-Currency & Wallets Module (Optional – Advanced)
🔹 Functionality

Multiple currencies (INR, USD, EUR)

Wallets / Accounts (Cash, Bank, Credit Card, UPI)

Wallet-to-wallet transfers

🔄 Workflow

User creates a new wallet

Income / expense is assigned to a wallet

Wallet balances are updated in real time

🔟 Admin Panel (Multi-User System)
🔹 Functionality

Manage all users

Download reports

Detect suspicious or fraudulent transactions

Subscription plans (Free / Premium)

🔄 Workflow

Admin logs in

Views and manages users

Applies access limits based on subscription status

🔁 End-to-End Workflow

User signs up or logs in

Dashboard displays summaries and charts

User adds income and expenses

Budget alerts are triggered when limits are crossed

Reports can be generated and downloaded

Monthly summary emails are sent automatically

🔧 API Configuration (Axios)

All frontend API calls are handled using Axios.

📁 File Location
src/lib/axios.js

📌 Axios Setup
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/project/expense-tracker-api/public/api",
    withCredentials: true // Required for Sanctum / session-based authentication
});

export default api;

ℹ️ Notes

baseURL points to the Laravel API

All authentication, expense, and report APIs use this configuration

Centralized API configuration makes maintenance easier