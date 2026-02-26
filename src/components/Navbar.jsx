import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../styles/navbar.css";

function Navbar() {
  const { wishlist, cart, user } = useContext(ShopContext); // 👈 added user

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="KG Logo" />
          <span className="brand-name">FindOra</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </div>

      <div className="icons">
        {/* 👈 Show username if logged in */}
        {user ? (
          <span className="greeting">Hi!! {user}</span>
        ) : (
          <Link to="/login" className="icon-link">Login</Link>
        )}

        <Link to="/wishlist" className="icon-link">
          ❤️ <span>{wishlist.length}</span>
        </Link>

        <Link to="/cart" className="icon-link">
          🛒 <span>{cart.length}</span>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;