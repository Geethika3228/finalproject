import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/products.css";

function Products() {
  return (
    <div className="products-page">

      <section className="products-header">
        <h1>Our Products</h1>
        <p>
          Discover our collection of handmade crochet creations,
          each crafted with love and care
        </p>
      </section>

      <section className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

    </div>
  );
}

export default Products;
