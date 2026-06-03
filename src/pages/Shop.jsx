import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (categoryParam === 'All' || !categoryParam) {
      setSelectedCategory('All');
    }
  }, [searchParams, categories]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRoast('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const getFilteredProducts = () => {
    let result = [...products];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.tastingNotes.some((note) => note.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedRoast !== 'All') {
      if (selectedRoast === 'dark') {
        result = result.filter((p) => p.roastLevel >= 4);
      } else if (selectedRoast === 'medium') {
        result = result.filter((p) => p.roastLevel > 0 && p.roastLevel < 4);
      } else if (selectedRoast === 'gear') {
        result = result.filter((p) => p.roastLevel === 0);
      }
    }
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-overlay"></div>
        <div className="container shop-hero-container animate-fade-in">
          <h1 className="shop-hero-title">The Roastery Catalog</h1>
          <p className="shop-hero-desc">
            Explore our curated range of specialty coffees and premium brewing instruments.
          </p>
        </div>
      </section>

      <section className="section shop-main-section">
        <div className="container">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            selectedRoast={selectedRoast}
            setSelectedRoast={setSelectedRoast}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            roastLevels={[4, 5]}
          />

          <div className="shop-results-info">
            <p>Showing {filteredProducts.length} premium product{filteredProducts.length !== 1 ? 's' : ''}</p>
          </div>

          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </div>
      </section>
    </div>
  );
};

export default Shop;
