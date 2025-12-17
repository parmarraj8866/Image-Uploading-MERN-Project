import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./Layout/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Layout/Form";
import Navbar from "./Layout/Navbar";
import SimpleForm from "./Layout/UserSignupForm";
import LoginForm from "./Layout/UserLoginForm";

export default function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/signup" element={<SimpleForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
