import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../styles/productcard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const { wishlist, addToWishlist, removeFromWishlist, addToCart } =
    useContext(ShopContext);

  const isLiked = wishlist.some(item => item.id === product.id);

  const toggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">

      <div className="product-image">
        <img src={product.image} alt={product.title} />

        <span
          className={`wishlist-icon ${isLiked ? "active" : ""}`}
          onClick={toggleWishlist}
        >
          {isLiked ? "❤️" : "🤍"}
        </span>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="category">
          Category: {product.category}
        </p>

        <p>{product.description.substring(0, 60)}...</p>

        <h4>₹{product.price}</h4>

        <p className="rating">
          ⭐ {product.rating?.rate} / 5
          <br />
          ({product.rating?.count} reviews)
        </p>

        <button
          className="add-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>

        <Link to={`/product/${product.id}`} className="details-link">
          View Details →
        </Link>
      </div>

    </div>
  );
}

export default ProductCard;