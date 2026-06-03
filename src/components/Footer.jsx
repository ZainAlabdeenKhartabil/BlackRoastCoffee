import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { showNotification } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showNotification(`Thank you! ${email} has been subscribed to our newsletter.`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-section brand">
          <Link to="/" className="footer-logo">
            <Coffee className="logo-icon" size={24} />
            <span className="logo-text">BLACK <span className="gold-text">ROAST</span></span>
          </Link>
          <p className="footer-desc">
            We are curators of premium, slow-roasted dark coffee. Sourced ethically from high-altitude volcanic estates, our beans are roasted to mahogany perfection for a rich, low-acid, velvety cup.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        
        <div className="footer-section links">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop Coffee</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Lounge</Link></li>
          </ul>
        </div>

        
        <div className="footer-section links">
          <h4 className="footer-title">Collections</h4>
          <ul className="footer-links">
            <li><Link to="/shop?category=Signature Blends">Signature Blends</Link></li>
            <li><Link to="/shop?category=Single Origin">Single Origin</Link></li>
            <li><Link to="/shop?category=Limited Reserve">Limited Reserve</Link></li>
            <li><Link to="/shop?category=Brew Gear">Brewing Gear</Link></li>
          </ul>
        </div>

       
        <div className="footer-section newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p className="newsletter-text">Subscribe to receive exclusive access to rare micro-lot releases, roasting schedules, and brewing tips.</p>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">&copy; {new Date().getFullYear()} Black Roast Coffee. All rights reserved.</p>
          <p className="designer">Luxury Specialty Roasters</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
