import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element,
  requiredRole,
}: {
  element: JSX.Element;
  requiredRole?: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  // Extract role using the exact claim key
  const userRole =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  console.log("decodedToken", decodedToken);
  console.log("userRole", userRole);

  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
