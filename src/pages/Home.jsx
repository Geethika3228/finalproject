import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Welcome to Findora</h1>
          <p>
            Discover, search, and filter products across multiple categories with ease.
          </p>

          <div className="hero-buttons">
            <Link to="/products">
              <button className="hero-btn primary">
                Explore Products
              </button>
            </Link>

            <Link to="/about">
              <button className="hero-btn secondary">
                Learn More
              </button>
            </Link>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="features">
        <FeatureCard
          icon="🔍"
          title="Advanced Search"
          description="Find exactly what you need with intelligent search and filtering."
        />
        <FeatureCard
          icon="📂"
          title="Multiple Categories"
          description="Easily browse products organized across diverse categories."
        />
        <FeatureCard
          icon="⚡"
          title="Fast & Responsive"
          description="Optimized for performance with instant filtering and smooth UI."
        />
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>Highlighted Products</h2>
        <p>
          Check out our top products across different categories curated just for you.
        </p>
        <Link to="/products">
          <button className="hero-btn primary">
            View All Products
          </button>
        </Link>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Get Started with Findora</h2>
        <p>
          Start exploring the platform now and find products efficiently.
        </p>
        <Link to="/products">
          <button className="hero-btn primary">
            Browse Products
          </button>
        </Link>
      </section>

    </div>
  );
}

export default Home;