import React, { useState } from "react";
import "./login.css";
import mail from "../images/artboard2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../endpoints";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateUsername = (username) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(username);
  };

  const handleUname = (e) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    setLoading(true);
    if (username === "" && password === "") {
      setErrorMessage("Enter both username and password");
      setLoading(false);
    } else if (username === "") {
      setErrorMessage("Enter a username");
      setLoading(false);
    } else if (password === "") {
      setErrorMessage("Enter a password");
      setLoading(false);
    } else if (!validateUsername(username)) {
      setErrorMessage("Enter a valid email");
      setLoading(false);
    } else {
      const payload = { email: username, password };

      axios
        .post(`${LOGIN}`, payload)
        .then((response) => {
          const { user_role } = response.data.user;

          localStorage.removeItem("is_employee");
          localStorage.removeItem("is_employer");
          localStorage.removeItem("is_admin");

          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          localStorage.setItem("isLoggedIn", true);

          if (user_role === "Employer") {
            localStorage.setItem("is_employer", "true");
            navigate("/jobs");
          } else if (user_role === "Employee") {
            localStorage.setItem("is_employee", "true");
            navigate("/findajob", { state: { fromLogin: true } });
          } else if (user_role === "Admin") {
            localStorage.setItem("is_admin", "true");
            navigate("/dashboard");
          } else {
            console.warn("Unknown job role:", user_role);
            setErrorMessage("Invalid user role");
          }

          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
  
          // Handle 403 error specifically
          if (error.response && error.response.status === 403) {
            const backendMessage = error.response.data.detail || JSON.stringify(error.response.data.error);
            console.log(error.response.data)
            setErrorMessage(backendMessage);
          } else {
            // Handle other errors
            console.error(error.response?.data);
            setUnauthorized(true);
            setErrorMessage("Invalid credentials");
          }
        });
    }
  };

  return (
    <div className="container-login">
      {loading && (
        <div className="full-page-spinner">
          <CircularProgress color="primary" size={50} />
        </div>
      )}

      <div className="container1">
        <div className="flex-item-login">
          <h3 style={{ color: "blue" }}>Able Jobs</h3>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={handleUname}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              className="password-input"
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="login-actions">
            <button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="links-container">
              <p className="link-item">
                <Link to="/register">Register</Link>
              </p>
              <p className="link-item" style={{ color: "blue" }}>|</p>
              <p className="link-item">
                <Link to="/forgetpassword">Forgot password?</Link>
              </p>
            </div>
          </div>
          {errorMessage && (
            <p style={{ color: "red", fontFamily: "serif" }}>{errorMessage}</p>
          )}
        </div>
        <div className="flex-item-login">
          <img src={mail} alt="Mail" className="imageDetails_login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
