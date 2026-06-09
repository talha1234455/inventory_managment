export default function StatsCard({ icon, label, value, detail, color = "purple", className = "" }) {
  return (
    <div className={`stat-card ${color} slide-up ${className}`}>
      <div className="stat-card-header">
        <div className="stat-card-icon">{icon}</div>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      {detail && <div className="stat-card-detail">{detail}</div>}
    </div>
  );
}
