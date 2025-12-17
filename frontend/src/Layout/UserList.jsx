import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../Api";

export default function MyForm() {
  const [users, setUsers] = useState([]);

  async function getData() {
    const res = await Api.get("/api/user");
    setUsers(res.data.users);
  }

  async function trash(id) {
    await Api.delete(`/api/user/${id}`);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2 className="mt-5 text-center">User List</h2>

      <div className="d-flex justify-content-center">
        <table className="table table-bordered table-striped mt-3 w-75">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Image</th>
              <th>Create At</th>
              <th>Update At</th>
              <th>User Delete</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    {user.image?.map(
                      // not run
                      (ele, i) => (
                        <img
                          key={i}
                          src={`${import.meta.env.VITE_IMAGE_URL}/${ele}`}
                          width="60"
                          height="60"
                          className="mx-1"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                      )
                    )}
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => trash(user._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <a
                      href={`/form/${user._id}`}
                      className="btn btn-warning mx-1 "
                    >
                      Update
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
