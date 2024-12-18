import React, { useState } from "react";
import { loginUser } from "../api";
import { setToken } from "../utils/auth";

const Login = ({ onLogin, onLoginFailure, toggleRegister }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(credentials);
      setToken(response.token);
      onLogin(response.user);
    } catch (err) {
      setError(err.message);
      onLoginFailure();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={toggleRegister}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
