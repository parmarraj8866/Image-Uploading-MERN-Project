import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../Api";

export default function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [id, setId] = useState(null);
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const redirect = useNavigate()

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

    if (id === null) {
      await Api.post("/api/user", formData);
    } else {
      await Api.put(`/api/user?id=${id}`, formData);
      setId(null);
      setImage("");
    }
    
    redirect("/")
    reset({
      name: "",
      mobile: "",
      email: "",
      image: "",
    });
  }

  const params = useParams(); // FIX 1

  async function update(userId) {
    setId(userId); // FIX 2

    const singleUser = users.find((user) => user._id == userId);
    if (!singleUser) return;

    reset(singleUser);

    const img = `${import.meta.env.VITE_IMAGE_URL}/${singleUser.image}`;
    setImage(img);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (params.id && users.length > 0) {
      update(params.id); // FIX 3
    }
  }, [params.id, users]);

  return (
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

          {image !== "" && (
            <img
              src={image}
              className="my-2"
              width="100"
              height="100"
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
  );
}
