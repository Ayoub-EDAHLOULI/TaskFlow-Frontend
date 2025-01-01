import "./Login.scss";

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <form className="login__form">
          <div className="login__form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="login__form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
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
