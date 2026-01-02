import { Link } from "react-router-dom";
import "./Login.css";
export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to your NEXUS account</p>

        <form className="login-form">
          <input
            type="email"
            placeholder="Email address"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/sign-up"><span>Sign up</span></Link>
        </p>
      </div>
    </div>
  );
};
