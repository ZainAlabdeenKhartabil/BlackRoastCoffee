import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, Heart, Flame, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    setQty(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container section text-center error-page animate-fade-in">
        <ShieldAlert size={64} className="gold-text" style={{ marginBottom: '1.5rem' }} />
        <h2>Roast Profile Not Found</h2>
        <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
          The specialty product you are looking for does not exist in our vaults.
        </p>
        <Link to="/shop">
          <Button variant="primary">Return to Roastery Shop</Button>
        </Link>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;
  const availableStock = product.stock - qtyInCart;
  const isOutOfStock = product.stock === 0;

  const handleIncrement = () => {
    if (qty < availableStock) {
      setQty((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setQty(1);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category !== 'Brew Gear'))
    .slice(0, 3);

  return (
    <div className="product-details-page">
      <div className="container details-back-link-container">
        <button onClick={() => navigate(-1)} className="back-link-btn">
          <ArrowLeft size={16} />
          <span>Back to products</span>
        </button>
      </div>

      <section className="section details-section">
        <div className="container details-grid">
          <div className="details-image-container animate-fade-in">
            <div className="img-wrapper details-image-wrapper">
              <img src={product.image} alt={product.name} />
              {isOutOfStock && <div className="out-of-stock-overlay large">Sold Out</div>}
            </div>
          </div>

          <div className="details-info-container animate-fade-in">
            <span className="details-category">{product.category}</span>
            <h1 className="details-title">{product.name}</h1>

            <div className="details-rating-price">
              <div className="details-stars">
                <div className="stars-container">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'var(--gold-secondary)' : 'transparent'}
                      stroke="var(--gold-secondary)"
                    />
                  ))}
                </div>
                <span className="reviews-count">({product.reviewsCount} reviews)</span>
              </div>
              <span className="details-price">${product.price.toFixed(2)}</span>
            </div>

            <p className="details-tagline">{product.tagline}</p>

            {product.roastLevel > 0 && (
              <div className="details-roast-level">
                <span className="details-label">Roast Profile</span>
                <div className="roast-meter-wrapper">
                  <div className="roast-meter">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`roast-dot ${dot <= product.roastLevel ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="roast-desc">
                    {product.roastLevel === 5 ? 'Dark Roast (Intense & Smoky)' : 'Medium-Dark Roast (Bold & Chocolatey)'}
                  </span>
                </div>
              </div>
            )}

            <div className="details-tasting-notes">
              <span className="details-label">Taste Markers</span>
              <div className="notes-pills">
                {product.tastingNotes.map((note) => (
                  <span key={note} className="note-pill">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <p className="details-description">{product.description}</p>

            <div className="details-specs-box">
              <div className="spec-row">
                <span className="spec-label">Origin</span>
                <span className="spec-val">{product.origin}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Processing</span>
                <span className="spec-val">{product.process}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Brewing Recommendation</span>
                <span className="spec-val">{product.brewMethod}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Vault Availability</span>
                <span className={`spec-val ${availableStock > 0 ? 'text-success' : 'text-danger'}`}>
                  {isOutOfStock
                    ? 'Out of Stock'
                    : availableStock <= 0
                      ? 'All stock is in your cart'
                      : `${product.stock} bags available (${availableStock} remaining to add)`}
                </span>
              </div>
            </div>

            {!isOutOfStock && availableStock > 0 && (
              <div className="details-actions">
                <div className="qty-selector-wrapper">
                  <span className="details-label">Quantity</span>
                  <div className="qty-picker">
                    <button onClick={handleDecrement} className="qty-btn" disabled={qty <= 1}>
                      -
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button onClick={handleIncrement} className="qty-btn" disabled={qty >= availableStock}>
                      +
                    </button>
                  </div>
                </div>

                <div className="add-to-cart-btns">
                  <Button variant="primary" onClick={handleAddToCart} className="btn-details-add">
                    <ShoppingBag size={16} />
                    <span>Acquire Bean Bag</span>
                  </Button>

                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`wishlist-toggle-btn ${isWishlist ? 'active' : ''}`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} fill={isWishlist ? 'var(--gold-secondary)' : 'transparent'} />
                  </button>
                </div>
              </div>
            )}

            {isOutOfStock && (
              <div className="out-of-stock-notice">
                <p>This micro-lot is temporarily depleted. Subscribe to our newsletter to receive notification when the next batch is roasted and restocked.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section related-products-section bg-secondary">
          <div className="container">
            <div className="section-header">
              <span className="subtitle">Suggested Pairings</span>
              <h2 className="title">Complementary Selections</h2>
            </div>
            <div className="featured-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
