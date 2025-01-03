import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const AdminDashboard = lazy(
  () => import("./pages/Admin/AdminDashboard/AdminDashboard")
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Dashboard />} requiredRole="User" />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminDashboard />} requiredRole="Admin" />
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
