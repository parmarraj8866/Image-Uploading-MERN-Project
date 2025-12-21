import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCards from "./Layout/MovieList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieForm from "./Layout/MovieForm";
import Navbar from "./Layout/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieCards />} />
          <Route path="/form" element={<MovieForm />} />
          <Route path="/form/:id" element={<MovieForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
