// Lib
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/api";

// CSS
import "./Signup.css";

const Signup = ({ setUser, setSignupIsOpen, setLoginIsOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        // create a new User
        // axios.post(URL, data)
        "/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        // save token in cookies
        setUser(response.data.token);

        // Redirect user to home page
        navigate("/");
      } else {
        alert("An error has occurred. Please try again.");
      }
    } catch (error) {
      console.log("Signup Error => ", error.message);

      // error 409 => conflict
      console.log("Catch Error => ", error.response); //data: {message: 'This email already has an account'}
      if (error.response.status === 409) {
        setErrorMessage("This email already has an account");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <h2 className="title">Signup 🚀</h2>

        <form onSubmit={handleSignupSubmit} className="signup-form">
          <input
            value={username}
            type="text"
            required="required"
            placeholder="User name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <input
            value={email}
            type="email"
            required="required"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />

          <input
            value={password}
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
            Signup
          </button>
        </form>

        <p
          className="login-link"
          onClick={() => {
            // close Signup Modal
            setSignupIsOpen(false);
            // Open Login Modal
            setLoginIsOpen(true);
          }}
        >
          Already have an account ? Login 😉
        </p>
      </div>
    </div>
  );
};

export default Signup;
