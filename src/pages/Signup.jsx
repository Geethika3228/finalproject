import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/productservice/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.code === 200) {
        alert("Account created successfully 🎉");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source
          src={`${import.meta.env.BASE_URL}hero.mp4`}
          type="video/mp4"
        />
      </video>

      <div className="login-card">
        <h1>Create Account</h1>
        <p>Join our handmade store ✨</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Sign Up
          </button>
        </form>

        <p className="forgot-password">
          <Link to="/login">
            Already have an account?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;