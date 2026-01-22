import Link from 'next/link';
import ExpenseList from './ExpenseList';

export default function ExpensesPage() {
  return (
    <div>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="mb-0">Expenses</h3>
            <Link href="/expenses/new" className="btn btn-primary">Add Expense</Link>
        </div>
        <ExpenseList />
    </div>
  );
}
