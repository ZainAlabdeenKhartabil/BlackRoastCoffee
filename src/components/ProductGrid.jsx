import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="empty-grid-state animate-fade-in">
        <h3 className="empty-title">No Roasts Found</h3>
        <p className="empty-desc">We couldn't find any coffee or gear matching your selection. Try adjusting your filters or search terms.</p>
        {onResetFilters && (
          <button className="btn btn-gold-outline" onClick={onResetFilters}>
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid animate-fade-in">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
