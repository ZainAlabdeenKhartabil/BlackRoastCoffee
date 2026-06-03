import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedRoast,
  setSelectedRoast,
  sortBy,
  setSortBy,
  categories,
  roastLevels
}) => {
  return (
    <div className="search-filter-panel">

      <div className="search-box-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search Obsidian, Eclipse, Espresso, Gear..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="category-select">Collection</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Products</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="roast-select">Roast Intensity</label>
          <select
            id="roast-select"
            value={selectedRoast}
            onChange={(e) => setSelectedRoast(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Roasts</option>
            <option value="dark">Dark Only (4 - 5)</option>
            <option value="medium">Medium Only (3 - 4)</option>
            <option value="gear">Brew Gear / None</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select">Sort By</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
