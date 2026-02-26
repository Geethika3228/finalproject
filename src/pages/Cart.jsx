import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../styles/cart.css";
import { Link } from "react-router-dom";

function Cart() {

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal
  } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <Link to="/products">
          <button>Browse Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      <div className="cart-container">

        {/* LEFT */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">

              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4>{item.price.toFixed(2)}</h4>
              </div>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <span
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                🗑
              </span>

            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{getTotal().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>{getTotal().toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;
