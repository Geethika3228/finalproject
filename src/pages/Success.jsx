import { useEffect, useState } from "react";

function Success() {
  const [message, setMessage] = useState("");
  const [orderTotal, setOrderTotal] = useState("");

  useEffect(() => {
    const savedMessage = localStorage.getItem("orderStatus");
    const savedTotal = localStorage.getItem("lastOrderTotal");

    if (savedMessage) {
      setMessage(savedMessage);
      setOrderTotal(savedTotal);

      // Remove after showing once
      localStorage.removeItem("orderStatus");
      localStorage.removeItem("lastOrderTotal");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message} 🎉</h1>
      {orderTotal && <h3>Total Paid: {orderTotal}</h3>}
    </div>
  );
}

export default Success;