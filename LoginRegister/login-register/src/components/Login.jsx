import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
      //Pass this always when trying to setup session using axios
      axios.defaults.withCredentials = true;

    function handleSubmit(e) {
        //Send email and password to the backend.
        e.preventDefault();
        loginUser();
    }
  
    const loginUser = async () => {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password
        });
        if (response.status === 200) {
          alert("Logged in");
          navigate("/dashboard");
          setMessage("");
        }
      } catch (err) {
        console.error("Error logging in", err);
        setMessage("Invalid credentials!");
      } finally {
        // Clear input fields
        setEmail("");
        setPassword("");
      }
    };
    
  return (
    <>
        <div className="form">
          <h1>Login</h1>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="someone@example.com"
                className="form-control"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-login" onClick={handleSubmit}>
              Login
            </button>
            <p className="display-message">{message }</p>
            <p>
              Do you have have an account? Create one here{" "}
              <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
    </>
  );
}

export default Login;
