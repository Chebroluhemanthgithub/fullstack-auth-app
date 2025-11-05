import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth"); // JWT stored in localStorage
  if (!auth) return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  return children; // Otherwise, render child component
}
