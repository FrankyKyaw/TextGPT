import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div``;
export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };

  const handleChange = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col w-full items-center jutify-center px-6 py-8 bg-gray-50 dark:bg-gray-900">
      <h1>Register Here</h1>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          className="border"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="border"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="border"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="border"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Create user</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
