import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>Cozy Crochet</h3>
          <p>Handmade crochet creations crafted with love and care.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>About</p>
          <p>Shop</p>
          <p>Cart</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: hello@cozycrochet.com</p>
        </div>
      </div>

      <p className="copyright">
        © 2026 Cozy Crochet
      </p>
    </footer>
  );
}

export default Footer;
