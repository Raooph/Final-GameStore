import { useEffect, useState } from "react";
import "./Header.css";
import { IoMenu, IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [libraryCount, setLibraryCount] = useState(0);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const updateCounts = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const library = JSON.parse(localStorage.getItem("library")) || [];
    setWishlistCount(wishlist.length);
    setLibraryCount(library.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <NavLink to="/" className="logo">NEXUS</NavLink>

          <nav className="nav">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/wishlist" className="nav-badge-link">
              Wishlist
              {wishlistCount > 0 && (
                <span className="counter">{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink to="/my-library" className="nav-badge-link">
              My Library
              {libraryCount > 0 && (
                <span className="counter">{libraryCount}</span>
              )}
            </NavLink>

            <NavLink to="/login">Log in</NavLink>
          </nav>

          <div className="menu-icon" onClick={handleMenuClick}>
            {menuOpen ? <IoClose /> : <IoMenu />}
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu-content">
            <a href="/" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">01</span>
              <span className="link-text">Home</span>
              <span className="arrow">→</span>
            </a>

            <a href="/wishlist" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">02</span>
              <span className="link-text">
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </span>
              <span className="arrow">→</span>
            </a>

            <a href="/my-library" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">03</span>
              <span className="link-text">
                My Library {libraryCount > 0 && `(${libraryCount})`}
              </span>
              <span className="arrow">→</span>
            </a>

            <a href="/login" className="mobile-nav-link" onClick={closeMenu}>
              <span className="link-number">04</span>
              <span className="link-text">Login</span>
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
