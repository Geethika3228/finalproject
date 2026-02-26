import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(ShopContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}