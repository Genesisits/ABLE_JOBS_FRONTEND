
import "./jobdetails.css";

const formatSalary = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? `₹${n.toLocaleString("en-IN")}` : value ? `₹${value}` : "";
};

const splitSkills = (skills) =>
  (Array.isArray(skills) ? skills : String(skills || "").split(","))
    .map((s) => s.trim())
    .filter(Boolean);

const INFO_ITEMS = [
  { icon: "fa-briefcase", label: "Experience Required", key: "experience_required" },
  { icon: "fa-graduation-cap", label: "Qualification", key: "qualification_required" },
  { icon: "fa-users", label: "Number Of Positions", key: "number_of_positions" },
  { icon: "fa-wheelchair", label: "Disability Eligible", key: "disability_eligible" },
];

export default function JobDetails({ job, onApply }) {
  if (!job) {
    return (
      <div className="jd jd-empty">
        <p>Select a job to view details</p>
      </div>
    );
  }

  const skills = splitSkills(job.skills);
  const salary = formatSalary(job.salary_offered);

  return (
    <article className="jd">
      <header className="jd-header">
        <h2 className="jd-title">{job.job_title}</h2>
        <p className="jd-meta">
          <span>
            <i className="fas fa-building" aria-hidden="true" />
            {job.company_name}
          </span>
          <span>
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
            {job.location}, {job.state}
          </span>
        </p>
      </header>

      <ul className="jd-chips">
        {job.employment_type && <li className="jd-chip jd-chip--primary">{job.employment_type}</li>}
        {salary && <li className="jd-chip jd-chip--primary">{salary}</li>}
        {skills.map((skill, i) => (
          <li className="jd-chip jd-chip--skill" key={`${skill}-${i}`}>
            {skill}
          </li>
        ))}
      </ul>

      <section className="jd-description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </section>

      <dl className="jd-info">
        {INFO_ITEMS.map(({ icon, label, key }) => (
          <div className="jd-info-item" key={key}>
            <i className={`fas ${icon}`} aria-hidden="true" />
            <div>
              <dt>{label}</dt>
              <dd>{job[key] || "—"}</dd>
            </div>
          </div>
        ))}
      </dl>

      <footer className="jd-footer">
        <button type="button" className="jd-apply" onClick={onApply}>
          Apply Now
        </button>
      </footer>
    </article>
  );
}
