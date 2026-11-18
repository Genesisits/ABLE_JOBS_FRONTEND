import React, { useState } from "react";
import "./CompanySlider.css";

/*
  AUTOMATIC: every image you put in  src/images/companies/  becomes a slide.
  The company name is taken from the file name
  (e.g. "tech-mahindra.png" -> "tech mahindra").
  The folder must exist (create it and add at least one logo).

  You can also pass your own list as a prop:
  <CompanySlider companies={[{ name: "Acme", logo: acmeImg, url: "https://acme.com" }]} />
*/
const logoContext = require.context(
  "../../images/companies",
  false,
  /\.(png|jpe?g|svg|webp|gif)$/i
);

const folderCompanies = logoContext.keys().map((key) => {
  const mod = logoContext(key);
  return {
    name: key
      .replace(/^\.\//, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " "),
    logo: typeof mod === "string" ? mod : mod.default,
  };
});

const defaultCompanies =
  folderCompanies.length > 0
    ? folderCompanies
    : [
      { name: "Company One" },
      { name: "Company Two" },
      { name: "Company Three" },
      { name: "Company Four" },
    ];

function CompanyCard({ company }) {
  const [broken, setBroken] = useState(!company.logo);

  const content = broken ? (
    <span className="cslide-name">{company.name}</span>
  ) : (
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );

  return company.url ? (
    <a
      className="cslide-card"
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      title={company.name}
    >
      {content}
    </a>
  ) : (
    <div className="cslide-card" title={company.name}>
      {content}
    </div>
  );
}

export default function CompanySlider({
  companies = defaultCompanies,
  title = "Companies We Work With",
  subtitle = "Employers who are building inclusive workplaces",
  speed = 40, // seconds for one full loop; higher = slower
  respectReducedMotion = false, // true = stop auto-scroll when the OS "reduce motion" setting is on
}) {
  if (!companies || companies.length === 0) return null;

  // Repeat the list so the loop always fills wide screens and never shows a gap.
  const repeats = Math.max(2, Math.ceil(12 / companies.length));
  const track = Array.from({ length: repeats }, () => companies).flat();

  return (
    <section
      className={`cslide-section${respectReducedMotion ? " cslide-section--calm" : ""}`}
      aria-label={title}
    >
      <header className="cslide-header">
        <h2 className="cslide-title">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span>{title.split(" ").slice(-1)}</span>
        </h2>
        <p className="cslide-subtitle">{subtitle}</p>
      </header>

      <div className="cslide-viewport">
        <div
          className="cslide-track"
          style={{ "--cslide-speed": `${speed}s`, "--cslide-repeats": repeats }}
        >
          {/* Two identical halves so translateX(-50%) loops seamlessly */}
          {[0, 1].map((half) => (
            <div className="cslide-half" key={half} aria-hidden={half === 1}>
              {track.map((company, i) => (
                <CompanyCard key={`${half}-${i}`} company={company} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}