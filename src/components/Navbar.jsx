import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-container">

          <Link to="/" className="nav-logo">
            <Coffee className="logo-icon" size={24} />
            <span className="logo-text">BLACK <span className="gold-text">ROAST</span></span>
          </Link>

          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="nav-controls">
            <Link to="/cart" className="nav-cart-btn" aria-label="Shopping Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge animate-fade-in">{cartCount}</span>}
            </Link>

            <button
              className="nav-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`nav-mobile-drawer ${isOpen ? 'open' : ''}`}>
          <div className="nav-mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-mobile-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart" className="nav-mobile-link nav-mobile-cart-link">
              <ShoppingBag size={18} />
              <span>Cart ({cartCount})</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
