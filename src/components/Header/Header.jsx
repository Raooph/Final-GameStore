import { useState } from "react";
import "./Header.css";
import { IoMenu, IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
            <NavLink to="/" className="logo">NEXUS</NavLink>
          
          <nav className="nav">
              <NavLink to="/"></NavLink>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/my-library">My Library</NavLink>
          </nav>

          <div className="menu-icon" onClick={handleMenuClick}>
            {menuOpen ? <IoClose /> : <IoMenu />}
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            <a href="/" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">01</span>
              <span className="link-text">Home</span>
              <span className="arrow">→</span>
            </a>
            
            <a href="/wishlist" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">02</span>
              <span className="link-text">Wishlist</span>
              <span className="arrow">→</span>
            </a>
            
            <a href="/library" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">03</span>
              <span className="link-text">My Library</span>
              <span className="arrow">→</span>
            </a>

          </div>
        </div>

        {menuOpen && (
          <div className="backdrop" onClick={closeMenu}></div>
        )}
      </div>
    </header>
  );
};