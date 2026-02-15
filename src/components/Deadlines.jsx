import './Deadlines.css';

function Deadlines() {
  const deadlines = [
    { title: 'React Quiz - Chapter 5', course: 'React Fundamentals', dueDate: 'Feb 18, 2026', priority: 'high' },
    { title: 'Final Project Submission', course: 'Web Development', dueDate: 'Feb 22, 2026', priority: 'high' },
    { title: 'CSS Grid Assignment', course: 'CSS Advanced', dueDate: 'Feb 25, 2026', priority: 'medium' },
    { title: 'JavaScript Practice Quiz', course: 'JS Mastery', dueDate: 'Mar 1, 2026', priority: 'low' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff006e';
      case 'medium': return '#ff1493';
      case 'low': return '#39ff14';
      default: return '#00d9ff';
    }
  };

  return (
    <div className="deadlines-section">
      <h2 className="section-title">Upcoming Deadlines</h2>
      <div className="deadlines-list">
        {deadlines.map((deadline, index) => (
          <div key={index} className="deadline-item">
            <div
              className="deadline-priority"
              style={{ background: getPriorityColor(deadline.priority) }}
            ></div>
            <div className="deadline-content">
              <h3 className="deadline-title">{deadline.title}</h3>
              <p className="deadline-course">{deadline.course}</p>
            </div>
            <div className="deadline-date">
              <span className="date-icon">📅</span>
              <span>{deadline.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deadlines;