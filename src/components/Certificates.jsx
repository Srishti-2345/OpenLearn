import './Certificates.css';

function Certificates() {
  const certificates = [
    { course: 'React Fundamentals', date: 'Jan 15, 2026', id: 'CERT-001' },
    { course: 'JavaScript Mastery', date: 'Dec 20, 2025', id: 'CERT-002' },
    { course: 'CSS Advanced Techniques', date: 'Nov 10, 2025', id: 'CERT-003' }
  ];

  return (
    <div className="certificates-section">
      <h2 className="section-title">My Certificates</h2>
      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="certificate-card">
            <div className="certificate-icon">🎓</div>
            <div className="certificate-info">
              <h3 className="certificate-course">{cert.course}</h3>
              <p className="certificate-date">Completed: {cert.date}</p>
              <p className="certificate-id">ID: {cert.id}</p>
            </div>
            <button className="download-button">Download ⬇</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;
