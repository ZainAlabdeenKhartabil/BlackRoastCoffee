import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldAlert, Sparkles, Coffee } from 'lucide-react';
import Button from '../components/Button';

const About = () => {
  const steps = [
    {
      number: "01",
      title: "Direct Sourcing",
      desc: "We travel directly to volcanic coffee estates. By bypasssing traditional import brokers, we pay growers 50-80% above standard trading premiums and secure the cream of each harvest."
    },
    {
      number: "02",
      title: "Slow Drum Roasting",
      desc: "Our master roasters reject digital presets. We roast on a vintage cast-iron drum roaster, relying on sensory markers—color shifting to mahogany, the distinct second crack sound, and deep molasses aromas."
    },
    {
      number: "03",
      title: "Nitrogen Vault Sealing",
      desc: "Oxygen is the enemy of roasted coffee. We flush our premium matte black pouches with nitrogen gas to displace oxygen, immediately locking in delicate aroma molecules for up to 6 months."
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-container animate-fade-in">
          <h1 className="about-hero-title">Our Legacy</h1>
          <p className="about-hero-desc">Crafting premium, low-acid, intense dark roasts since 2012.</p>
        </div>
      </section>

      <section className="section story-section">
        <div className="container story-grid">
          <div className="story-image-container img-wrapper animate-fade-in">
            <img src="/BlackRoastCoffee/coffee/coffee4.jpg" alt="Coffee beans roasting" />
          </div>

          <div className="story-content animate-fade-in">
            <span className="story-badge"><Coffee size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Heritage</span>
            <h2 className="story-title">Born in the Dark</h2>
            <p className="story-paragraph">
              Black Roast Coffee was born out of frustration. Our founders, veterans of the specialty coffee movement, noticed a troubling trend: dark roasts were being neglected by gourmet roasters, while mass-market dark roasts tasted like ash, charcoal, and bitterness.
            </p>
            <p className="story-paragraph">
              We set out to prove that dark roasting is a high art form. By choosing exceptionally dense beans (grown at elevations above 1,500 meters) and roasting them slowly at slightly lower temperatures, we caramelize the sugars fully without burning the cellulose structure. The result is a cup with heavy, satisfying density, rich chocolatey notes, and a silk-like texture.
            </p>
            <p className="story-paragraph">
              Today, we roast in small batches from our lounge in downtown Seattle, supplying premium coffee to decerning individuals worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Roasting Process Steps */}
      <section className="section process-section bg-secondary">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Bean to Cup</span>
            <h2 className="title">Our Roasting Ritual</h2>
          </div>

          <div className="process-timeline">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step animate-fade-in">
                <div className="step-number-container">
                  <span className="step-num gold-text">{step.number}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="about-cta-section">
        <div className="cta-overlay"></div>
        <div className="container cta-container animate-fade-in">
          <h2>Experience the Difference</h2>
          <p>Elevate your coffee brewing ritual. Explore our single-origins and signature blends today.</p>
          <Link to="/shop">
            <Button variant="primary">Shop Roasts Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
