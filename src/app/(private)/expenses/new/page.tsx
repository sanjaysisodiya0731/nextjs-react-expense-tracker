import Link from 'next/link';
import ExpenseForm from './ExpenseForm';

export default async function AddExpensePage() {
  return (
    <div className="card shadow-sm">
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="mb-0">Add Expense</h4>
                <Link href="/expenses" className="btn btn-outline-secondary btn-sm">Back</Link>
            </div>
            <ExpenseForm />
        </div>
    </div>
  );
}
