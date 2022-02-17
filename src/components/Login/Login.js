// Lib
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../config/api";

// CSS
import "./Login.css";

const Login = ({ setUser, setSignupIsOpen, setLoginIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      // Find a User
      // axios.post(URL, data)
      const response = await axios.post("/user/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        // save token in cookies
        setUser(response.data.token);

        // Redirect user to home page
        const target_url = query.get("target_url");
        if (target_url != null) {
          navigate(target_url);
        } else {
          navigate("/");
        }
        setLoginIsOpen(false);
      } else {
        alert("An error has occurred. Please try again.");
      }
    } catch (error) {
      console.log("Login Error => ", error.message);

      // error 400 => login with wrong email <=> data.message: "User not found"
      // error 401 => login with wrong password <=> data.error: "Unauthorized"
      console.log("Catch Error => ", error.response);

      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Invalid email address or password");
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2 className="title">Login 🚀</h2>

        <form onSubmit={handleLoginSubmit} className="login-form">
          <input
            type="email"
            required="required"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />

          <input
            type="password"
            required="required"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <p
          className="signup-link"
          onClick={() => {
            // Close Login Modal
            setLoginIsOpen(false);
            // Open Signup Modal
            setSignupIsOpen(true);
          }}
        >
          No account yet? Register yourself ! ✌️
        </p>
      </div>
    </div>
  );
};

export default Login;
