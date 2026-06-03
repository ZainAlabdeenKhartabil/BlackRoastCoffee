import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Button from './Button';

const HeroSection = () => {
  return (
    <header className="hero-section">
      <div className="hero-background-overlay"></div>
      
      <div className="hero-bg-image"></div>

      <div className="container hero-container animate-fade-in">
        <span className="hero-subtitle">Premium Specialty Dark Roast</span>
        
        <h1 className="hero-title">
          EXQUISITE COFFEE <br />
          <span className="gold-text">FOR THE BOLD</span>
        </h1>
        
        <p className="hero-description">
          We source high-altitude volcanic beans and slow-roast them in small batches. Indulge in an intensely rich, smooth, and velvety cup with complex caramelized notes.
        </p>

        <div className="hero-actions">
          <Link to="/shop">
            <Button variant="primary">
              <span>Shop Collection</span>
              <ChevronRight size={16} />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline">
              <span>Our Legacy</span>
            </Button>
          </Link>
        </div>

        <div className="hero-highlights">
          <div className="hero-highlight-item">
            <span className="highlight-num">100%</span>
            <span className="highlight-txt">Organic Arabica</span>
          </div>
          <div className="hero-highlight-item">
            <span className="highlight-num">1800m</span>
            <span className="highlight-txt">Volcanic Altitude</span>
          </div>
          <div className="hero-highlight-item">
            <span className="highlight-num">Small</span>
            <span className="highlight-txt">Batch Roasted</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
