import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 GET UNIQUE CATEGORIES (Dynamic)
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // 🔥 FILTER + SORT (Derived State)
  const filteredProducts = useMemo(() => {

    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    // ✅ Filter by category
    if (category !== "") {
      filtered = filtered.filter(p => p.category === category);
    }

    // ✅ Sort by price
    if (sortOrder === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    // ⭐ Sort by rating (High → Low)
    if (sortOrder === "ratingHigh") {
      filtered = [...filtered].sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    }

    // ⭐ Sort by rating (Low → High)
    if (sortOrder === "ratingLow") {
      filtered = [...filtered].sort(
        (a, b) => a.rating.rate - b.rating.rate
      );
    }

    return filtered;

  }, [products, search, sortOrder, category]);

  return (
    <div className="products-page">

      <section className="products-header">
        <h1>Our Products</h1>
        <p>Search and filter across multiple categories</p>
      </section>

      {/* 🔥 FILTER BAR */}
      <div className="filter-bar">

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔽 SORT */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="ratingHigh">Rating High → Low</option>
          <option value="ratingLow">Rating Low → High</option>
        </select>

        {/* 🏷 CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading Products...
        </h2>
      ) : (
        <section className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

    </div>
  );
}

export default Products;