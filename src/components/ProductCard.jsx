import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../styles/productcard.css";

function ProductCard({ product }) {

  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useContext(ShopContext);

  const isLiked = wishlist.find(item => item.id === product.id);

  return (
    <div className="product-card">
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span 
          className={`wishlist ${isLiked ? "active" : ""}`}
          onClick={() =>
            isLiked
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
        >
          ❤️
        </span>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>${product.price.toFixed(2)}</h4>

        <button
          className="add-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductCard;
