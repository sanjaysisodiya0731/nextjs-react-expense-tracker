export default function ClientLoader() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-90">
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "5rem", height: "5rem", borderWidth: "0.2rem" }}
            >
                <span className="visually-hidden"></span>
            </div>
            <p className="ms-3 fs-5 text-secondary"></p>
        </div>
    );
}