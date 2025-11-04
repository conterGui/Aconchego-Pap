import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAdminLogged = localStorage.getItem("isAdminLogged") === "true";

  if (!isAdminLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
