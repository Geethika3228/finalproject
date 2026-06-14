import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "../styles/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    setUser,
    setToken
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8000/productservice/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (data.code === 200) {

        setToken(data.token);

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "role",
          data.role
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setUser(data.user);

        if (data.role === 2) {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Backend connection failed");

    }
  };

  return (
    <div className="login-page">

      <video
        autoPlay
        muted
        loop
        className="bg-video"
      >
        <source
          src={`${import.meta.env.BASE_URL}hero.mp4`}
          type="video/mp4"
        />
      </video>

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>
          Enter your credentials to login
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="forgot-password">
          <Link to="/signup">
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;