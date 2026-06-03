import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Flame, Award, Quote, ArrowRight, Star } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.category !== 'Brew Gear').slice(0, 3);

  const brandValues = [
    {
      icon: Award,
      title: "Rare Micro-Lots",
      desc: "We source single-origin specialty coffees that rank in the top 1% of international cup scores."
    },
    {
      icon: Flame,
      title: "Artisanal Roasting",
      desc: "Our roasters roast manually in small batches to customize chemical development for every bean."
    },
    {
      icon: ShieldCheck,
      title: "Direct Trade Partnership",
      desc: "We pay double the Fair Trade minimum price directly to farmers to ensure sustainable growth."
    }
  ];

  const testimonials = [
    {
      name: "Justin Espresso",
      role: "The Espresso Patronum",
      rating: 5,
      comment: "Obsidian Signature Roast is absolute perfection. It possesses the heavy body I desire without the burnt, bitter notes of typical commercial dark roasts. Complex, smooth, and deeply satisfying."
    },
    {
      name: "Bean Counter",
      role: "The Roast Rider",
      rating: 5,
      comment: "Eclipse Espresso extracts beautifully. The crema is rich, golden, and thick, while the taste notes of black cherry and dark chocolate shine cleanly through milk drinks. Highly recommended."
    },
    {
      name: "Dr. Mo Ka",
      role: "Coffee Enthusiast",
      rating: 5,
      comment: "The double-walled Luxor gold-rimmed cups are a work of art. Combined with the Panama Geisha, my morning ritual has become a true luxury experience. Exceptional customer service."
    }
  ];

  return (
    <div className="home-page">
      <HeroSection />

      <section className="section values-section bg-secondary">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">The Art of Extraction</span>
            <h2 className="title">Crafted Without Compromise</h2>
          </div>

          <div className="values-grid">
            {brandValues.map((value, idx) => {
              const IconComp = value.icon;
              return (
                <div key={idx} className="value-card animate-fade-in">
                  <div className="value-icon-wrapper">
                    <IconComp className="value-icon" size={28} />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Curated Selection</span>
            <h2 className="title">Signature Dark Roasts</h2>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="featured-cta-wrapper text-center">
            <Link to="/shop">
              <Button variant="gold-outline">
                <span>View Full Catalog</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-background-overlay"></div>
        <div className="container promo-container">
          <div className="promo-content animate-fade-in">
            <span className="promo-tag">LIMITED RESERVE</span>
            <h2 className="promo-title">Gold Label Panama Geisha</h2>
            <p className="promo-desc">
              Experience the world's most sought-after coffee variety. Sourced from the volcanic soils of Boquete, Panama, our honey-processed Geisha is slow-roasted to bring out rich tones of fig, honey, and bergamot. Only 5 bags left.
            </p>
            <Link to="/product/gold-label-reserve">
              <Button variant="primary">
                Acquire Micro-lot
              </Button>
            </Link>
          </div>
          <div className="promo-image-wrapper">
            <img src="/BlackRoastCoffee/coffee/coffee6.jpg" alt="Panama Geisha Bag" />
          </div>
        </div>
      </section>

      <section className="section testimonials-section bg-secondary">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Client Experiences</span>
            <h2 className="title">Refining the Ritual</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card">
                <Quote className="quote-icon" size={24} />
                <div className="testimonial-stars">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--gold-secondary)" stroke="var(--gold-secondary)" />
                  ))}
                </div>
                <p className="testimonial-text">"{test.comment}"</p>
                <div className="testimonial-author">
                  <h4 className="author-name">{test.name}</h4>
                  <span className="author-role">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
