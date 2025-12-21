import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../Api/Api";

export default function MovieCards() {
  const [movies, setMovies] = useState([]);

  async function getData() {
    const res = await Api.get("/api/movie");
    setMovies(res.data.movies);
  }

  async function trash(id) {
    await Api.delete(`/api/movie/${id}`);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎬 Movie List</h2>

      <div className="row">
        {movies &&
          movies.map((movie) => (
            <div className="col-md-4 col-lg-3 mb-4" key={movie._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${movie.image[0]}`}
                  className="card-img-top mb-2"
                  style={{ height: "300px" , objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Genre:</strong> {movie.genre}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Year:</strong> {movie.year}
                  </p>
                  <p className="card-text small text-muted">
                    {movie.description}
                  </p>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <button
                    onClick={() => trash(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>

                  <a
                    href={`/form/${movie._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Update
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
