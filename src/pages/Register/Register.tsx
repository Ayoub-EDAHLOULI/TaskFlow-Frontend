import "./Register.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterData {
  username: string;
  password: string;
}

function Register() {
  const [data, setData] = useState<RegisterData>({
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

    try {
      // Send data to the server
      const response = await fetch("http://localhost:5174/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Show success message
        toast.success("Registration successful", {
          position: "top-right",
          autoClose: 3000,
        });

        // Reset form after submitting
        setData({
          username: "",
          password: "",
        });

        // Redirect to login page
        window.location.href = "/login";
      } else {
        // Show error message
        toast.error(result.message || "Registration failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);

      // Show error message
      toast.error("Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="register">
      <div className="register__container">
        <h1 className="register__title">Register</h1>
        <form className="register__form" onSubmit={handleFormSubmit}>
          <div className="register__form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="register__form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="register__form-button">
            Register
          </button>

          <p className="register__form-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
