
import './WelcomeSection.css';

function WelcomeSection() {
  return (
    <div className="welcome-section">
      <div className="welcome-content">
        <h1>Welcome back, Sarah! 👋</h1>
        <p>You've been learning for 12 days straight! Keep up the great work!</p>
      </div>
      <div className="streak-card">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <div className="streak-number">12</div>
          <div className="streak-label">Day Streak</div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
