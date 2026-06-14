import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    1: "Crochet",
    2: "Teddy Bears",
    3: "Keychains",
    4: "Unique Gifts",
    5: "Accessories"
  };

  useEffect(() => {
    fetch("http://localhost:8000/productservice/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSemanticSearch = async (query) => {
    setSearch(query);

    if (query.trim() === "") {
      setProducts(allProducts);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/semantic-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        }
      );

      const data = await response.json();

      const semanticProducts = data.map(
        (item) => item.product
      );

      setProducts(semanticProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((p) => p.categoryId)
      )
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category !== "") {
      filtered = filtered.filter(
        (p) =>
          p.categoryId.toString() === category
      );
    }

    if (sortOrder === "low") {
      filtered.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOrder === "high") {
      filtered.sort(
        (a, b) => b.price - a.price
      );
    }

    return filtered;
  }, [products, category, sortOrder]);

  return (
    <div className="products-page">
      <h1>Our Handmade Products</h1>

      <p>
        Search and filter across multiple
        categories
      </p>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Semantic Search..."
          value={search}
          onChange={(e) =>
            handleSemanticSearch(
              e.target.value
            )
          }
        />

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>
        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {categoryMap[cat]}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px"
          }}
        >
          Loading Products...
        </h2>
      ) : (
        <section className="products-grid">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </section>
      )}
    </div>
  );
}

export default Products;