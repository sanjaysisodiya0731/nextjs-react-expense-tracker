import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div>
        <h3 className="mb-4">Dashboard</h3>
        <div className="row g-3">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Expenses</h5>
                        <p className="card-text">View and manage all expenses.</p>
                        <Link className="btn btn-primary" href="/expenses">Open Expenses</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Reports</h5>
                        <p className="card-text">Monthly report with charts.</p>
                        <Link className="btn btn-primary" href="/reports">View Reports</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Export</h5>
                        <p className="card-text">Export data to CSV/PDF.</p>
                        <Link className="btn btn-primary" href="/export">Export</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
