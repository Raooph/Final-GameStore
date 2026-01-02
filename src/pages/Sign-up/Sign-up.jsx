import { Link } from "react-router-dom";
import "./Sign-up.css";
export const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join NEXUS and build your library</p>

        <form className="signup-form">
          <input
            type="text"
            placeholder="Username"
          />

          <input
            type="email"
            placeholder="Email address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm password"
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login"><span>Login</span></Link>
        </p>
      </div>
    </div>
  );
};
