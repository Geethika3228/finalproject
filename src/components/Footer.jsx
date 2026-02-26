import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div>
          <h3>Fineora</h3>
          <p>
            Multi-category product search and filter platform designed for speed and simplicity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <p><a href="/">Home</a></p>
          <p><a href="/about">About</a></p>
          <p><a href="/products">Products</a></p>
          <p><a href="/cart">Cart</a></p>
        </div>

        {/* Contact Section */}
        <div>
          <h4>Contact</h4>
          <p>Email: support@fineora.com</p>
          <p>GitHub: <a href="https://github.com/your-repo" target="_blank">github.com/your-repo</a></p>
        </div>
      </div>

      <p className="copyright">
        © 2026 Fineora
      </p>
    </footer>
  );
}

export default Footer;
