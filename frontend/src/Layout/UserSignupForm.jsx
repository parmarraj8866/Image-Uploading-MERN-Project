import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";

export default function SimpleForm() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);

  async function signup(data) {
    await Api.post("/api/userpass", data);
    console.log(data);
  }

  async function getUsers() {
    const res = await Api.get("/api/userpass");
    console.log(res.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 shadow p-4">
          <h4 className="mb-3 text-center">User Signup Form</h4>

          <form method="post" onSubmit={handleSubmit(signup)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                {...register("username")}
                className="form-control"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="number"
                {...register("mobile")}
                className="form-control"
                placeholder="Enter Mobile"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
