import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "./Api";

export default function MyForm() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);
  const [image, setImage] = useState("");

  
  async function getData() {
    const res = await Api.get("/api/user");
    setUsers(res.data.users);
  }

  async function add(data) {
    const formData = new FormData();

    const images = data.image;
    for (var i in images) {
      formData.append("image", images[i]);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    // formData.append("image", data.image[0]);  Single Image Upload
    if (id === null) {
      await Api.post("/api/user", formData);
    } else {
      await Api.put(`/api/user?id=${id}`, formData);
      setId(null);
      setImage("");
    }
    getData();
    reset({
      name: "",
      mobile: "",
      email: "",
      image: "",
    });
  }


  async function trash(id) {
    await Api.delete(`/api/user/${id}`);
    getData();
  }

  async function update(id) {
    setId(id);
    const singleUser = users.find((user) => user._id == id);
    reset(singleUser);
    const img = `${import.meta.env.VITE_IMAGE_URL}/${singleUser.image}`;
    setImage(img);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mt-4 shadow p-5">
        <h3 className="mb-3">User Form</h3>

        <form onSubmit={handleSubmit(add)} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              placeholder="Enter name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: true })}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              {...register("mobile", { required: true })}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image </label>
            <input
              type="file"
              className="form-control"
              {...register("image", { required: false })}
              multiple
              accept="image/*"
            />
            {image === "" ? (
              ""
            ) : (
              <img
                src={image}
                className="my-2"
                width="100px"
                height="100px"
                alt=""
              />
            )}
          </div>

          {id === null ? (
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
          ) : (
            <button type="submit" className="btn btn-warning me-2">
              Update
            </button>
          )}
        </form>
      </div>
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
                    <button
                      onClick={() => update(user._id)}
                      className="btn btn-warning mx-1 "
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
