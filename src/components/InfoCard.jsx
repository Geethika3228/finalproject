import "../styles/infocard.css";

function InfoCard({ icon, title, children }) {
  return (
    <div className="info-card">
      <div className="info-header">
        <span className="info-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="info-content">
        {children}
      </div>
    </div>
  );
}

export default InfoCard;
