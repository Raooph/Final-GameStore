import "./Header.css";
import { NavLink} from "react-router-dom";
export const Header = () => {
    return (
     <header>
        <div className="container">
          <div className="header-content">
            <NavLink to="/" className="logo">NEXUS</NavLink>
            <nav>
              <NavLink to="/"></NavLink>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/my-library">My Library</NavLink>
            </nav>
          </div>
        </div>
      </header>
    )
}