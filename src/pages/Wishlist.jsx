import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import "../styles/wishlist.css";
import { Link } from "react-router-dom";

function Wishlist() {

  const { wishlist } = useContext(ShopContext);

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <h1>Your Wishlist is Empty</h1>
        <p>Save your favorite items here so you can easily find them later!</p>
        <Link to="/products">
          <button>Browse Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>

      <div className="wishlist-grid">
        {wishlist.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
