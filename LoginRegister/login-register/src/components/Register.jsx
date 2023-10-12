import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios"


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  
  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        alert("Registeration Successful");
        navigate("/login");
      } else {
        setMessage(response.data);
      }
    } catch (err) {
      console.error("Error with request", err);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  
  return (
    <div className="form">
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Farhan"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="someone@example.com"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-login" onClick={handleSubmit}>
          Sign Up!
        </button>
        <p className="display-message">{message === "This email is already registered" ? message : ""}</p>
        <p>
          Do you have have an account? Log in here{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
