import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = email.split("@")[0];
setUser(username);
    navigate("/home");
  };

  return (
    <div className="login-page">

      {/* 🎥 Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
      </video>

      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to login</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
}

export default Login;