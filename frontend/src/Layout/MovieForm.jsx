import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../Api/Api";

export default function MovieForm() {
  const { register, handleSubmit, reset } = useForm();
  const [id, setId] = useState(null);
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const redirect = useNavigate();
  const params = useParams();

  async function getData() {
    const res = await Api.get("/api/movie");
    setMovies(res.data.movies);
  }

  async function submitMovie(data) {
    const formData = new FormData();

    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }
    }

    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("year", data.year);
    formData.append("description", data.description);

    if (id === null) {
      await Api.post("/api/movie", formData);
    } else {
      await Api.put(`/api/movie/${id}`, formData);
    }

    reset();
    setId(null);
    setImages([]);
    redirect("/");
  }

  function update(movieId) {
    setId(movieId);
    const singleMovie = movies.find((m) => m._id === movieId);
    if (!singleMovie) return;

    reset(singleMovie);

    const imageUrls = singleMovie.image?.map(
      (img) => `${import.meta.env.VITE_IMAGE_URL}/${img}`
    );
    setImages(imageUrls);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (params.id) {
      update(params.id);
    }
  }, [params.id, movies]);

  return (
    <div className="container mt-4 shadow p-5">
      <h3 className="mb-3">Movie Form</h3>

      <form onSubmit={handleSubmit(submitMovie)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Movie Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
            placeholder="Enter movie title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            {...register("genre", { required: true })}
            placeholder="Action, Drama, Comedy"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Release Year</label>
          <input
            type="number"
            className="form-control"
            {...register("year", { required: true })}
            placeholder="2024"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            {...register("description")}
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            {...register("image")}
            accept="image/*"
            multiple
          />

          <div className="mt-2 d-flex">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                width="100"
                className="me-2 mb-2"
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
            ))}
          </div>
        </div>

        {id === null ? (
          <button className="btn btn-primary">Add Movie</button>
        ) : (
          <button className="btn btn-warning">Update Movie</button>
        )}
      </form>
    </div>
  );
}
