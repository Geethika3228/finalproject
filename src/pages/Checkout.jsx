import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

function Checkout() {

  const { cart, getTotal, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const shipping = 5.99;
  const tax = getTotal() * 0.08;
  const total = getTotal() + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.card) {
      alert("Please fill required fields");
      return;
    }

    clearCart();
    navigate("/success");
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT FORM */}
        <form className="checkout-form" onSubmit={handleSubmit}>

          <h2>Shipping Information</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            name="zip"
            placeholder="ZIP Code"
            onChange={handleChange}
          />

          <h2>Payment Information</h2>

          <input
            name="card"
            placeholder="Card Number"
            onChange={handleChange}
          />

          <div className="row">
            <input
              name="expiry"
              placeholder="MM/YY"
              onChange={handleChange}
            />
            <input
              name="cvc"
              placeholder="CVC"
              onChange={handleChange}
            />
          </div>

        </form>

        {/* RIGHT SUMMARY */}
        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map(item => (
            <div key={item.id} className="summary-row">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="place-btn"
            onClick={handleSubmit}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
