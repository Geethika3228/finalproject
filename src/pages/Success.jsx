import "../styles/success.css";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="success-page">
      <h1>Order Placed Successfully 🎉</h1>
      <p>Thank you for shopping with Cozy Crochet!</p>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Success;
