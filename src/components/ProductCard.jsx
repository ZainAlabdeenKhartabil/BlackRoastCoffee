import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  const renderRoastLevel = (level) => {
    if (level === 0) return null;
    return (
      <div className="roast-container">
        <span className="roast-label">Roast:</span>
        <div className="roast-meter">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`roast-dot ${dot <= level ? 'filled' : ''}`}
              title={`Roast level ${level} out of 5`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-img-link">
        <div className="img-wrapper card-img-height">
          <img src={product.image} alt={product.name} loading="lazy" />
          {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        </div>
      </Link>

      <div className="product-card-content">
        <div className="product-card-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star className="star-icon" size={14} fill="var(--gold-secondary)" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {renderRoastLevel(product.roastLevel)}

        <p className="product-tagline">{product.tagline}</p>

        <div className="product-card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <Button
            variant="gold-outline"
            className="card-add-btn"
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
