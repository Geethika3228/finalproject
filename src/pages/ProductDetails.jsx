import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="details-page">
      <img src={product.image} alt={product.title} />

      <h2>{product.title}</h2>

      <p className="category">
        Category: {product.category}
      </p>

      <p className="rating">
        ⭐ {product.rating?.rate} / 5  
        <br />
        ({product.rating?.count} reviews)
      </p>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <button onClick={() => addToCart(product)}>
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;