import React from "react";

export default function LoginForm() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 shadow p-4">
          <h4 className="mb-3 text-center">User Login Form</h4>

          <form>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
                <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <a href="/signup">signup</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
