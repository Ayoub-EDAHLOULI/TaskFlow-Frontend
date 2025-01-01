import "./Login.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  username: string;
  password: string;
}

function Login() {
  const [data, setData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setData({
      ...data,
      [id]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);

    // Send data to the server
    try {
      const response = await fetch("http://localhost:5174/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Store token in local storage
        localStorage.setItem("token", result.token);

        // Reset form after submitting
        setData({
          username: "",
          password: "",
        });

        // Show success message
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
        });

        // Redirect to dashboard
        window.location.href = "/";
      } else {
        // Show error message
        toast.error(result.message || "Invalid credentials", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Show error message
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={handleFormSubmit}>
          <div className="login__form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="login__form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="login__form-button">
            Login
          </button>

          <p className="login__form-text">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
