import InfoCard from "../components/InfoCard";
import "../styles/about.css";

function About() {
  return (
    <div className="about-page">

      {/* Page Header */}
      <section className="about-hero">
        <h1>About Cozy Crochet</h1>
        <p>
          Handcrafted with love, designed to bring warmth to your world
        </p>
      </section>

      {/* Content */}
      <section className="about-content">

        {/* Our Story */}
        <InfoCard icon="❤️" title="Our Story">
          <p>
            Welcome to Cozy Crochet, where every stitch tells a story.
            Founded with a passion for the timeless art of crochet,
            we create handmade treasures that bring comfort and joy.
          </p>
          <p>
            What started as a hobby blossomed into a labor of love.
            Each piece is thoughtfully designed and carefully crafted
            to ensure beauty and durability.
          </p>
        </InfoCard>

        {/* Materials */}
        <InfoCard icon="✂️" title="Materials & Craftsmanship">
          <p>
            Quality is at the heart of everything we create.
            We carefully select premium yarns in a variety of textures
            and colors to ensure each piece is soft and long-lasting.
          </p>
          <p>
            Every item is handcrafted using traditional crochet techniques
            passed down through generations.
          </p>
        </InfoCard>

        {/* Contact */}
        <InfoCard icon="✉️" title="Get in Touch">
          <p>
            We'd love to hear from you! Whether you have questions about
            our products or want to discuss a custom order, feel free to reach out.
          </p>
          <p><strong>Email:</strong> hello@cozycrochet.com</p>
          <p>
            <strong>Social Media:</strong> Follow us for updates and new creations!
          </p>
        </InfoCard>

      </section>

    </div>
  );
}

export default About;
