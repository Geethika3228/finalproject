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
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Welcome to Cozy Crochet</h1>
          <p>
            Discover handmade treasures that bring warmth and charm to your life
          </p>

          <div className="hero-buttons">
            <Link to="/products">
              <button className="hero-btn primary">
                Shop Now
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
          icon="❤️"
          title="Handmade with Love"
          description="Every piece is carefully crafted by hand with attention to detail."
        />
        <FeatureCard
          icon="✨"
          title="Unique Designs"
          description="One-of-a-kind crochet creations that add character."
        />
        <FeatureCard
          icon="📦"
          title="Quality Materials"
          description="We use only the finest yarns for lasting beauty."
        />
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>Featured Creations</h2>
        <p>
          Explore our collection of handmade crochet items crafted with care.
        </p>
        <Link to="/products">
          <button className="hero-btn primary">
            View All Products
          </button>
        </Link>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Crochet Journey</h2>
        <p>
          Browse our collection and find the perfect handmade piece.
        </p>
        <Link to="/products">
          <button className="hero-btn primary">
            Explore Products
          </button>
        </Link>
      </section>

    </div>
  );
}

export default Home;
