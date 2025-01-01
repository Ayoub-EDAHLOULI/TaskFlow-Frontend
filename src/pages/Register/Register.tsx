import "./Register.scss";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <h1 className="register__title">Register</h1>
        <form className="register__form">
          <div className="register__form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="register__form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
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
